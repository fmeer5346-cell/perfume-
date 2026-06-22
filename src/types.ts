export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Perfume {
  id: string;
  name: string;
  collection: string;
  concentration: string;
  price50ml: number;
  price100ml: number;
  description: string;
  lore: string;
  gender: 'unisex' | 'masculine' | 'feminine';
  accords: string[];
  notes: ScentNotes;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  imageUrl: string;
  bottleColor: string; // CSS compatible hex or gradient
  liquidColor: string; // Glass reflection color
  accentColor: string; // Accent color for buttons and typography
  character: string; // e.g. "Mystic, Noble, Intoxicating"
}

export interface CartItem {
  id: string;
  perfume: Perfume;
  size: '50ml' | '100ml';
  engravingText: string;
  giftWrapped: boolean;
  quantity: number;
}

export type OlfactoryFamily = 'all' | 'oriental' | 'fresh' | 'floral' | 'woody';

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    description: string;
    value: string; // mapped to olfactory preference or gender
    icon: string;
  }[];
}
