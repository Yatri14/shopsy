'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Search,
  ShoppingCart,
} from 'lucide-react';

import Breadcrumbs from '../../components/Breadcrumbs';
import PremiumFeaturesPanel from '../../components/PremiumFeaturesPanel';
import { formatUsdAsInr } from '../../lib/utils';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  stock: boolean;
  image: string;
  quantity?: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Aurora Headphones',
    price: 149,
    category: 'Audio',
    brand: 'Auralis',
    rating: 4.8,
    stock: true,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Luna Backpack',
    price: 89,
    category: 'Travel',
    brand: 'North',
    rating: 4.6,
    stock: true,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Nova Smart Watch',
    price: 219,
    category: 'Wearables',
    brand: 'Tempo',
    rating: 4.9,
    stock: false,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Halo Lamp',
    price: 129,
    category: 'Home',
    brand: 'Lumen',
    rating: 4.7,
    stock: true,
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Orbit Speaker',
    price: 99,
    category: 'Audio',
    brand: 'Auralis',
    rating: 4.5,
    stock: true,
    image:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Atlas Tote',
    price: 74,
    category: 'Travel',
    brand: 'North',
    rating: 4.4,
    stock: true,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
];

const pageSize = 3;

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [page, setPage] = useState(1);

  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  // Load cart and wishlist
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopsy-cart');
      const savedWishlist = localStorage.getItem('shopsy-wishlist');

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  }, []);

  const filtered = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesQuery =
        product.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesBrand =
        brand === 'all' || product.brand === brand;

      const matchesAvailability =
        availability === 'all' ||
        (availability === 'in-stock'
          ? product.stock
          : !product.stock);

      return (
        matchesQuery &&
        matchesBrand &&
        matchesAvailability
      );
    });
  }, [brand, availability, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const currentPageProducts = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product: Product) => {
    if (!product.stock) {
      setMessage('This product is out of stock.');
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    const updatedCart = existingItem
      ? cart.map((item) => item.id === product.id
        ? { ...item, quantity: (item.quantity ?? 1) + 1 }
        : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);

    localStorage.setItem(
      'shopsy-cart',
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event('cartUpdated'));

    setMessage(`${product.name} added to cart!`);
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist: Product[];

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

      setMessage(
        `${product.name} removed from wishlist.`
      );
    } else {
      updatedWishlist = [...wishlist, product];

      setMessage(
        `${product.name} added to wishlist!`
      );
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      'shopsy-wishlist',
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event('wishlistUpdated')
    );
  };

  const isWishlisted = (id: number) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products' },
          ]}
        />

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">
              Products
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Discover premium essentials
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/wishlist"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
            >
              <Heart className="h-5 w-5" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart
              {cart.length > 0 && (
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-950">
                  {cart.length}
                </span>
              )}
            </Link>

          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
            {message}
          </div>
        )}

        {/* SEARCH / FILTER */}

        <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            <label className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
              <Search className="h-4 w-4 text-slate-500" />

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search products"
                className="w-full bg-transparent outline-none"
              />
            </label>

            <div className="flex flex-wrap gap-3">

              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setPage(1);
                }}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">
                  All brands
                </option>
                <option value="Auralis">
                  Auralis
                </option>
                <option value="North">
                  North
                </option>
                <option value="Tempo">
                  Tempo
                </option>
                <option value="Lumen">
                  Lumen
                </option>
              </select>

              <select
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setPage(1);
                }}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">
                  All availability
                </option>
                <option value="in-stock">
                  In stock
                </option>
                <option value="out-of-stock">
                  Out of stock
                </option>
              </select>

            </div>
          </div>
        </div>

        <div className="mb-8">
          <PremiumFeaturesPanel />
        </div>

        {/* PRODUCTS */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {currentPageProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >

              {/* IMAGE */}

              <div className="relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full rounded-2xl object-cover"
                />

                <button
                  onClick={() =>
                    toggleWishlist(product)
                  }
                  className="absolute right-3 top-3 rounded-full bg-white p-3 shadow-md transition hover:scale-110"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-700'
                    }`}
                  />
                </button>

              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>{product.category}</span>
                <span>
                  {product.rating.toFixed(1)} ★
                </span>
              </div>

              <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                {product.name}
              </h2>

              <div className="mt-4 flex items-center justify-between">

                <div>
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">
                    {formatUsdAsInr(product.price)}
                  </p>

                  <p className="text-sm text-slate-500">
                    {product.brand}
                  </p>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
                >
                  View
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

              {/* ADD CART */}

              <button
                onClick={() => addToCart(product)}
                disabled={!product.stock}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                  product.stock
                    ? 'bg-slate-950 text-white hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950'
                    : 'cursor-not-allowed bg-slate-200 text-slate-400'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />

                {product.stock
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </button>

            </article>
          ))}

        </div>

        {/* PAGINATION */}

        <div className="mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:justify-between">

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Filter className="h-4 w-4" />

            Showing {currentPageProducts.length} of{' '}
            {filtered.length} results
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="rounded-full border border-slate-200 p-2 disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-3 text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              disabled={page === totalPages}
              className="rounded-full border border-slate-200 p-2 disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}