export type SectionType = 
  | 'hero' 
  | 'invitation-message' 
  | 'events' 
  | 'couple-story' 
  | 'gallery' 
  | 'venue' 
  | 'important-details' 
  | 'rsvp' 
  | 'countdown' 
  | 'footer';

export interface MotionConfig {
  animationType: 'fade' | 'slide-up' | 'zoom-in' | 'none';
  duration: number;
  delay: number;
}

export interface SectionConfig {
  id: string;
  type: SectionType;
  label: string;
  variant?: string;
  motion?: MotionConfig;
  data: any; // specific config based on section type
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  defaultTheme: ThemeConfig;
  defaultSections: SectionConfig[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl?: string;
  venueName: string;
  address: string;
  mapUrl?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export interface InfoItem {
  id: string;
  category: 'Travel' | 'Accommodation' | 'Dress Code' | 'Other';
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface InvitationContent {
  id: string;
  templateId: string;
  slug: string;
  theme: ThemeConfig;
  sections: SectionConfig[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
