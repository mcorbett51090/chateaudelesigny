# Château de Lésigny — corrected brand (applied)

The deterministic extractor was defeated by Wix's CSS-in-JS, so its **colors** are Wix editor
defaults (`--wbu-color-blue/black/red`), NOT the château brand. Its **fonts** and **logos** ARE real.
This file is the human-corrected brand of record for **V2** (the original-brand re-skin of V1).

## Logo
- Primary mark: the **gold-script "Château de Lésigny" wordmark beneath a fine château engraving**
  (`src/assets/brand/logo-original.png`, 600×227, transparent). Ornate, classical, gold.
- Favicon/og from Wix also point at the same gold wordmark asset.

## Typography (real, from the live site's font stacks)
| Role | Original site font | Free web equivalent (V2 uses) |
|---|---|---|
| Display / titles | **Cinzel** (Roman caps) | Cinzel (Google Fonts ✓) |
| Body / longform | **EB Garamond** | EB Garamond (Google Fonts ✓) |
| Accent serif | Didot W01 Italic | Cormorant / EB Garamond italic |
| Script flourish (wordmark feel) | Snell Roundhand / Niconne | **Pinyon Script** or **Niconne** (Google Fonts ✓) |
| Utility sans | Brandon Grotesque / DIN Next light | Inter / "Brandon-like" geometric (keep Instrument Sans) |

## Palette (corrected — classical château: gold + cream + heraldic red)
| Token | Hex | Role |
|---|---|---|
| `--brand-bg` | `#f4efe6` | cream / parchment canvas |
| `--brand-surface` | `#fbf8f2` | raised surfaces |
| `--brand-text` | `#1c1a17` | warm near-black ink |
| `--brand-primary` | `#b08d4f` | **gold** — the signature (logo gold) |
| `--brand-gold-deep`| `#8a6d3a` | deep gold / hover |
| `--brand-accent` | `#7c1f25` | heraldic deep red (brick / Castle Impossible) |
| `--brand-ink-soft` | `#4b443c` | secondary text |
| `--brand-dark` | `#1a1714` | dark panels |

`#9c2426` / `#df3336` (Wix "red") loosely corroborate a red accent; `#151414`/greys corroborate
the warm-dark ink. Gold + cream + Cinzel is the load-bearing identity.

## V2 implementation (theme re-skin, not a rebuild)
V1 is fully token-driven, so V2 = same structure/content/images with:
1. A token override theme (`:root.brand-original { … }`) mapping the palette above onto V1's
   semantic tokens (gold replaces oxblood as the single accent; cream canvas; Cinzel/EB Garamond/script).
2. Extra fonts via @fontsource (cinzel, eb-garamond, a script).
3. The real gold logo in the nav/footer (replacing the "CdL" monogram).
4. Selected at build time by `PUBLIC_BRAND=original` → a parallel build, so V1 and V2 are
   side-by-side comparable.
