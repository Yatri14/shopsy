'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Flame,
  Heart,
  Instagram,
  Moon,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  SunMedium,
  Truck,
} from 'lucide-react';

const featuredProducts = [
  { name: 'Aurora Headphones', price: '$149', tag: 'Audio', accent: 'from-blue-500/20 to-slate-900/10' },
  { name: 'Luna Backpack', price: '$89', tag: 'Travel', accent: 'from-sky-400/20 to-cyan-500/10' },
  { name: 'Nova Smart Watch', price: '$219', tag: 'Wearables', accent: 'from-slate-900/20 to-blue-500/10' },
];

const bestSellers = [
  { name: 'Halo Lamp', price: '$129', badge: 'Bestseller' },
  { name: 'Orbit Speaker', price: '$99', badge: 'Hot' },
  { name: 'Atlas Tote', price: '$74', badge: 'New' },
];

const trendingProducts = [
  { name: 'Aero Runner', price: '$120' },
  { name: 'Pulse Case', price: '$49' },
  { name: 'Contour Chair', price: '$299' },
  { name: 'Mira Bottle', price: '$32' },
];

const categories = ['Tech', 'Fashion', 'Home', 'Wellness'];
const brands = ['Apple', 'Nike', 'Amazon', 'Sony', 'Adidas', 'Samsung'];
const testimonials = [
  { quote: 'The experience feels as premium as the products themselves.', name: 'Alicia M.', role: 'Creative Director' },
  { quote: 'I bought my setup in under ten minutes and loved every detail.', name: 'Jordan P.', role: 'Product Designer' },
];

const instagramPosts = [
  { title: 'Weekend edit', tone: 'from-slate-900 to-blue-600' },
  { title: 'Studio essentials', tone: 'from-blue-600 to-sky-400' },
  { title: 'City carry', tone: 'from-slate-800 to-slate-500' },
  { title: 'Glow mode', tone: 'from-cyan-500 to-slate-900' },
];

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('shopsy-theme') as 'light' | 'dark' | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = saved ?? system;
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('shopsy-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">Shopsy</Link>
        <div className="flex items-center gap-3">
          <Link href="/products" className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300 sm:inline-flex">
            Shop now
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
            <Sparkles className="mr-2 h-4 w-4" /> Premium shopping, reimagined
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Apple-level polish. Nike energy. Amazon convenience.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Discover a modern marketplace with premium design, fast delivery, and standout essentials curated for everyday luxury.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400">
              Explore collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/about" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300">
              Why Shopsy
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Free shipping', '24/7 support', 'Secure checkout'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-700 p-8 text-white shadow-[0_30px_80px_-30px_rgba(59,130,246,0.55)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-blue-200">Flash sale</p>
              <h2 className="mt-2 text-2xl font-semibold">Up to 60% off iconic picks</h2>
            </div>
            <div className="rounded-full bg-white/15 p-3">
              <Flame className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">Limited edition</p>
                  <p className="text-lg font-semibold">Nova Smart Watch</p>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm">-40%</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">Studio bundle</p>
                  <p className="text-lg font-semibold">Aurora + Luna</p>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm">Save $80</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-blue-100">
            <Truck className="h-4 w-4" /> Express delivery and free returns included.
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Fast delivery', text: 'Premium packaging in 2-4 days.', icon: <Truck className="h-6 w-6" /> },
            { title: 'Secure checkout', text: 'Stripe and Razorpay protected.', icon: <ShieldCheck className="h-6 w-6" /> },
            { title: 'Gift-ready', text: 'Beautiful wrapping and easy returns.', icon: <Heart className="h-6 w-6" /> },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Featured products</p>
            <h2 className="text-2xl font-semibold">The new essentials</h2>
          </div>
          <Link href="/products" className="flex items-center text-sm font-medium text-slate-700 hover:text-blue-500 dark:text-slate-300">
            Browse all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`h-32 rounded-2xl bg-gradient-to-br ${product.accent}`} />
              <p className="mt-4 text-sm font-medium text-blue-500">{product.tag}</p>
              <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-semibold">{product.price}</span>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
                  Add to bag
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white dark:border-slate-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Best sellers</p>
              <h2 className="mt-2 text-2xl font-semibold">Loved by modern shoppers</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-100">Free express shipping over $100</div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bestSellers.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">{item.badge}</span>
                  <ShoppingBag className="h-5 w-5 text-blue-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-300">Comfort-forward, premium-finished, and built to perform.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">{item.price}</span>
                  <button className="text-sm font-medium text-blue-200">Buy now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Trending now</p>
            <h2 className="text-2xl font-semibold">Fast-moving favorites</h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-slate-700 hover:text-blue-500 dark:text-slate-300">See more</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {trendingProducts.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
              <h3 className="mt-4 font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Limited drop • premium finish</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{item.price}</span>
                <Star className="h-4 w-4 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Latest collection</p>
            <h2 className="mt-2 text-2xl font-semibold">Minimalist pieces, maximum impact</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Crafted for travel, work, and everyday rituals with a premium finish.</p>
            <Link href="/products" className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
              Shop latest <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['New arrivals', 'Studio edit', 'Everyday carry', 'Cloud comfort'].map((label) => (
              <div key={label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
                <div className="h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-slate-900/10" />
                <h3 className="mt-4 text-lg font-semibold">{label}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Refined objects designed to elevate daily life.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Categories</p>
            <h2 className="mt-2 text-2xl font-semibold">Built for every lifestyle</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold">{category}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Curated collections and fresh arrivals.</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Brands</p>
            <h2 className="mt-2 text-2xl font-semibold">Partnered with the best</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {brands.map((brand) => (
                <div key={brand} className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Testimonials</p>
              <h2 className="mt-2 text-2xl font-semibold">What customers are saying</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-slate-700 dark:text-slate-200">“{item.quote}”</p>
                <div className="mt-6">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-blue-500/10 to-slate-950/5 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Newsletter</p>
              <h2 className="mt-2 text-2xl font-semibold">Join the Shopsy list</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Receive first access to launches, offers, and limited drops.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 dark:border-slate-700 dark:bg-slate-800" placeholder="Email address" />
                <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Instagram gallery</p>
            <h2 className="text-2xl font-semibold">#ShopsyStyle</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {instagramPosts.map((post) => (
            <div key={post.title} className={`h-40 rounded-[24px] bg-gradient-to-br ${post.tone} p-4 text-white`}>
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Instagram className="h-5 w-5" />
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs">View</span>
                </div>
                <p className="text-sm font-semibold">{post.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 py-10 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-sm text-slate-600 lg:grid-cols-4 lg:px-8 dark:text-slate-300">
          <div>
            <p className="text-lg font-semibold text-slate-950 dark:text-slate-100">Shopsy</p>
            <p className="mt-3">Premium essentials for a calm, elevated daily life.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-950 dark:text-slate-100">Shop</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/products" className="hover:text-blue-500">All products</Link></li>
              <li><Link href="/products" className="hover:text-blue-500">New arrivals</Link></li>
              <li><Link href="/products" className="hover:text-blue-500">Bestsellers</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-950 dark:text-slate-100">Support</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="hover:text-blue-500">About us</Link></li>
              <li><Link href="/checkout" className="hover:text-blue-500">Shipping</Link></li>
              <li><Link href="/about" className="hover:text-blue-500">Returns</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-950 dark:text-slate-100">Follow</p>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-500">TikTok</a></li>
              <li><a href="#" className="hover:text-blue-500">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
