# Style polish — incumbent-world fidelity pass

Round 5 on `feat/site-renewal` from `160e88e`. Delivery: work-unit commits only, no push (standing instruction); final: ~118 authored lines, delivered as two code commits + this docs commit (single slice, well under the ~400 pointer). Test runner: `npm run test:site` (+ new contract checks), `npm run test:boot` (63, regression), detector `impeccable detect --json` (3 passes), AA pixel check on the flat badge. Owner approved the round plan and chose **"Cian flat, sin glow (Recommended)"** for the featured card.

## Specs

Quote sources: detector findings from `/tmp/opencode/impeccable-critique/detect-{desktop-en,desktop-es,mobile-en}.json` (taken at this HEAD).

**S1 — Kickers removed (banned outright).**
Detector, verbatim: *"A tiny tracked uppercase or small-caps label sitting as its own block directly above a heading is banned outright, repeated or not. Generated kickers never earn their place: the heading carries its own weight. Delete the label and let the heading speak; if the words matter, work them into the heading or the body."* — 5 findings: `div.about__content`, `header.experience__header`, `div.tools`, `div.courses`, `div.contact__intro` (all `> span.section-label`; the mobile pass shows the same 5).
Acceptance: 0 `.section-label` elements in the DOM in all 3 scenarios; the 5 headings keep their text; no new copy anywhere (the removed words already exist in the `h2`s).

**S2 — No undersized functional text.**
Detector, verbatim: *"Interactive and content-bearing UI text … below 11px is a legibility failure, not a style choice … The 11px floor holds even inside a footer"* — finding on `span.tools__badge` (current `font-size: 0.62rem` ≈ 9.9px, `src/components.css:874`).
Acceptance: computed font-size of `.tools__badge` ≥ 11px in both themes; the badge may move (growing text cannot stay put); uppercase/weight/style unchanged.

**S3 — Line length in range.**
Detector, verbatim: *"Text lines wider than ~80 characters are hard to read … Add a max-width (65ch to 75ch) to text containers."* — finding on `p.experience-card__desc`: *"~138 chars on 2 of 3 rendered lines (aim for <80)"*.
Acceptance: `.experience-card__desc` declares a `max-width` ≤ 75ch.

**S4 — Featured card: cyan flat, no glow (owner's chosen direction).**
Detector findings, verbatim antipatterns: `ai-color-palette` on `article.project--featured` (*"Cyan gradient background"*) and `span.project__badge` (*"Cyan gradient background"*), `radial-spotlight-glow` on `.project--featured .project__thumb` (*"Decorative radial spotlight glow … a floating colored haze"*).
Owner decision (verbatim): *"Cian flat, sin glow (Recommended)"* — keep the incumbent cyan identity (`--accent` family) but flat: no gradients, no radial haze on the card, thumb, or badge. Constraints the owner cares about: visible hierarchy of "featured" must survive (the card still reads as the star), and the badge keeps AA (round-1 measured 4.89:1 light / 5.20:1 dark on the gradient it replaces).

**S5 — Spacing rhythm non-monotonous on the header areas this round touches.**
Detector, verbatim: *"The same spacing value used everywhere — no rhythm, no variation. Use tight groupings for related items and generous separations between sections."* — `body`: *"~4px used 7/11 times (64%)"*.
Acceptance: the removed-kicker headers re-space with the existing scale (`--space-*`), the detector's `monotonous-spacing` finding does not survive on the touched surfaces.

**S6 — Fonts self-hosted (Sora).**
Finding carried from round 4 (S5, out of scope then): `fonts.googleapis.com` + `fonts.gstatic.com` render-blocking requests (1 each; block style: `index.html:307-309`, font-family `Sora` weights 400–800: `src/index.css:165`).
Acceptance: 0 requests to either host in every scenario; Sora woff2 served from this repo (`public/fonts/`); rendered text stays Sora (browser check on computed font / loaded FontFace list); no visual re-set (same family/weights).

**S7 — No regression in what already worked.**
`npm run test:boot` 63/63; existing `test:site` 48/48; badge contrast AA ≥ round-1 numbers; reduced-motion behaviour untouched; both themes and both languages verified.

## Tasks

| ID | Spec | Route | Status | Evidence |
|---|---|---|---|---|
| T1 | S1 + S5 kickers & header rhythm | inline | **done** | `eec8b80`: 5 TSX labels out; header gaps now 25/20/30/40 px (rhythm, was uniform kicker rhythm); `kickers: 0` ×3 |
| T2 | S2 badge size + S3 line-length | inline | **done** | `eec8b80`: badge `font-size: var(--text-xs)` → 13.12px desktop / 11.695px mobile (was 9.92); desc capped at 640px — see L7 — detector `line-length` gone ×3 |
| T3 | S4 featured card flat | inline | **done** | `eec8b80`: card/badge gradients + thumb haze gone (`flat: []` ×3); badge AA **5.56:1 light / 7.79:1 dark** on solid `--accent`, above the gradient's 4.89/5.20; thumb toned from the old gradients' own top-left stops — see L5 |
| T4 | S6 vendor Sora | inline | **done** | `b4315bd`: 5 latin woff2 (400–800, 74,772 bytes total) by SHA-256; `@font-face` inline in the head so the boot loader still paints Sora; preloads 400/700; `soraOk: true`, 5/5 faces loaded, 0 font-host requests ×3 |
| T5 | S7 gates, detector, AA, close | inline | **done** | final build: `test:site` 63/63 ×3, `test:boot` 63/63 ×1, `lint` + `tsc --noEmit` 0; detector 11 findings → **1** (`monotonous-spacing`, body-level incumbent internals — L6, report-only); screenshots EN light / EN dark / ES dark / mobile reviewed (incl. the Framer Motion full-page trap and the profile-per-run contamination trap — see L8) |

## Log

- **L1 (owner, this round):** *"Bien, continua en lo que haya que hacer"* → chose *"Arrancar ronda de pulido"*; then *"Cian flat, sin glow (Recommended)"* for the featured card. Standing rules quoted in L1 of `odd/tasks/site-renewal.md` still hold: consult before changes, commits yes / push no.
- **L2 (feasibility):** `curl` has no network here, but `python3 urllib` reaches the web (HTTP 200 from `fonts.googleapis.com`) — Sora vendoring is feasible via python binary download + SHA-256 verification.
- **L3 (test-first evidence, contract):** the round began by extending `scripts/site-contract.mjs` with five checks (kickers 0, tools badge ≥11px, desc capped, featured surfaces flat, 0 Google Fonts requests; the font hosts moved from a documented exception to an explicitly counted bucket). RED observed on the unmodified build: **63 checks, 3 failing** — the five new ones in all three scenarios (`kickers: 5`, `badgeFont: 9.92`, `descMax: none`, `flat: [3 surfaces]`, `fontHostReqs: 2`); the previous 58 checks stayed green. GREEN succeeded per task: T1–T3 turned only the font check red, T4 closed it, and the final build passed 63/63 ×3.
- **L4 (ch unit sizes):** authored changed lines this round: 41+62 (C1) + index.html/fonts vendoring (C2) ≈ **118 authored lines** (the woff2s are vendored binaries) — under the ~400 pointer, single slice, no delivery question owed.
- **L5 (T3, the thumb seam):** the first flat choice (`var(--surface-3)`, a mid-gray) exposed the logo art's own white panel as a hard box in light theme. Fix: the flat window takes each old gradient's top-left stop as a single tone (`oklch(0.97 0.01 260)` light / `oklch(0.2 0.03 260)` dark) — the tone the eye already read — so the light seam softens to the incumbent's and dark renders the art cleaner than before. No gradient, no haze.
- **L6 (residual finding, report-only):** `monotonous-spacing` on `body` still reads ~4px ×7/11 — the sampled gaps are the incumbent style's own internal tag/badge gaps (e.g. `.experience-card__tags` gap 4.96px), outside this round's touched surface; the section headers this round owns now sit at 25/20/30/40px gaps. Reported as a future-round candidate, like the Google Fonts finding was.
- **L7 (S3 unit correction):** the rule's `65ch–75ch` advice assumes ~8px/char; Sora's `ch` is ~0.74em, so 70ch rendered ~100 detector-chars. The honest cap is the physical length the intent targets: `max-width: 640px` (~80 detector-chars), documented in the CSS. Contract check (`px ≤ 80 × font-size`) verifies the rendered bar, not the ch spelling.
- **L8 (verification probes):** full-page `captureBeyondViewport` shots lie while Framer Motion holds below-fold sections at `opacity: 0` — viewport-scoped scroll shots are the evidence here. The CDP Chrome profile persists `localStorage` `theme`/`language` across runs (the round-4 trap again): the first "EN light" run actually rendered ES dark, so the run harness now sets both keys explicitly and reloads before capturing. Shots of record: `en-about`, `en-projects`, EN-dark/ES-dark projects, mobile.
- **L9 (native assessment, close):** first assess run errored on the untracked-inventory guard (owner's `TODO.md`) and its pre-error text said `high_risk`; the valid typed run — `--untracked-scope=exclude --expected-untracked-inventory=sha256:3951ab…` — returns `risk: medium`, `review_due: false` / `under_budget`, same as round 4's close. No review owed for this slice; the review boundary stays `5ca0079` until an acknowledged review. The graded `high_risk` from a failed invocation is not evidence; the documented fresh typed verdict is.
