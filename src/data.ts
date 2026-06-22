import { Perfume, QuizQuestion } from './types';

export const PERFORMANCE_MOCK_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'Hamza Khan',
    rating: 5,
    comment: 'The Cambodian agarwood in Oud Al-Ansaar smells incredibly rich and deep. The monogram laser-etched on the heavy black glass is beautiful. Lasts 12+ hours on linen!',
    date: 'June 09, 2026'
  },
  {
    id: 'rev-2',
    userName: 'Amara Vance',
    rating: 5,
    comment: 'Musk Silk is the cleanest scent I have ever encountered. It smells like pure luxury silk sheets dried on fresh peak alpine air. Highly recommend the 100ml size + customized gift wrap.',
    date: 'June 18, 2026'
  },
  {
    id: 'rev-3',
    userName: 'Zayd Siddiqui',
    rating: 4,
    comment: 'Zarar Gold has an exceptional cardamon and vetiver dry down. Extremely professional to wear for high-stakes corporate negotiations. Elegant brass cap packaging.',
    date: 'May 28, 2026'
  }
];

export const PERFUMES_DATA: Perfume[] = [
  {
    id: 'oud-ansaar',
    name: 'Oud Al-Ansaar',
    collection: 'J. Heritage Collection',
    concentration: 'Extrait de Parfum',
    price50ml: 120,
    price100ml: 195,
    description: 'A majestic royal opus centering certified Cambodian agarwood, zesty saffron filaments, and smoked leather. Encased in a geometric dark-amber and gold-gilded flacon representing centuries of oriental mystery.',
    lore: 'Inspired by traditional Dehn Al Oud. The word Ansaar translates to the Supporters or Helpers. A fragrance of noble trust, crafted for cold winter nights and momentous celebrations, leaving an unforgettable amber trail.',
    gender: 'unisex',
    accords: ['Woody', 'Oriental', 'Amber', 'Spicy'],
    notes: {
      top: ['Saffron Filaments', 'Nutmeg Essence', 'Fresh Lavender'],
      heart: ['Royal Cambodian Oud', 'Nagarmotha (Cypriol)', 'Patchouli Coeur'],
      base: ['Smoked Leather Accord', 'Baltic Amber', 'White Cedarwood']
    },
    rating: 4.9,
    reviewsCount: 148,
    reviews: [
      {
        id: 'rev-o1',
        userName: 'Sohail Al-Mansoori',
        rating: 5,
        comment: 'This is premium niche quality. The agarwood starts raw but turns into an incredibly smooth, warm sweet honey-amber. Absolutely majestic J. signature bottle.',
        date: 'May 12, 2026'
      },
      ...PERFORMANCE_MOCK_REVIEWS.slice(0, 1)
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#1a0e08] via-[#2d180d] to-[#120803]',
    liquidColor: '#c5a85c',
    accentColor: '#c5a85c',
    character: 'Mystic, Majestic, Noble'
  },
  {
    id: 'musk-silk',
    name: 'Musk Silk',
    collection: 'J. Silk Accords',
    concentration: 'Eau de Parfum',
    price50ml: 95,
    price100ml: 155,
    description: 'A powder-soft breeze of crystalline white musk, fresh aldehydes, and soft Lily of the Valley. Evokes pristine silk linen dried under clean morning sunshine, radiating pure serenity.',
    lore: 'Silk is light, tactile, and floats effortlesly. Musk Silk is designed as a soft, comforting skin-scent that behaves like high-luxury fabric. It wraps around your pulse points like a fine Cashmere shawl.',
    gender: 'unisex',
    accords: ['Musky', 'Floral', 'Fresh', 'Powdery'],
    notes: {
      top: ['Aldehydes', 'White Peony', 'Wild Lily of the Valley'],
      heart: ['Crystalline White Musk', 'Violet Leaves', 'Creamy Iris Root'],
      base: ['Sandalwood Mysore', 'White Iris', 'Bourbon Vanilla']
    },
    rating: 4.8,
    reviewsCount: 219,
    reviews: [
      {
        id: 'rev-m1',
        userName: 'Elena Rostova',
        rating: 5,
        comment: 'Pure white heaven block. It is clean, powdery, expensive-smelling and stays close to the skin. Love spraying this after a luxury hammam shower.',
        date: 'June 02, 2026'
      },
      ...PERFORMANCE_MOCK_REVIEWS.slice(1, 2)
    ],
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#f5f5f7] via-[#e5e7eb] to-[#d1d5db]',
    liquidColor: '#e0f2fe',
    accentColor: '#93c5fd',
    character: 'Clean, Crystalline, Serene'
  },
  {
    id: 'janis-imperial',
    name: 'Janis Imperial',
    collection: 'J. Obsidian Masterpieces',
    concentration: 'Eau de Parfum',
    price50ml: 110,
    price100ml: 175,
    description: 'A commandingly crisp fusion of sweet roasted pineapple, cold-pressed Italian Bergamot, smoked birch bark, and heavy Tuscan leather. Extremely vibrant, masculine, and sophisticated.',
    lore: 'Janis is standard-bearer of triumph and legacy. Designed for the commander of destiny, fusing rich, smoky woodsy undertones with modern juicy zesty freshness, perfect for making an elite statement.',
    gender: 'masculine',
    accords: ['Woody', 'Fresh', 'Smoky', 'Fruit'],
    notes: {
      top: ['Roasted Pineapple', 'Italian Bergamot', 'French Blackcurrant'],
      heart: ['Smoked Birch Bark', 'Moroccan Rose Jasmine', 'Patchouli Leaves'],
      base: ['Tuscan Leather Suede', 'Spanish Oakmoss', 'Golden Ambergris']
    },
    rating: 4.95,
    reviewsCount: 312,
    reviews: [
      {
        id: 'rev-j1',
        userName: 'Ahmad Rafay',
        rating: 5,
        comment: 'This is incredibly close to classic niche smoky pineapples but has a much higher oil concentration. Very rich leather undertone. Complete compliment puller.',
        date: 'June 15, 2026'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#0a0a0c] via-[#16161c] to-[#040405]',
    liquidColor: '#a855f7',
    accentColor: '#c084fc',
    character: 'Bold, Magnetic, Smoky'
  },
  {
    id: 'zarar-gold',
    name: 'Zarar Gold',
    collection: 'J. Imperial Prestige',
    concentration: 'Eau de Parfum',
    price50ml: 85,
    price100ml: 135,
    description: 'A premium, radiant burst of Sicilian sweet oranges, cardamom spice, and earth-bound Vetiver roots. Designed in a luxurious heavy gold brushed bottle indicating physical triumph.',
    lore: 'Zarar represents active courage and chivalry. Fusing vibrant, high-energy solar citrus with ancient resinous woods and premium vetiver oils, it provides an exquisite energy signature all day.',
    gender: 'masculine',
    accords: ['Fresh', 'Woody', 'Spicy', 'Citrus'],
    notes: {
      top: ['Sicilian Orange', 'Grapefruit Zest', 'Green Cardamom'],
      heart: ['Fresh Ginger Root', 'Rosemary Leaves', 'Earthy Blue Iris'],
      base: ['Resinous Vetiver', 'Teakwood', 'Smoked Amber']
    },
    rating: 4.75,
    reviewsCount: 92,
    reviews: [
      ...PERFORMANCE_MOCK_REVIEWS.slice(2, 3)
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#d4af37]/30 via-[#d4af37]/70 to-[#8a6d1c]/90',
    liquidColor: '#eab308',
    accentColor: '#facc15',
    character: 'Radiant, Confident, Heroic'
  },
  {
    id: 'dastaan-rose',
    name: 'Dastaan Rose',
    collection: 'J. Oriental Florals',
    concentration: 'Eau de Parfum',
    price50ml: 100,
    price100ml: 160,
    description: 'An enchanting floral fairy-tale spotlighting pure crimson Damascin rose petals, jasmine absolute, cashmere woods, and rich sweet saffron. Deeply sensual and velvety.',
    lore: 'Dastaan translates to "An Epic Story". This masterpiece chronicles the passionate union between oriental floral gardens and the golden spice of saffron, leaving an intoxicating, addictive sillage trail.',
    gender: 'feminine',
    accords: ['Floral', 'Amber', 'Spicy', 'Sweet'],
    notes: {
      top: ['Damascin Red Rose', 'Gold Saffron', 'Wild Berries'],
      heart: ['Jasmine Grandiflorum', 'Cashmere Sensual Wood', 'Blossoming Peony'],
      base: ['Amberwood Crystals', 'Madagascar Vanilla Suede', 'Oakmoss Absolute']
    },
    rating: 4.88,
    reviewsCount: 167,
    reviews: [
      {
        id: 'rev-d1',
        userName: 'Zara Ahmed',
        rating: 5,
        comment: 'Takes my breath away. It is luxurious, sweet, earthy, and floral all once. The custom rose-gold engraving on my bottle makes me feel like a Queen.',
        date: 'May 30, 2026'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#3a0614] via-[#5c0e22] to-[#24030b]',
    liquidColor: '#f43f5e',
    accentColor: '#fb7185',
    character: 'Violaceous, Velvet, Eternal'
  },
  {
    id: 'emerald-oud',
    name: 'Emerald Royal',
    collection: 'J. Imperial Prestige',
    concentration: 'Extrait de Parfum',
    price50ml: 115,
    price100ml: 185,
    description: 'A cold, icy mint opening that seamlessly melts into intense woody patchouli, deep sweet jasmine floral accord, and raw sandalwood dust. Truly dynamic, regal, and high-contrast.',
    lore: 'Inspired by pristine emerald cut stones. Fuses majestic icy fresh aromatic top-notes with the dark, heavy luxury of real oriental agarwood and rich sandalwood, creating a supreme statement of wealth and prestige.',
    gender: 'unisex',
    accords: ['Fresh', 'Woody', 'Floral', 'Oriental'],
    notes: {
      top: ['Mountain Icy Mint', 'Green Apple Skin', 'Calabrian Lemon'],
      heart: ['Bourbon Geranium', 'Night Jasmine', 'Warm Cardamom'],
      base: ['Sandalwood Dust', 'Sumatran Patchouli Coeur', 'Haitian Vetiver']
    },
    rating: 4.82,
    reviewsCount: 115,
    reviews: [
      {
        id: 'rev-e1',
        userName: 'Kamil Shah',
        rating: 4,
        comment: 'Incredible green patchouli combination. It feels extremely cold and fresh at the beginning, but soon morphs into a heavy luxurious wood. Super sophisticated.',
        date: 'June 05, 2026'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    bottleColor: 'from-[#052216] via-[#09472e] to-[#020d09]',
    liquidColor: '#10b981',
    accentColor: '#34d399',
    character: 'Noble, Dynamic, Regal'
  }
];

export const SCENT_ACCORDS_LIST = [
  { name: 'Oriental', description: 'Rich, sensual spices, ambergris, and sweet resin drops.', icon: '✨', color: '#ecc94b' },
  { name: 'Woody', description: 'Certified Cambodian oud, sandalwood, cedar, and vetiver roots.', icon: '🪵', color: '#b58d3d' },
  { name: 'Fresh', description: 'Italian bergamot, Aldehydes, dewy mint, and cold sea breeze.', icon: '❄️', color: '#3182ce' },
  { name: 'Floral', description: 'Damascus red roses, white lilies, jasmine, and orange blossom.', icon: '🌹', color: '#e53e3e' },
  { name: 'Musky', description: 'Pure powdery crystalline soft musk and creamy skin chords.', icon: '☁️', color: '#a0aec0' }
];

export const OLFACTORY_PERSONALITY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    text: 'Which atmosphere encapsulates your ultimate dream getaway?',
    options: [
      { label: 'Royal Majlis & Mystic Desert Fire', description: 'Spiced amber, smoke under twinkling stars.', value: 'oriental', icon: '✨' },
      { label: 'Pristine Coastal Cliffs ', description: 'Salty ocean air, wild lemons, and cold water splash.', value: 'fresh', icon: '❄️' },
      { label: 'Ancient Mahogany Library & Coffee', description: 'Smoked leather seats, old papers, vetiver oil.', value: 'woody', icon: '🪵' },
      { label: 'Blooming Arabian Botanical Gardens', description: 'Crimson roses, jasmines, and honey pollen.', value: 'floral', icon: '🌹' }
    ]
  },
  {
    id: 2,
    text: 'How do you intend for your fragrance sillage to behave?',
    options: [
      { label: 'Whisper Velvet', description: 'A soft skin-scent felt only by those invited close.', value: 'unisex', icon: '☁️' },
      { label: 'Imperial Sillage', description: 'A bold statement that commands immediate attention.', value: 'masculine', icon: '⚔️' },
      { label: 'Eternal Romance', description: 'An enchanting, powdery trail of high floral praise.', value: 'feminine', icon: '💖' }
    ]
  },
  {
    id: 3,
    text: 'Which primary ingredient speaks most intimately to you?',
    options: [
      { label: 'Certified Rich Agarwood', description: 'Deep, mysterious, smoky, and resinous.', value: 'oriental', icon: '🪵' },
      { label: 'Damascus Red Roses', description: 'Intoxicating, romantic, spicy, and deep.', value: 'floral', icon: '🌹' },
      { label: 'Italian Cold-Pressed Bergamot', description: 'Vibrant, bright, zesty, and refreshing.', value: 'fresh', icon: '🍊' },
      { label: 'Crystalline Soft White Musk', description: 'Powdery, velvety, soothing, and warm.', value: 'woody', icon: '☁️' }
    ]
  }
];
