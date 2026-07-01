# FORGE G0 — Scope: SSO gate for the analytics dashboard

**Idea:** Only the owner (+ a few staff) can open /tableau-de-bord/; everyone else is blocked.

**G0 answers (2026-07-01):**
- Gate strength: REAL login wall (edge auth, not client-side obscurity).
- Sign-in: Google OR Apple account.
- Who: owner + a few staff (email allow-list).

**Hard constraint:** site is a STATIC build on GitHub Pages (public repo, public github.io origin).
No backend to validate logins. Real auth must happen at the EDGE (Cloudflare Access) or on a
separate authed host. Two exposure holes to resolve, not just "gate the page":
  1. Origin bypass — the public github.io URL serves the dashboard regardless of any Cloudflare gate.
  2. Public data — reports/analytics/*.json + embedded snapshot data live in a PUBLIC repo.

**Scoped intent:** Put a real SSO wall (Google + email-OTP covering Apple/iCloud) with an email
allow-list in front of the dashboard path, AND close the origin-bypass + public-data holes.

**Out of scope:** gating the public marketing pages; per-user analytics; a full user-management system.

**Success signal:** an approved email can sign in and see the dashboard; a random visitor (even with
the direct URL, even the github.io URL) cannot see the page OR its data.
