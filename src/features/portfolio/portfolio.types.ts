export type PortfolioCategory =
  | 'PROFESSIONAL'
  | 'PERSONAL'
  | 'RELIGHT'
  | 'SKETCH'
  | 'DESIGNER';

export type PortfolioSection =
  | 'professional'
  | 'personalWorks'
  | 'sketch'
  | 'designer'
  | 'relighting';

export type PersonalPortfolioSubcategory = 'Environment' | 'Character' | 'Study';

export type MediaType = 'image' | 'video' | 'youtube';

export interface PortfolioChip {
  label: string;
  highlighted: boolean;
}

export interface PortfolioStat {
  key: string;
  value: string;
}

export interface PortfolioMedia {
  id: string;
  type: MediaType;
  url?: string;
  thumbnailUrl?: string;
  youtubeId?: string;
  youtubeStartSeconds?: number;
  title: string;
  alt: string;
  order: number;
  isCountable: boolean;
  lightboxEnabled: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: PortfolioCategory;
  personalSubcategory?: PersonalPortfolioSubcategory;
  section: PortfolioSection;
  companyId?: string;
  projectType: string;
  descriptionHtml: string;
  tools: string[];
  role: string;
  year: number;
  publishedAt: string;
  uploadedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
  thumbnailUrl: string;
  hoverUrl?: string;
  youtubeId?: string;
  mediaType: MediaType;
  order: number;
  allOrder: number;
  categoryOrder: number;
  lightboxGroupId: PortfolioCategory;
  chips: PortfolioChip[];
  stats: PortfolioStat[];
  media: PortfolioMedia[];
}

export interface Company {
  id: string;
  name: string;
  displayName: string;
  period: string;
  role: string;
  description: string;
  order: number;
  relatedPortfolioItemIds: string[];
}
