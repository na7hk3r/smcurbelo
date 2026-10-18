# Site renewal — the first screen carries the work, and the dead ends get closed

Branch `feat/site-renewal` from `main` @ `44548a3`. Delivery: **work-unit commits only, no push** (standing instruction), one commit per task — which is also how the 400-line review budget is honoured here, since without push there are no PRs to slice. Test runner: `npm run test:boot` (S1–S6, boot) + `npm run test:site` (this round's contract, CDP + a real Chrome on `:9222`); there is no unit-test runner in the repo.

## Specs

**S1 — The first screen carries a work artifact, and the person accompanies.**
Owner's brief, verbatim (excerpt kept from the original request): *"La primera pantalla debe liderar con el trabajo (proyectos/productos, Nora OS destacado); la persona acompaña."* Owner's decision, verbatim: *"Tarjeta dentro del hero (Recomendado)"* — *"Miniatura de Nora OS + nombre + una línea + link, en el espacio libre bajo los CTAs; en mobile entra entre el rol y los CTAs, justo donde no hay retrato. No cambia el orden de secciones ni la lista documentada en PRODUCT.md, y el nombre y el retrato siguen acompañando."*
Acceptance: at 1440×900 and 390×844 the card exists, is **fully inside the first viewport**, names Nora OS, shows its image, and links to a real URL from `Projects.json`. The hero keeps greeting, name, role and both CTAs. Both languages. Reduced motion honoured. No new copy: every string comes from `Projects.json` or the existing labels.
Assumption (marked as such): the "una línea" is the project's own `category` + `tags`, not a new claim — PRODUCT.md principle 1 (*"Show, never claim."*) forbids inventing a line.

**S2 — Contact and CV are recognizable immediately.**
Quoted requirement, `PRODUCT.md:28`: *"Visitors scan in minutes; contact and CV access must be recognizable immediately."*
Acceptance: the nav carries the CV entry and the footer carries both the CV and the email, each with a **visible text label** (not icon-only) in both languages, and the CV's labels mirror About's existing pair (`Download CV` / `Descargar CV`, `src/components/About/About.tsx:21,32`).
Out of scope: the email address itself is unchanged (`sergiomcurbelo5@gmail.com`, `src/constants/contact.ts:1`).

**S3 — Every rendered image declares its intrinsic dimensions.**
Baseline measured before the change: CLS **0.00** at both viewports, cold cache, 4× CPU, 1.6 Mbps, instrument proven with teeth (an injected 120px shift reads 0.08333). So this is **hardening, not a CLS fix** — recorded here so nobody later claims a fix that never existed.
Acceptance: every `<img>` in the DOM has `width` and `height` attributes whose ratio matches `naturalWidth`/`naturalHeight` within 1%.

**S4 — The hero image is not fetched where it is never shown.**
Baseline measured: at 390×844 the parser fetches `/images/home_img.webp` at **High** priority (295 KB) while `@media (max-width: 580px)` hides it (`src/components.css:410`) and the mobile LCP is the `h1` **text**, not an image. At 1440×900 the same image **is** the LCP (1508 ms), so the preload must stay there.
Acceptance: at 390×844 no request to `home_img.webp`; at 1440×900 it is still requested and still the LCP. Desktop FCP/LCP do not regress.

**S5 — No third-party host serves the tool logos.**
Baseline measured: 26 requests to `cdn.jsdelivr.net` per load, from `src/assets/imageLinks.ts:46-71` with a mutable `@latest` ref.
Acceptance: 0 requests to any third-party host for these logos; every logo still renders (`naturalWidth > 0`); the icons are byte-identical to the ones served today.
Out of scope, reported as a finding: `fonts.googleapis.com` + `fonts.gstatic.com` (1 request each, render-blocking) — same class of problem, different unit; not authorised here.

**S6 — Pointer targets reach 24×24 CSS px.**
WCAG 2.2 SC 2.5.8 (Target Size Minimum). Baseline: `.project__expand-btn` **65×14** (`padding: 0`), `.course__cert-link` **109×19**, nav links `padding-block: 0.2rem`.
Acceptance: every named control's hit box ≥ 24×24 while the **visible pixels do not move** (fixed-clip screenshot diff, AE=0), and the design detector run on the served page at 1440×900 and 390×844 reports no finding on these controls.

**S7 — No regression in what already worked.**
`npm run test:boot` (63 checks) still passes; theme/language parity still passes; the skip link, focus ring and boot overlay behaviour from rounds 1–3 are untouched.

## Tasks

| ID | Spec | Route | Status | Evidence |
|---|---|---|---|---|
| T1 | S1 hero work card | inline | **done** | `b5d8511` (with T2: both touch `components.css`); S1 green in desktop-en, desktop-es, mobile-en |
| T2 | S2 CV + email reachable | inline | **done** | `b5d8511`; S2 green ×3 — nav `CV`, footer `Download CV` / `Descargar CV` + the email as visible text |
| T3 | S3 + S4 image dims, preload scope | inline | **done** | `845e128`; S3 (44/44 ratios) + S4 green ×3; mobile hero fetch 1→0, LCP 2300→2216 ms; desktop LCP 1508→1472 ms, same element, still High |
| T4 | S5 vendor the 26 logos | inline | **done** | `d375ab4`; S5 green ×3 (third-party `{}`), 44/44 ratios, 0 broken, devicon v2.17.0 recorded in the module |
| T5 | S6 pointer targets | inline | **done** | `560b80b`; S6 green ×3; `72×17→72×29` and `122×21→122×29` with AE=0 pixel diff |
| T6 | S7 verification + close | inline | **done** | `40ccaf8` fixes the stretch the boot suite caught (L9); `test:site` 48/48 ×3; `test:boot` 63/63 ×3 after the sampling fix (L11); independently verified: S1–S6 met with the two clauses now closed (L12), S7 closed by the fix; visual round clean; `review assess` medium / `under_budget` / no review due |

Route note: inline for all six — no Writer trigger fires. The units are not "clearly heavier than starting a subagent" (S2/S5/S6 are single-file edits), and the parent context is the one that holds the design decisions.

## Log

- **L1 (owner, verbatim excerpts still available):** *"Antes de hacer cualquier cambio, consultame."* · *"Renovar el actual, sin reemplazo"* · failure signals to avoid: *"Frío y genérico"*, *"Menos claro para actuar"*, *"Que pierda velocidad"* · *"Recorda que podes hacer los commit pero no push"* · *"La primera pantalla debe liderar con el trabajo (proyectos/productos, Nora OS destacado); la persona acompaña."* · *"Si, continua"*.
- **L2 (owner, this round):** *"El sitio"* — chosen over the jsdom runner and the small leftovers; then *"Tarjeta dentro del hero (Recomendado)"*.
- **L3 (measurement, before any edit):** CLS 0.00 at both viewports with a teeth-proven instrument → S3 reclassified from "CLS fix" to hardening; the real measurable defect is S4 (295 KB at High priority on mobile, never displayed) and S5 (26 third-party requests).
- **L4:** branch created from `44548a3`; `main` stays where it was. Nothing pushed.

- **L5 (T1+T2, `b5d8511`):** the card and the contact entries landed in one commit because both touch `components.css` — splitting them would have meant two commits editing the same file for no review benefit. Hero imports `ProjectsData` directly: one source of truth over a copy that can drift, at the cost of ~2 kB gzip moving into the entry chunk. S1 and S2 green in all three scenarios; hero-intact control green.
- **L6 (T3, `845e128`):** scoping the preload with `media` did not stop the mobile fetch — `display:none` does not stop a fetch, and the `<img>` itself was the one downloading it; the preload had been masking that by sharing the URL. `loading="lazy"` on a zero-size box never intersects, so it never loads, while the media-gated preload keeps desktop eager. Measured after: mobile hero requests 1→0 and LCP 2300→2216 ms; desktop 1508→1472 ms, same LCP element, still High. CLS stayed 0.00→0.00. The Spanish role wraps to four lines where English takes three, which put the card 6px past a 900px fold: the hero's top padding was pure air above a vertically centred block (a larger value pushes content DOWN), and the navbar already occupies flow, so 6rem was 6rem of nothing — trimmed to `clamp(3rem, 6vh, 6rem)`.
- **L7 (T4, `d375ab4`):** 26 devicons vendored to `public/images/devicons`, resolved from `@latest` to devicon v2.17.0 and recorded in the module with its MIT licence and upstream link. 53.4 kB in the repo, 26 requests removed per visit. Third-party hosts now `{}`.
- **L8 (T5, `560b80b`):** hit areas grew via padding plus an equal negative margin, so the layout and every visible pixel stayed put. First attempt put the padding before the `padding: 0` already in the rule: the margin grew without the padding to cancel it and the text moved 4px (AE=4684, caught by the pixel diff). Fixed, then AE=0 on both. The button needed 6px rather than 4px: that text renders as short as 14px in one scenario.
- **L9 (T6, `40ccaf8` — the round's real lesson):** the declared `width`/`height` acted as presentational hints, so the nav logo stretched to 192×108 (2× vertical) and the About image's box grew to 649×869 (+466px). The boot suite caught the symptom (the skip link overlapping a navbar grown 56px); `test:site`'s ratio check did not, because it compares the *declared* ratio to the natural one and both were correct. One `height: auto` in the image reset restored both and kept the reservation. `test:site` now also compares what is on screen (`S3 no image is stretched by a declared size`), which went red on the logo before the fix and green after. The boot failure that came with the same run is a different story and the first explanation for it was wrong: see L11.
- **L10 (delivery budget):** authored changes in this feature are ~750 lines (the 26 vendored SVGs are generated, not authored), above the ~400-line pointer. The chosen `ask-on-risk` strategy therefore owes one question at delivery: chain the work (`stacked-to-main` or `feature-branch-chain`), or hand it over as-is. Nothing is pushed either way — the standing instruction holds.

- **L11 (T6 correction, `6ee37f1`):** the skip-link check in `test:boot` failed on HEAD and passed at the baseline, and the first explanation — a pre-existing 2px overlap, because `.skip-link:focus` sits at `--scroll-offset` and the navbar is taller than it — was wrong on both counts: the token is 6rem (96px, not 80px) and the link clears the navbar by 14.11px. An independent verifier settled it with numbers: the CSS is byte-identical in both trees, the settled rect is y=96 against a navbar bottom of 81.89px in 20 runs of 20 on *both* trees, and the failure is a sampling race — the gate reads the rect 150ms after Tab while the link lands with `transition: top 0.2s` (head y 80.2–90.0, base 90.0–94.4; the baseline also dips below the threshold at its +80ms sample in 5 of 6 runs). The site was correct in both trees; the gate measured the animation. Fixed in the gate: it now waits for the rectangle to settle before asserting — same assertion, deterministic sample, no production change.
- **L12 (T6 close):** the two clauses the verifier could not settle from the source are now closed. The 26 vendored devicons are byte-identical to `devicon@v2.17.0` as served (26/26 SHA-256, hashed in the page because `curl` has no network here — a wrong URL pattern, `icons/<file>` instead of devicon's `icons/<family>/<file>`, cost one attempt first). And the design detector ran on the served page at 1440×900 (EN and ES) and 390×844: 10–11 warnings per pass, **none of them on this round's new surface** — the flagged selectors are the incumbent world's own (`span.section-label` kickers, the cyan palette, the featured card's glow, a sub-11px `tools__badge`, one long line, the spacing rhythm). The brief was to renew without replacing, so they are reported as candidates for a future round, not restyled here.
- **L13 (delivery decision, closes L10):** asked once per `ask-on-risk`; the user chose **Stacked a main**. Sliced in one contiguous pass over the seven commits (no reordering, no history rewrite, nothing pushed): PR 1 `stack/1-hero-fit` = `b5d8511` (506±, `size:exception` — a single indivisible work-unit commit); PR 2 `stack/2-asset-loading` = `845e128`+`d375ab4` (230±); PR 3 `stack/3-fixes-record` = `560b80b`+`40ccaf8`+`6ee37f1`+`160e88e` (87±). All PRs target `main`; a slice shows earlier slices' diffs until its parents merge, then only its own. The three PR bodies plus the push command block live at `/tmp/opencode/smcurbelo-stacks/` (unsigned throwaways — the push and PR creation stay the user's decision). Native assessment for the whole slice (`5ca0079..HEAD --committed-only`): `risk medium`, `review_due: false` / `under_budget`.
- **L14 (delivery plan revised, owner verbatim):** *"Manda merge de todas las ramas nomas a main y despues hago push"*. Executed exactly: the four branches (`stack/1-hero-fit`, `stack/2-asset-loading`, `stack/3-fixes-record`, `feat/site-renewal`) fast-forwarded into `main` in order — `main` = `137fa61`, the tree all gates verified (63/63 ×3 + boot 63/63, lint/tsc 0, detector 11→1). The stacked-PR plan above is superseded by a single `main` push; the branch refs and any future round commits stay on this line. Nothing pushed by this document (the owner pushes).
