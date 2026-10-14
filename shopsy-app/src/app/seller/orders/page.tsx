'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingBag,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  Eye
} from 'lucide-react';
import { formatUsdAsInr } from '../../../lib/utils';

export default function SellerOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Processing' | 'Completed'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [orders, setOrders] = useState([
    { id: 'ORD-9821', customer: 'Alex Johnson', email: 'alex@example.com', item: 'Halo Smart Desk Lamp', amount: formatUsdAsInr(129), status: 'Completed', date: 'Sept 11, 2026' },
    { id: 'ORD-9820', customer: 'Sophia Chen', email: 'sophia@example.com', item: 'Ergonomic Mesh Chair', amount: formatUsdAsInr(299), status: 'Processing', date: 'Sept 11, 2026' },
    { id: 'ORD-9819', customer: 'Marcus Vance', email: 'marcus@example.com', item: 'Wireless Mechanical Keyboard', amount: formatUsdAsInr(159), status: 'Pending', date: 'Sept 10, 2026' },
    { id: 'ORD-9818', customer: 'Elena Rostova', email: 'elena@example.com', item: 'Ultra-clear 4K Monitor Arm', amount: formatUsdAsInr(89), status: 'Completed', date: 'Sept 09, 2026' },
    { id: 'ORD-9817', customer: 'David Kim', email: 'david@example.com', item: 'Ambient LED Strip Light', amount: formatUsdAsInr(49), status: 'Processing', date: 'Sept 08, 2026' },
  ]);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = activeFilter === 'All' || o.status === activeFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* TOP BAR */}
        <div>
          <Link
            href="/seller"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            Seller Orders
          </h1>
          <p className="text-sm text-slate-500">
            Track customer purchases, update order fulfillment statuses, and manage deliveries.
          </p>
        </div>

        {/* CONTROLS & FILTERS */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Pending', 'Processing', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order ID or buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-400 dark:border-slate-800 dark:bg-slate-800/40">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Purchased Item</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Fulfillment Status</th>
                  <th className="py-4 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                      <td className="py-4 px-6 font-mono font-semibold text-slate-900 dark:text-white">{ord.id}</td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{ord.customer}</p>
                          <p className="text-xs text-slate-400">{ord.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{ord.item}</td>
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{ord.amount}</td>
                      <td className="py-4 px-4 text-xs text-slate-500">{ord.date}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ord.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : ord.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        }`}>
                          {ord.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                          {ord.status === 'Processing' && <Truck className="h-3 w-3" />}
                          {ord.status === 'Pending' && <Clock className="h-3 w-3" />}
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
