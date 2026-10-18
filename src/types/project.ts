export interface Project {
  id: string;
  img: string;
  img_alt?: string;
  /** Intrinsic size of img — img_alt shares it — so the thumb can reserve its
   *  box before the file arrives. Verified against the real file by
   *  `npm run test:site`, which compares the declared ratio to naturalWidth. */
  img_w: number;
  img_h: number;
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