'use client';

import { useState } from 'react';
import { BarChart3, Box, Briefcase, CreditCard, FolderTree, Gift, LayoutGrid, Megaphone, MessageSquare, Package, Settings, ShieldCheck, ShoppingCart, Sparkles, Tag, Users, Warehouse } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'categories', label: 'Categories', icon: FolderTree },
  { key: 'brands', label: 'Brands', icon: Briefcase },
  { key: 'coupons', label: 'Coupons', icon: Gift },
  { key: 'inventory', label: 'Inventory', icon: Warehouse },
  { key: 'reviews', label: 'Reviews', icon: MessageSquare },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'users', label: 'Users', icon: ShieldCheck },
  { key: 'settings', label: 'Website Settings', icon: Settings },
  { key: 'cms', label: 'CMS', icon: Box },
  { key: 'notifications', label: 'Notification Center', icon: Megaphone },
];

const stats = [
  { title: 'Revenue', value: '$184K', detail: '+18.2%' },
  { title: 'Orders', value: '2,841', detail: '+12.4%' },
  { title: 'Customers', value: '14.9K', detail: '+8.9%' },
  { title: 'Conversion', value: '4.8%', detail: '+1.1%' },
];

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold">Operations control center</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">Live inventory • 24/7 monitoring</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-blue-500 dark:text-slate-950">
              <div className="text-sm font-semibold">Shopsy Admin</div>
              <div className="mt-1 text-sm text-slate-300 dark:text-slate-700">Operations overview</div>
            </div>
            <div className="mt-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.key} onClick={() => setActiveTab(item.key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeTab === item.key ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                    <Icon className="h-4 w-4" /> {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-sm text-emerald-600">{stat.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Analytics</p>
                    <h2 className="mt-2 text-2xl font-semibold">Sales trend</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">This month</div>
                </div>
                <div className="mt-8 grid h-48 grid-cols-6 gap-3">
                  {[48, 76, 62, 88, 95, 112].map((value, index) => (
                    <div key={index} className="flex items-end">
                      <div className="w-full rounded-t-2xl bg-gradient-to-t from-blue-500 to-sky-300" style={{ height: `${value}px` }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Quick actions</p>
                    <h2 className="mt-2 text-2xl font-semibold">Daily ops</h2>
                  </div>
                </div>
                <div className="mt-8 space-y-3">
                  {['Review pending orders', 'Approve new products', 'Send coupon campaign', 'Resolve support tickets'].map((action) => (
                    <div key={action} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{action}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">{activeTab}</p>
                  <h2 className="mt-2 text-2xl font-semibold">Management module</h2>
                </div>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Create</button>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {['Orders', 'Products', 'Customers', 'Coupons', 'Inventory', 'Reviews'].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="h-4 w-4 text-blue-500" /> {item}</div>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Manage and monitor this area from a single, elegant workspace.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
