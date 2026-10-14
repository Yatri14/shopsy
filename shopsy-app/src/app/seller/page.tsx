'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Store,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatUsdAsInr } from '../../lib/utils';

export default function SellerDashboardPage() {
  const stats = [
    {
      title: 'Total Products',
      value: '24',
      change: '+4 this week',
      isPositive: true,
      icon: Package,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      title: 'Total Orders',
      value: '142',
      change: '+18% vs last month',
      isPositive: true,
      icon: ShoppingBag,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
    },
    {
      title: 'Total Revenue',
      value: formatUsdAsInr(12480),
      change: '+12.5% this month',
      isPositive: true,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/20',
    },
    {
      title: 'Store Views',
      value: '3,890',
      change: '+24% this week',
      isPositive: true,
      icon: Eye,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
    },
  ];

  const recentOrders = [
    { id: 'ORD-9821', customer: 'Alex Johnson', item: 'Halo Smart Desk Lamp', amount: formatUsdAsInr(129), status: 'Completed', date: '10 mins ago' },
    { id: 'ORD-9820', customer: 'Sophia Chen', item: 'Ergonomic Mesh Chair', amount: formatUsdAsInr(299), status: 'Processing', date: '1 hour ago' },
    { id: 'ORD-9819', customer: 'Marcus Vance', item: 'Wireless Mechanical Keyboard', amount: formatUsdAsInr(159), status: 'Pending', date: '3 hours ago' },
    { id: 'ORD-9818', customer: 'Elena Rostova', item: 'Ultra-clear 4K Monitor Arm', amount: formatUsdAsInr(89), status: 'Completed', date: 'Yesterday' },
  ];

  const topProducts = [
    { name: 'Halo Smart Desk Lamp', sales: '64 units', revenue: formatUsdAsInr(8256), stock: 18, status: 'In Stock' },
    { name: 'Ergonomic Mesh Chair', sales: '42 units', revenue: formatUsdAsInr(12558), stock: 5, status: 'Low Stock' },
    { name: 'Wireless Mechanical Keyboard', sales: '36 units', revenue: formatUsdAsInr(5724), stock: 24, status: 'In Stock' },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl dark:from-slate-900 dark:to-indigo-950 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-md">
              <Store className="h-3.5 w-3.5" /> Seller Hub
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Seller Dashboard
            </h1>
            <p className="text-sm text-slate-300">
              Manage inventory, track customer orders, and scale your storefront business.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/seller/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Plus className="h-4 w-4" /> Add New Product
            </Link>
            <Link
              href="/seller/orders"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <ShoppingBag className="h-4 w-4" /> View Orders
            </Link>
          </div>
        </div>

        {/* METRICS STAT CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </span>
                  <div className={`rounded-2xl bg-gradient-to-br ${stat.color} p-3 text-white shadow-md ${stat.shadow}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {stat.value}
                  </h2>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* QUICK NAVIGATION MODULES */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/seller/products"
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Package className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Product Catalog
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Create listings, update inventory counts, manage pricing & discounts.
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-slate-100 p-3 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span>• 24 Active items</span>
              <span>• 2 Drafts</span>
              <span>• 1 Out of Stock</span>
            </div>
          </Link>

          <Link
            href="/seller/orders"
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-emerald-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Fulfillment & Orders
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Process incoming buyer purchases, generate shipping labels & track delivery.
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-slate-100 p-3 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span>• 12 Pending fulfillment</span>
              <span>• 130 Shipped</span>
            </div>
          </Link>
        </div>

        {/* TABLES / OVERVIEW DETAILS */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* RECENT ORDERS TABLE */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
                <p className="text-xs text-slate-500">Latest transactions from your store</p>
              </div>
              <Link href="/seller/orders" className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
                View all orders &rarr;
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="py-3 px-2">Order ID</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">Product</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-2 font-mono font-medium text-slate-700 dark:text-slate-300">{order.id}</td>
                      <td className="py-3 px-2 font-medium text-slate-900 dark:text-white">{order.customer}</td>
                      <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{order.item}</td>
                      <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          order.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        }`}>
                          {order.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                          {order.status === 'Processing' && <Clock className="h-3 w-3" />}
                          {order.status === 'Pending' && <AlertCircle className="h-3 w-3" />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOP PERFORMING PRODUCTS */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Products</h3>
                <p className="text-xs text-slate-500">Best selling items this month</p>
              </div>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 space-y-4">
              {topProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{prod.name}</p>
                    <p className="text-xs text-slate-500">{prod.sales} sold • <span className="font-semibold text-emerald-600 dark:text-emerald-400">{prod.revenue}</span></p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    prod.status === 'In Stock'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {prod.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/seller/products"
                className="block w-full rounded-xl bg-slate-100 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Manage Full Inventory &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
