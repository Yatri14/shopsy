'use client';

import Link from 'next/link';

export default function WishlistPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">My Wishlist</h1>

      <p className="mt-4 text-gray-500">
        Your wishlist is currently empty.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        Browse Products
      </Link>
    </main>
  );
}