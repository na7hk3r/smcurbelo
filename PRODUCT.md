# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, equally weighted (confirmed by owner):

- **Freelance clients** — small businesses and entrepreneurs (client history: local businesses in Uruguay, Spanish-speaking) who need a website, an e-commerce store, or a desktop tool built by one person who takes the project from design to deployment. They are evaluating whether Sergio can be trusted with a real business deliverable.
- **Hiring teams** — recruiters and technical leads scanning for a fullstack developer. They check shipped work, professional experience, and certificates within a few minutes.

Both arrive from the CV, LinkedIn, GitHub, referrals, and search. They scan on desktop and on a phone. They act by contacting (form, email, LinkedIn) or downloading the CV.

## Product Purpose

Personal professional site of Sergio Mathias Curbelo, fullstack web developer. It presents his work, skills, experience, education, and contact paths. Success means a qualified visitor starts a conversation — for a project or for a role, both doors carrying equal weight.

## Positioning

Builds complete web and desktop products, from design to deployment — for teams or independently. Evidence a neighboring portfolio could not truthfully copy: production-grade desktop applications (Nora OS: modular Electron app with a plugin system, local AI, real cryptography, auto-update) and live client deliverables (corporate site on its own domain, e-commerce with WhatsApp checkout), alongside real professional team experience (my360 SaaS).

## Operating Context

- Visitors scan in minutes; contact and CV access must be recognizable immediately.
- The site is the CV companion: `public/Curbelo_2026.pdf` and the certificate PDFs are linked from it.
- Bilingual reality: English is the default document language; Spanish is served via `?lang=es` and a persisted toggle. Both are first-class.
- Deployed as a static SPA on Vercel with analytics and speed insights; it has no server of its own and the contact form posts to the Web3Forms API.
- Availability statement (confirmed current): open to both freelance projects and employment — keep communicating "Available" accordingly.

## Capabilities and Constraints

- Sections: Hero, About, Experience (my360), Skills & tools, Education/certificates, Projects, Contact, Footer.
- 6 projects with source/live links and expandable highlights; Nora OS is the featured one.
- Contact form (name, email, message) via Web3Forms; social links (email, LinkedIn, GitHub); CV download; certificate PDFs.
- Light/dark theme (system default, persisted); scroll progress; reduced motion is honored.
- Technical: React 18 + Vite + TypeScript + plain CSS + Framer Motion; static build; Vercel deploy; `VITE_WEB3FORMS_KEY` env required for the form.
- Undecided: none blocking. Copy tone stays first person and direct.

## Brand Commitments

- Name: Sergio Mathias Curbelo. Professional title: "Fullstack Web Developer" / "Desarrollador Fullstack".
- Voice: first person, direct, no filler. English neutral-professional; Spanish Rioplatense with voseo ("Hablemos", "Intentá de nuevo", "escribime") — preserve that register.
- External identity: GitHub `na7hk3r`, LinkedIn `smcurbelo`, email `sergiomcurbelo5@gmail.com`.
- Existing logo (light/dark variants) and favicon; deployed at `smcurbelo.vercel.app` (custom domain `smcurbelo.com` not connected).

## Evidence on Hand

- 6 real projects with live URLs and public repositories (`src/components/ProjectCard/Projects.json`).
- CV: `public/Curbelo_2026.pdf`. Certificates: `public/certificates/` (ctd, jap, one, fcc, ibm).
- Client and institution logos, tech-stack icons, hero/about imagery under `public/images/` and `src/assets/imageLinks.ts`.
- Absent: no testimonials or client quotes — do not fabricate any.

## Product Principles

1. **Show, never claim.** Every credibility statement maps to a live link, a repository, a PDF, or a concrete fact; nothing is asserted without evidence on hand.
2. **Two doors, one site.** A recruiter's fast scan and a client's fit evaluation both succeed without making either audience wade through a pitch meant for the other.
3. **Both languages are first-class.** Nothing ships that works in only one language.
4. **Shortest path to trust.** Availability, proof, contact, and CV sit within one action of wherever a visitor decides.
5. **Keep it real.** No invented metrics, testimonials, or sample content.

## Accessibility & Inclusion

Current behavior already includes a skip link, keyboard-accessible navigation with focus trapping and Escape handling, `prefers-reduced-motion` support via MotionConfig, and ARIA labeling. Future work preserves these; no stricter standard has been confirmed.
