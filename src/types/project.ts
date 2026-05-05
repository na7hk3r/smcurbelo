export interface Project {
  id: string;
  img: string;
  img_alt?: string;
  title: { en: string; es: string };
  tags: { span_1: string; span_2: string; span_3: string };
  description: { en: string; es: string };
  href_source: string;
  href_source_2: string;
  badge?: string;
  highlights?: {
    en: string[];
    es: string[];
  };
}
