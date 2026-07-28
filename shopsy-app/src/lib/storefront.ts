export interface ShopProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number;
  description: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  images: string[];
  features: string[];
  tags: string[];
  accent: string;
}

export const storefrontProducts: ShopProduct[] = [
  {
    id: 1,
    slug: 'aurora-headphones',
    name: 'Aurora Headphones',
    price: 149,
    compareAtPrice: 199,
    description: 'Immersive sound, all-day comfort, and studio-grade noise cancellation in a premium silhouette designed for modern listening.',
    category: 'Audio',
    brand: 'Auralis',
    rating: 4.8,
    reviews: 312,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['40mm drivers', 'Adaptive ANC', '30-hour battery'],
    tags: ['Premium audio', 'Noise cancelling'],
    accent: 'from-blue-500/20 to-slate-900/10',
  },
  {
    id: 2,
    slug: 'luna-backpack',
    name: 'Luna Backpack',
    price: 89,
    compareAtPrice: 118,
    description: 'A refined carry-all with weatherproof fabric, modular storage, and a minimalist profile for everyday movement.',
    category: 'Travel',
    brand: 'North',
    rating: 4.6,
    reviews: 184,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['Weatherproof shell', 'Modular compartments', 'Slim silhouette'],
    tags: ['Travel ready', 'Minimalist'],
    accent: 'from-sky-400/20 to-cyan-500/10',
  },
  {
    id: 3,
    slug: 'nova-smart-watch',
    name: 'Nova Smart Watch',
    price: 219,
    compareAtPrice: 269,
    description: 'Track vital stats, stay connected, and showcase wellness with a polished, athletic finish.',
    category: 'Wearables',
    brand: 'Tempo',
    rating: 4.9,
    reviews: 241,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['24/7 health tracking', 'GPS + NFC', 'All-day battery'],
    tags: ['Fitness', 'Connected'],
    accent: 'from-slate-900/20 to-blue-500/10',
  },
  {
    id: 4,
    slug: 'halo-lamp',
    name: 'Halo Lamp',
    price: 129,
    compareAtPrice: 159,
    description: 'A sculptural ambient lamp that turns everyday rooms into calm, designer-focused spaces.',
    category: 'Home',
    brand: 'Lumen',
    rating: 4.7,
    reviews: 126,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['Adjustable warmth', 'Compact footprint', 'Sculptural finish'],
    tags: ['Home decor', 'Ambient lighting'],
    accent: 'from-amber-500/20 to-slate-900/10',
  },
  {
    id: 5,
    slug: 'orbit-speaker',
    name: 'Orbit Speaker',
    price: 99,
    compareAtPrice: 129,
    description: 'A compact speaker that balances rich bass, Bluetooth range, and premium durability.',
    category: 'Audio',
    brand: 'Auralis',
    rating: 4.5,
    reviews: 168,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['Rich bass', 'Portable design', 'Fast pairing'],
    tags: ['Portable audio', 'Smart pairing'],
    accent: 'from-cyan-500/20 to-slate-900/10',
  },
  {
    id: 6,
    slug: 'atlas-tote',
    name: 'Atlas Tote',
    price: 74,
    compareAtPrice: 94,
    description: 'A soft-structured carryall with timeless utility and refined organization for daily routines.',
    category: 'Travel',
    brand: 'North',
    rating: 4.4,
    reviews: 115,
    stock: 13,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    ],
    features: ['Soft structure', 'Smart pockets', 'Built to travel'],
    tags: ['Everyday carry', 'Minimal design'],
    accent: 'from-slate-800/20 to-blue-500/10',
  },
];

export const featuredProducts = storefrontProducts.slice(0, 3);
export const bestSellers = storefrontProducts.slice(3, 6);
export const trendingProducts = storefrontProducts.slice(1, 5);
export const categories = ['Tech', 'Fashion', 'Home', 'Wellness'];
export const brands = ['Auralis', 'North', 'Tempo', 'Lumen'];
export const testimonials = [
  { quote: 'The experience feels as premium as the products themselves.', name: 'Alicia M.', role: 'Creative Director' },
  { quote: 'I bought my setup in under ten minutes and loved every detail.', name: 'Jordan P.', role: 'Product Designer' },
];

export const instagramPosts = [
  { title: 'Weekend edit', tone: 'from-slate-900 to-blue-600' },
  { title: 'Studio essentials', tone: 'from-blue-600 to-sky-400' },
  { title: 'City carry', tone: 'from-slate-800 to-slate-500' },
  { title: 'Glow mode', tone: 'from-cyan-500 to-slate-900' },
];

export const getProductBySlug = (slug: string) => storefrontProducts.find((product) => product.slug === slug) ?? storefrontProducts[0];

export const getRelatedProducts = (slug: string) => storefrontProducts.filter((product) => product.slug !== slug).slice(0, 3);
