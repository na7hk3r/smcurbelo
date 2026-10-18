// Labels shared by the Projects section and the hero's featured-work card.
// They live here rather than inside ProjectCard.tsx because Hero imports them
// too, and importing anything from the lazy ProjectCard module would pull the
// whole card into the entry chunk.
export const projectLabels = {
  en: {
    heading: 'Projects',
    source: 'Code',
    live: 'Live',
    more: 'Read more',
    less: 'Show less',
    relationship: { client: 'Client', own: 'Personal', 'open-source': 'Open Source' },
  },
  es: {
    heading: 'Proyectos',
    source: 'Código',
    live: 'Demo',
    more: 'Leer más',
    less: 'Mostrar menos',
    relationship: { client: 'Cliente', own: 'Personal', 'open-source': 'Open Source' },
  },
} as const;
