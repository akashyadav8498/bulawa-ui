export interface DesignItem {
  id: string;
  name: string;
  category: string;
  status: 'Published' | 'Draft';
  lastEdited: Date;
  image: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isBlank: boolean;
}

export const MOCK_DESIGNS: DesignItem[] = [
  {
    id: 'd-1',
    name: 'Editorial Wedding',
    category: 'Wedding',
    status: 'Published',
    lastEdited: new Date('2026-09-25T10:30:00'),
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'd-2',
    name: 'Garden Ceremony',
    category: 'Wedding',
    status: 'Draft',
    lastEdited: new Date('2026-09-26T09:15:00'),
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'd-3',
    name: 'Modern Monogram',
    category: 'Save the Date',
    status: 'Published',
    lastEdited: new Date('2026-09-20T14:45:00'),
    image: 'https://images.unsplash.com/photo-1583939000145-c8e472cb46a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'd-4',
    name: 'Intimate Celebration',
    category: 'Reception',
    status: 'Draft',
    lastEdited: new Date('2026-09-22T16:20:00'),
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

export const MOCK_TEMPLATES: TemplateItem[] = [
  {
    id: 'blank',
    name: 'Start from Blank',
    category: 'Custom',
    description: 'Build a unique experience from scratch using the Bulawa components.',
    image: '',
    isBlank: true
  },
  {
    id: 'tpl-1',
    name: 'Editorial Wedding',
    category: 'Wedding',
    description: 'A cinematic, fashion-inspired layout with sophisticated typography.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isBlank: false
  },
  {
    id: 'tpl-2',
    name: 'Royal Heritage',
    category: 'Traditional',
    description: 'Rich colors and ornamental details for a classic Indian aesthetic.',
    image: 'https://images.unsplash.com/photo-1583939000145-c8e472cb46a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isBlank: false
  },
  {
    id: 'tpl-3',
    name: 'Minimalist Romance',
    category: 'Modern',
    description: 'Clean lines, generous whitespace, and delicate accents.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isBlank: false
  }
];

export const MOCK_METRICS = {
  total: 12,
  published: 5,
  drafts: 7
};
