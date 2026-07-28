'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../../components/Breadcrumbs';
import PremiumFeaturesPanel from '../../components/PremiumFeaturesPanel';

const PerformanceImage = dynamic(() => import('../../components/PerformanceImage'), { ssr: true });

const allProducts = [
  { id: 1, name: 'Aurora Headphones', price: 149, category: 'Audio', brand: 'Auralis', rating: 4.8, stock: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Luna Backpack', price: 89, category: 'Travel', brand: 'North', rating: 4.6, stock: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Nova Smart Watch', price: 219, category: 'Wearables', brand: 'Tempo', rating: 4.9, stock: false, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Halo Lamp', price: 129, category: 'Home', brand: 'Lumen', rating: 4.7, stock: true, image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Orbit Speaker', price: 99, category: 'Audio', brand: 'Auralis', rating: 4.5, stock: true, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'Atlas Tote', price: 74, category: 'Travel', brand: 'North', rating: 4.4, stock: true, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80' },
];

const pageSize = 3;

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(pageSize);

  const filtered = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
      const matchesBrand = brand === 'all' || product.brand === brand;
      const matchesAvailability = availability === 'all' || (availability === 'in-stock' ? product.stock : !product.stock);
      return matchesQuery && matchesBrand && matchesAvailability;
    });
  }, [brand, availability, query]);

  const paged = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && visible < filtered.length) {
        setVisible((current) => Math.min(current + pageSize, filtered.length));
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filtered.length, visible]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageProducts = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Products</p>
            <h1 className="mt-2 text-3xl font-semibold">Discover premium essentials</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">Infinite scroll + pagination-ready results</div>
        </div>

        <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
              <Search className="h-4 w-4 text-slate-500" />
              <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search products" className="w-full bg-transparent outline-none" />
            </label>
            <div className="flex flex-wrap gap-3">
              <select value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="all">All brands</option>
                <option value="Auralis">Auralis</option>
                <option value="North">North</option>
                <option value="Tempo">Tempo</option>
                <option value="Lumen">Lumen</option>
              </select>
              <select value={availability} onChange={(e) => { setAvailability(e.target.value); setPage(1); }} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="all">All availability</option>
                <option value="in-stock">In stock</option>
                <option value="out-of-stock">Out of stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <PremiumFeaturesPanel />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((product) => (
            <article key={product.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <PerformanceImage src={product.image} alt={product.name} width={800} height={600} className="h-48 rounded-2xl" />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>{product.category}</span>
                <span>{product.rating.toFixed(1)} ★</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{product.name}</h2>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">${product.price}</p>
                  <p className="text-sm text-slate-500">{product.brand}</p>
                </div>
                <Link href={`/products/${product.id}`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">
                  View <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Filter className="h-4 w-4" /> Showing {Math.min(visible, filtered.length)} of {filtered.length} results
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-full border border-slate-200 p-2 dark:border-slate-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-full border border-slate-200 p-2 dark:border-slate-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
