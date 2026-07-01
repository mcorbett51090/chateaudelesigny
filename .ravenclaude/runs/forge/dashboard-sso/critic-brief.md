# FORGE G4a — Critic brief (independent; authored neither plan)

## The premise conflict, adjudicated
A says "low-sensitivity aggregate traffic → accept the github.io + public-repo holes." B says the
data is per-revenue-stream conversion counts (commercially sensitive) + the digest auto-commits real
snapshots to a PUBLIC repo monthly. **B is right.** The dashboard literally renders per-stream
conversions (mariage/entreprise/sejour/boutique/cadeau) and the owner framed access as ABSOLUTE
("others cannot"). A page-gate that leaves the data in a public repo — into which an automated job
will start writing real numbers — does not meet the bar. A's "accept the holes" is the shared-error
to reject.

## Correlated error BOTH miss (reframe)
Both frame it as "add auth to a page on the PUBLIC site." The cleaner frame: the dashboard + its data
are an INTERNAL tool and should not sit on the public static origin at all. Once you accept that,
the answer isn't "gate a public page" (A, leaves holes) but "serve the internal thing from a gated,
private surface" (B). The public marketing site stays public and separate.

## Premise attack (worth noting, not blocking)
Does the owner even need a hosted custom dashboard? The monthly digest is already EMAILED (private),
and Cloudflare's own Web Analytics dashboard is already behind CF login. The custom page's unique
value = combined conversion view + events timeline + trends. It's wanted (they asked to gate it), so
keep it — but the lowest-attack-surface option is "don't publish the sensitive dashboard publicly."

## Risk matrix (prob × impact)
| Risk | P | I | Mitigation |
|------|---|---|-----------|
| Enable digest before privatizing → real conversion data auto-committed to public repo | H | H | gate enablement behind private+gated DoD (the fuse) |
| Ship page-gate only, leave holes (A) | H | H | reject A's premise; close holes |
| Whole site accidentally gated | M | H | scope Access to /tableau-de-bord*; test a public page |
| GH Pages job resurrects unprotected origin | M | H | delete the Pages job; verify github.io 404 |
| CF Pages build parity (sharp) | M | M | verify CF build green before decommission |
| Owner lockout | M | M | own email first + OTP fallback |
| Repo-private = lost public portfolio | — | — | user decision (tiebreak) |
