#!/usr/bin/env node
/**
 * analytics-digest — monthly Cloudflare Analytics → plain-language digest.
 *
 * DORMANT BY DESIGN: this script is a no-op until repo secrets `CF_API_TOKEN` and
 * `CF_ACCOUNT_ID` exist. Run it any time (locally, in CI) with no secrets set and it
 * exits 0 having done nothing — it must never fail a build or a deploy.
 *
 * What it does, once secrets exist:
 *   1. Queries Cloudflare's GraphQL Analytics API for the PRIOR calendar month of
 *      RUM pageview data (dataset `rumPageloadEventsAdaptiveGroups`, account-scoped).
 *   2. Archives a snapshot to reports/analytics/<YYYY-MM>.json, matching the schema
 *      documented in docs/ANALYTICS.md ("Snapshot schema") and exemplified by
 *      reports/analytics/sample.json.
 *   3. Renders a 3-part plain-language digest to reports/digests/<YYYY-MM>.md.
 *   4. If BREVO_API_KEY + DIGEST_RECIPIENTS are also set, emails the digest via
 *      Brevo's transactional API. Otherwise it just skips the email, loudly logged.
 *
 * Design rules:
 *   - No npm dependencies. Node 20+ global `fetch` + `fs` only.
 *   - Every network call is try/catch guarded. On any failure this script logs the
 *     reason and exits 0 — it never hard-fails CI (see docs/ANALYTICS.md Phase 2).
 *   - Idempotent: safe to re-run for the same month: it fully overwrites that
 *     month's snapshot/digest file rather than accumulating anything.
 *
 * Reference: https://developers.cloudflare.com/analytics/graphql-api/
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ANALYTICS_DIR = join(root, 'reports/analytics');
const DIGESTS_DIR = join(root, 'reports/digests');

// The site's public contact address; used only as the Brevo "from" address for the
// digest email. Kept as a literal here (not imported from src/config/site.ts) so this
// script has zero dependency on the Astro/TS toolchain and can run as plain Node.
const SENDER = { name: 'Château de Lésigny — Analytics', email: 'contact@chateaudelesigny.com' };

// Conversion thank-you-page slugs tracked by /{fr|en}/merci/{slug}/ — must match the
// keys in the snapshot schema (docs/ANALYTICS.md) exactly.
const CONVERSION_STREAMS = ['mariage', 'entreprise', 'sejour', 'boutique', 'cadeau'];

// Below this many raw pageview events, a count is "directional" per docs/ANALYTICS.md
// (Cloudflare Web Analytics free tier samples ~10% of traffic).
const SMALL_SAMPLE_THRESHOLD = 50;

// Known referer hostnames → the friendly channel labels used in reports/analytics/sample.json.
// Anything not in this map falls back to the raw hostname.
const REFERER_LABELS = {
  'www.instagram.com': 'Instagram',
  'instagram.com': 'Instagram',
  'l.instagram.com': 'Instagram',
  'www.google.com': 'Google (search)',
  'google.com': 'Google (search)',
  'www.facebook.com': 'Facebook',
  'facebook.com': 'Facebook',
  'm.facebook.com': 'Facebook',
  'www.mariages.net': 'mariages.net',
  'mariages.net': 'mariages.net',
  'www.bing.com': 'Bing (search)',
};

// /go/{source}/ path-based redirect slugs → friendly channel labels (docs/ANALYTICS.md
// "Channel attribution without UTM" table). Merged into the same channel bucket as the
// matching referer, since both represent the same traffic source.
const GO_LABELS = {
  instagram: 'Instagram',
  newsletter: 'Newsletter',
  gbp: 'Google Business',
  mariagesnet: 'mariages.net',
};

// -----------------------------------------------------------------------------------
// GraphQL query — centralised in one place because Cloudflare's Analytics API schema
// can drift between accounts/plan tiers. If ANY field below errors at runtime, first
// introspect the live schema (e.g. via the GraphQL Explorer at
// https://developers.cloudflare.com/analytics/graphql-api/getting-started/) before
// changing field names blindly. The dataset name (`rumPageloadEventsAdaptiveGroups`)
// and the exact filter/dimension field names are the most likely things to have moved.
// -----------------------------------------------------------------------------------
const ANALYTICS_QUERY = `
  query MonthlyDigest($accountTag: String!, $since: Time!, $until: Time!, $limit: Int!) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        rumPageloadEventsAdaptiveGroups(
          limit: $limit
          filter: { datetime_geq: $since, datetime_lt: $until }
        ) {
          count
          sum {
            visits
          }
          dimensions {
            date
            requestPath
            refererHost
          }
        }
      }
    }
  }
`;

function log(...args) {
  console.log('[analytics-digest]', ...args);
}

/** Prior calendar month relative to `now`, e.g. run on 2026-07-xx → "2026-06". */
function priorMonth(now = new Date()) {
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth(); // 0-based; subtracting 1 gives the *previous* month directly
  const target = new Date(Date.UTC(y, m - 1, 1));
  return monthInfo(target);
}

function monthInfo(dateInMonth) {
  const y = dateInMonth.getUTCFullYear();
  const m = dateInMonth.getUTCMonth(); // 0-based
  const label = `${y}-${String(m + 1).padStart(2, '0')}`;
  const since = new Date(Date.UTC(y, m, 1)).toISOString();
  const until = new Date(Date.UTC(y, m + 1, 1)).toISOString();
  return { label, since, until, year: y, monthIndex: m };
}

function offsetMonth(info, delta) {
  return monthInfo(new Date(Date.UTC(info.year, info.monthIndex + delta, 1)));
}

async function queryCloudflare({ token, accountId, since, until }) {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ANALYTICS_QUERY,
      variables: { accountTag: accountId, since, until, limit: 10000 },
    }),
  });

  const body = await res.json();
  if (!res.ok || body.errors) {
    throw new Error(
      `Cloudflare GraphQL API error (HTTP ${res.status}): ${JSON.stringify(body.errors ?? body)}`
    );
  }

  const groups = body?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
  if (!Array.isArray(groups)) {
    throw new Error('Cloudflare GraphQL API returned an unexpected shape (no groups array)');
  }
  return groups;
}

/** raw Cloudflare groups → snapshot object matching docs/ANALYTICS.md's schema. */
function buildSnapshot(groups, month) {
  let visits = 0;
  let pageviews = 0;
  let fr = 0;
  let en = 0;
  const channelCounts = new Map(); // label -> visits
  const landingCounts = new Map(); // path -> visits
  const conversions = Object.fromEntries(
    CONVERSION_STREAMS.map((slug) => [slug, { merci: 0, confirmed: null }])
  );

  for (const g of groups) {
    const groupVisits = Number(g?.sum?.visits ?? 0);
    const groupPageviews = Number(g?.count ?? 0);
    const path = g?.dimensions?.requestPath ?? '';
    const refererHost = g?.dimensions?.refererHost ?? '';

    visits += groupVisits;
    pageviews += groupPageviews;

    if (path.startsWith('/fr/')) fr += groupVisits;
    else if (path.startsWith('/en/')) en += groupVisits;

    // Conversion proxies: /{fr|en}/merci/{slug}/ — summed across locales.
    const merciMatch = path.match(/^\/(?:fr|en)\/merci\/([a-z]+)\/?$/);
    if (merciMatch && conversions[merciMatch[1]]) {
      conversions[merciMatch[1]].merci += groupPageviews;
    }

    // Path-based channel redirects: /go/{source}/ — merged into the referer-based bucket.
    const goMatch = path.match(/^\/go\/([a-z]+)\/?$/);
    if (goMatch) {
      const label = GO_LABELS[goMatch[1]] ?? goMatch[1];
      channelCounts.set(label, (channelCounts.get(label) ?? 0) + groupVisits);
      continue; // /go/ hits aren't real landing pages, skip landingCounts below
    }

    // Referer-host based channel attribution (skip thank-you/redirect pages themselves).
    if (!merciMatch && !path.startsWith('/go/')) {
      const label = refererHost ? (REFERER_LABELS[refererHost] ?? refererHost) : 'Direct';
      channelCounts.set(label, (channelCounts.get(label) ?? 0) + groupVisits);
      landingCounts.set(path, (landingCounts.get(path) ?? 0) + groupVisits);
    }
  }

  const toSortedArray = (map, keyName) =>
    [...map.entries()]
      .map(([key, v]) => ({ [keyName]: key, visits: v }))
      .sort((a, b) => b.visits - a.visits);

  return {
    month: month.label,
    generatedAt: new Date().toISOString(),
    sampleNote: '~10% sampled; counts under ~50 are directional only',
    totals: { visits, pageviews, prevVisits: 0 }, // prevVisits filled in by caller
    locales: { fr, en },
    channels: toSortedArray(channelCounts, 'source'),
    landingPages: toSortedArray(landingCounts, 'path'),
    conversions,
  };
}

function loadSnapshot(label) {
  const file = join(ANALYTICS_DIR, `${label}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    log(`could not parse existing snapshot ${file}, ignoring:`, err.message);
    return null;
  }
}

function pct(delta, base) {
  if (!base) return null;
  return Math.round((delta / base) * 1000) / 10; // one decimal place
}

function annotate(count) {
  return count < SMALL_SAMPLE_THRESHOLD ? ' (directional — small sample)' : '';
}

/** Builds the strict 3-part "## What happened / ## What it means / ## What to do" digest. */
function buildDigest({ snapshot, prevSnapshot, prevPrevSnapshot }) {
  const { totals, locales, channels, landingPages, conversions, month } = snapshot;
  const visitsDelta = totals.visits - totals.prevVisits;
  const visitsPct = pct(visitsDelta, totals.prevVisits);
  const totalLocales = locales.fr + locales.en || 1;
  const frShare = Math.round((locales.fr / totalLocales) * 1000) / 10;
  const enShare = Math.round((locales.en / totalLocales) * 1000) / 10;

  const topChannels = channels.slice(0, 5);
  const topLandingPages = landingPages.slice(0, 5);

  // ---- What happened -----------------------------------------------------------
  const lines = [`## What happened`, ''];
  lines.push(
    visitsPct === null
      ? `- **Visits:** ${totals.visits} in ${month} (no prior-month snapshot to compare — this is the first archived month).`
      : `- **Visits:** ${totals.visits} in ${month}, ${visitsDelta >= 0 ? '+' : ''}${visitsDelta} (${visitsPct >= 0 ? '+' : ''}${visitsPct}%) month-over-month.`
  );
  lines.push(`- **FR/EN split:** ${frShare}% FR / ${enShare}% EN.`);
  lines.push(
    `- **Top channels:** ${
      topChannels.length
        ? topChannels.map((c) => `${c.source} (${c.visits}${annotate(c.visits)})`).join(', ')
        : 'no channel data.'
    }`
  );
  lines.push(
    `- **Top landing pages:** ${
      topLandingPages.length
        ? topLandingPages.map((p) => `${p.path} (${p.visits}${annotate(p.visits)})`).join(', ')
        : 'no landing-page data.'
    }`
  );
  lines.push(`- **Conversions (thank-you-page pageviews, per stream):**`);
  for (const slug of CONVERSION_STREAMS) {
    const merci = conversions[slug].merci;
    const stripeNote = slug === 'boutique' || slug === 'cadeau' ? ' — check Stripe for actual sales' : '';
    lines.push(`  - ${slug}: ${merci}${annotate(merci)}${stripeNote}`);
  }

  // ---- What it means ------------------------------------------------------------
  lines.push('', '## What it means', '');
  const meaning = [];
  if (visitsPct !== null) {
    meaning.push(
      visitsPct >= 0
        ? `Traffic grew ${visitsPct}% versus last month — whatever changed in the prior period (posts, listings, season) is working.`
        : `Traffic fell ${Math.abs(visitsPct)}% versus last month — worth checking whether posting cadence or seasonality explains it.`
    );
  } else {
    meaning.push(`This is the first archived month, so there's no month-over-month baseline yet.`);
  }
  if (Math.abs(frShare - 50) > 30) {
    meaning.push(
      frShare > enShare
        ? `Traffic is heavily FR-skewed (${frShare}%) — EN-side outreach (mariages.net, English wedding blogs) may be under-tapped.`
        : `Traffic is heavily EN-skewed (${enShare}%) — worth checking whether FR channels (local listings, French wedding press) are still active.`
    );
  }
  meaning.push(
    `Conversion counts above are thank-you-page pageviews only (a proxy) — they are directional, not ground truth. Trust the inbox and Stripe for exact enquiry/sale counts.`
  );
  lines.push(...meaning);

  // ---- What to do -----------------------------------------------------------------
  lines.push('', '## What to do', '');
  const actions = [];

  const topChannelDown = (() => {
    if (!prevSnapshot || !topChannels.length) return false;
    const leader = topChannels[0];
    const prevLeader = prevSnapshot.channels?.find((c) => c.source === leader.source);
    return prevLeader ? leader.visits < prevLeader.visits : false;
  })();
  if (visitsPct !== null && visitsPct < 0 && topChannelDown) {
    actions.push(
      `Traffic and your top channel (${topChannels[0].source}) both dropped — review posting cadence on that channel this month.`
    );
  }

  for (const slug of CONVERSION_STREAMS) {
    const cur = conversions[slug].merci;
    const prev = prevSnapshot?.conversions?.[slug]?.merci;
    const prevPrev = prevPrevSnapshot?.conversions?.[slug]?.merci;
    if (cur === 0 && prev === 0) {
      const streakNote = prevPrev === 0 ? ' (3+ months now)' : '';
      actions.push(`${slug}: thank-you pageviews have been 0 for 2+ months${streakNote} — trust your inbox, tracking may have missed it.`);
    }
  }

  if (prevSnapshot) {
    const prevTotal = (prevSnapshot.locales?.fr ?? 0) + (prevSnapshot.locales?.en ?? 0) || 1;
    const prevFrShare = Math.round(((prevSnapshot.locales?.fr ?? 0) / prevTotal) * 1000) / 10;
    if (Math.abs(frShare - prevFrShare) >= 10) {
      actions.push(
        `FR/EN ratio shifted from ${prevFrShare}% FR to ${frShare}% FR month-over-month — consider adjusting which-language outreach gets the next push.`
      );
    }
  }

  if (actions.length === 0) {
    actions.push('No red flags this month — keep the current posting/outreach mix.');
  }
  lines.push(...actions.slice(0, 3).map((a) => `- ${a}`));

  return lines.join('\n') + '\n';
}

async function sendEmail({ apiKey, recipients, month, markdown }) {
  const to = recipients
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  if (to.length === 0) {
    log('DIGEST_RECIPIENTS set but empty after parsing — skipping email');
    return;
  }

  const html = `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')}</pre>`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      to,
      subject: `Analytics digest — ${month}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Brevo API returned HTTP ${res.status}: ${text}`);
  }
}

async function main() {
  const { CF_API_TOKEN, CF_ACCOUNT_ID, BREVO_API_KEY, DIGEST_RECIPIENTS } = process.env;

  if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
    log('skipped (no CF token) — CF_API_TOKEN/CF_ACCOUNT_ID not set, this is a no-op by design');
    process.exit(0);
  }

  const month = priorMonth();
  log(`generating snapshot + digest for ${month.label}`);

  let groups;
  try {
    groups = await queryCloudflare({
      token: CF_API_TOKEN,
      accountId: CF_ACCOUNT_ID,
      since: month.since,
      until: month.until,
    });
  } catch (err) {
    log('Cloudflare query failed, skipping this run:', err.message);
    process.exit(0);
    return;
  }

  const snapshot = buildSnapshot(groups, month);

  const prevMonthInfo = offsetMonth(month, -1);
  const prevPrevMonthInfo = offsetMonth(month, -2);
  const prevSnapshot = loadSnapshot(prevMonthInfo.label);
  const prevPrevSnapshot = loadSnapshot(prevPrevMonthInfo.label);
  snapshot.totals.prevVisits = prevSnapshot?.totals?.visits ?? 0;

  mkdirSync(ANALYTICS_DIR, { recursive: true });
  mkdirSync(DIGESTS_DIR, { recursive: true });

  const snapshotPath = join(ANALYTICS_DIR, `${month.label}.json`);
  writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + '\n');
  log(`wrote ${snapshotPath}`);

  const digestMarkdown = buildDigest({ snapshot, prevSnapshot, prevPrevSnapshot });
  const digestPath = join(DIGESTS_DIR, `${month.label}.md`);
  writeFileSync(digestPath, digestMarkdown);
  log(`wrote ${digestPath}`);

  if (BREVO_API_KEY && DIGEST_RECIPIENTS) {
    try {
      await sendEmail({ apiKey: BREVO_API_KEY, recipients: DIGEST_RECIPIENTS, month: month.label, markdown: digestMarkdown });
      log('digest emailed via Brevo');
    } catch (err) {
      log('Brevo email failed (non-fatal), digest is still saved to reports/:', err.message);
    }
  } else {
    log('BREVO_API_KEY/DIGEST_RECIPIENTS not set — skipping email, digest saved to reports/ only');
  }

  process.exit(0);
}

main().catch((err) => {
  // Last-resort guard: this script must never fail CI/deploy even on a bug.
  log('unexpected error, exiting 0 anyway (must never break the build):', err?.message ?? err);
  process.exit(0);
});
