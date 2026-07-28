'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Access denied</h1>
        <p className="mt-4 text-slate-600">You need an admin account to view this page.</p>
        <Link href="/auth" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Sign in as admin</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-950">Admin dashboard</h1>
      <p className="mt-2 text-slate-600">Manage products, orders, customers, and catalog visibility from one place.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold">Products</h2><p className="mt-2 text-sm text-slate-600">Create, edit, and archive premium inventory.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold">Orders</h2><p className="mt-2 text-sm text-slate-600">Monitor payment status and shipping progress.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold">Customers</h2><p className="mt-2 text-sm text-slate-600">Support retention, loyalty, and lifecycle messaging.</p></div>
      </div>
    </main>
  );
}
