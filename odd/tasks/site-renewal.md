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
Acceptance: every named control's hit box ≥ 24×24 while the **visible pixels do not move** (screenshot diff), and the 400-check contrast suite from round 1 stays green.

**S7 — No regression in what already worked.**
`npm run test:boot` (63 checks) still passes; theme/language parity still passes; the skip link, focus ring and boot overlay behaviour from rounds 1–3 are untouched.

## Tasks

| ID | Spec | Route | Status | Evidence |
|---|---|---|---|---|
| T1 | S1 hero work card | inline | pending | RED: `site/work-artifact` fails at `44548a3` |
| T2 | S2 CV + email reachable | inline | pending | RED: `site/cv-reachable` fails |
| T3 | S3 + S4 image dims, preload scope | inline | pending | RED: `site/img-dims`, `site/hero-preload` fail |
| T4 | S5 vendor the 26 logos | inline | pending | RED: `site/logos-local` fails (26 remote requests) |
| T5 | S6 pointer targets | inline | pending | RED: `site/targets` fails (65×14, 109×19) |
| T6 | S7 verification + close | inline | pending | boot suite + parity + CLS/LCP before/after + `impeccable detect` |

Route note: inline for all six — no Writer trigger fires. The units are not "clearly heavier than starting a subagent" (S2/S5/S6 are single-file edits), and the parent context is the one that holds the design decisions.

## Log

- **L1 (owner, verbatim excerpts still available):** *"Antes de hacer cualquier cambio, consultame."* · *"Renovar el actual, sin reemplazo"* · failure signals to avoid: *"Frío y genérico"*, *"Menos claro para actuar"*, *"Que pierda velocidad"* · *"Recorda que podes hacer los commit pero no push"* · *"La primera pantalla debe liderar con el trabajo (proyectos/productos, Nora OS destacado); la persona acompaña."* · *"Si, continua"*.
- **L2 (owner, this round):** *"El sitio"* — chosen over the jsdom runner and the small leftovers; then *"Tarjeta dentro del hero (Recomendado)"*.
- **L3 (measurement, before any edit):** CLS 0.00 at both viewports with a teeth-proven instrument → S3 reclassified from "CLS fix" to hardening; the real measurable defect is S4 (295 KB at High priority on mobile, never displayed) and S5 (26 third-party requests).
- **L4:** branch created from `44548a3`; `main` stays where it was. Nothing pushed.
