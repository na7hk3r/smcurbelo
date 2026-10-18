// The CV is the one document the site offers as a file, and it is linked from
// three places (About, the nav, the footer). Its label lives here so the three
// cannot disagree — the Spanish page used to announce "Download CV" in the
// About button's aria-label.
export const cv = {
  href: '/Curbelo_2026.pdf',
  label: { en: 'Download CV', es: 'Descargar CV' },
} as const;
