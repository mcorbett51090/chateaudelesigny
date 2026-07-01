# FORGE G4b — Tiebreaks

1. **Data sensitivity (A vs B premise)** → **B.** Per-stream conversion data + the auto-commit-to-
   public-repo fuse make "accept the holes" untenable. Close them.
2. **Whole-repo-private (+CF Pages) vs keep-repo-public (+split/Worker)** → **ASK MATT (high-blast:
   repo visibility is a business/portfolio call).** Recommend whole-repo-private + Cloudflare Pages
   (one provider, simplest, closes everything). Split (B-Alt2) only if the repo must stay public.
3. **Domain-coupled vs decoupled** → **decouple (B-Alt A).** Ship gated on *.pages.dev now; do the
   www cutover later. Don't block the security fix on DNS/registrar.
4. **IdP** → **Google + Email-OTP** (both agree). Literal "Sign in with Apple" REJECTED (needs paid
   Apple Developer + OIDC key rotation for ~a handful of logins; OTP covers @icloud.com).
5. **The digest fuse** → **keep the digest Action dormant until private + gated** (DoD-gated). No real
   snapshot exists yet — do not light the fuse early.
