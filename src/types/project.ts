export interface Project {
  id: string;
  img: string;
  img_alt?: string;
  title: { en: string; es: string };
  relationship: 'client' | 'own' | 'open-source';
  category: string;
  tags: string[];
  description: { en: string; es: string };
  source?: string;
  live?: string;
  badge?: { en: string; es: string };
  highlights?: {
    en: string[];
    es: string[];
  };
}