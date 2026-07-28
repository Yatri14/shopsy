'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Heart, Play, Share2, ShoppingCart, Sparkles, Star, Truck, RotateCcw, Scale, Eye, MessageCircle, BadgeCheck } from 'lucide-react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../../../components/Breadcrumbs';

const PerformanceImage = dynamic(() => import('../../../components/PerformanceImage'), { ssr: true });

const product = {
  name: 'Aurora Headphones',
  price: 149,
  originalPrice: 199,
  discount: 25,
  stock: 18,
  rating: 4.8,
  reviews: 312,
  description:
    'Immersive sound, all-day comfort, and studio-grade noise cancellation in a premium silhouette designed for modern listening.',
  specs: [
    '40mm drivers with spatial audio',
    'Adaptive ANC and transparency mode',
    '30-hour battery life with fast charge',
    'Soft-touch memory foam ear cushions',
  ],
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
  ],
};

const relatedProducts = [
  { name: 'Nova Smart Watch', price: '$219', tag: 'Wearables' },
  { name: 'Luna Backpack', price: '$89', tag: 'Travel' },
  { name: 'Halo Lamp', price: '$129', tag: 'Home' },
];

const alsoBought = [
  { name: 'Pulse Case', price: '$49' },
  { name: 'Mira Cable', price: '$29' },
];

const faqs = [
  { question: 'Is the battery removable?', answer: 'No, the battery is built-in and optimized for long-lasting use.' },
  { question: 'Can I use it for calls?', answer: 'Yes, the microphone array supports clear voice calls and voice assistants.' },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomed, setZoomed] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: product.name }]} />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
              <button
                onClick={() => setZoomed((v) => !v)}
                className="relative block w-full overflow-hidden"
              >
                <PerformanceImage
                  src={selectedImage}
                  alt={product.name}
                  width={900}
                  height={720}
                  className={`h-[420px] w-full object-cover transition duration-300 ${zoomed ? 'scale-125' : 'scale-100'}`}
                />
                <div className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur">
                  <Eye className="h-5 w-5" />
                </div>
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {product.images.map((image) => (
                <button key={image} onClick={() => setSelectedImage(image)} className={`overflow-hidden rounded-2xl border ${selectedImage === image ? 'border-blue-500' : 'border-slate-200 dark:border-slate-800'}`}>
                  <PerformanceImage src={image} alt={product.name} width={300} height={220} className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Product video</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">Demo</span>
              </div>
              <div className="mt-4 flex items-center justify-center rounded-[20px] bg-slate-900 p-10 text-white">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                  <Play className="ml-1 h-6 w-6" />
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Featured</p>
                  <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
                </div>
                <button className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{product.rating}</span>
                <span>({product.reviews} reviews)</span>
                <span className="flex items-center gap-1 text-emerald-600"><BadgeCheck className="h-4 w-4" /> Verified</span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <div className="text-3xl font-semibold">${product.price}</div>
                <div className="text-lg text-slate-400 line-through">${product.originalPrice}</div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">-{product.discount}%</div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Truck className="h-4 w-4 text-blue-500" />
                Delivery estimate: 2–4 business days
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <RotateCcw className="h-4 w-4 text-blue-500" />
                30-day return policy
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
                  <span className="flex items-center gap-2"><ShoppingCart className="h-4 w-4" /> Add to cart</span>
                </button>
                <button className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2"><Scale className="h-4 w-4" /> Compare</span>
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Free shipping', 'In stock', 'Warranty included'].map((pill) => (
                  <span key={pill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{pill}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Description</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">Premium</span>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{product.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div key={spec} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <div className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-blue-500" />{spec}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Reviews & ratings</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                <div className="text-4xl font-semibold">4.8/5</div>
                <div className="mt-2 flex items-center gap-1 text-amber-400"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Customers love the comfort, ANC, and premium finish.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-300">“Exceptional sound quality and looks premium.”</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">Mina S.</span>
                  <span className="text-sm text-slate-500">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Questions & answers</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2 font-semibold"><MessageCircle className="h-4 w-4 text-blue-500" /> {faq.question}</div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Related products</p>
              <h2 className="text-2xl font-semibold">You might also love</h2>
            </div>
            <Link href="/products" className="text-sm font-medium text-slate-700 hover:text-blue-500 dark:text-slate-300">See more</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-slate-900/10" />
                <p className="mt-4 text-sm font-medium text-blue-500">{item.tag}</p>
                <h3 className="mt-1 font-semibold">{item.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">{item.price}</span>
                  <button className="rounded-full bg-slate-950 px-3 py-2 text-sm font-medium text-white dark:bg-blue-500 dark:text-slate-950">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Frequently bought together</h2>
            <div className="mt-6 space-y-4">
              {alsoBought.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Bundle-friendly accessory</p>
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Share & discover</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Copy link', 'Twitter', 'WhatsApp', 'Email'].map((action) => (
                <button key={action} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2"><Share2 className="h-4 w-4" /> {action}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
              <h3 className="font-semibold">Recently viewed</h3>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Eye className="h-4 w-4 text-blue-500" /> You viewed the Nova Smart Watch earlier.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
