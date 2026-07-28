'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  CreditCard,
  DollarSign,
  FileText,
  LayoutGrid,
  Package,
  RotateCcw,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  Ticket,
  Users,
  Warehouse,
} from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutGrid },
  { key: 'registration', label: 'Seller Registration', icon: BadgeCheck },
  { key: 'profile', label: 'Store Profile', icon: Store },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'returns', label: 'Returns', icon: RotateCcw },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'revenue', label: 'Revenue', icon: DollarSign },
  { key: 'withdrawals', label: 'Withdrawals', icon: CreditCard },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'coupons', label: 'Coupons', icon: Ticket },
  { key: 'inventory', label: 'Inventory', icon: Warehouse },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const stats = [
  { title: 'Revenue', value: '$84.2K', detail: '+18.4%' },
  { title: 'Orders', value: '1,284', detail: '+12.1%' },
  { title: 'Returns', value: '24', detail: '-6.3%' },
  { title: 'Customers', value: '8.9K', detail: '+9.6%' },
];

const sections: Record<string, { title: string; subtitle: string; primaryAction: string; cards: Array<{ title: string; detail: string; badge?: string }> }> = {
  overview: {
    title: 'Merchant control center',
    subtitle: 'Your store, your customers, and every payout in one premium workspace.',
    primaryAction: 'Review setup',
    cards: [
      { title: 'Seller Registration', detail: 'Complete your identity and onboarding checklist to unlock payouts.', badge: 'Ready' },
      { title: 'Store Profile', detail: 'Refine brand, shipping policy, and storefront storytelling.', badge: 'Live' },
      { title: 'Products', detail: 'Showcase new arrivals, bundles, and high-converting offers.', badge: '12 active' },
      { title: 'Orders', detail: 'Track fulfillment, delivery ETA, and customer communication.', badge: '128' },
      { title: 'Returns', detail: 'Handle refund requests and exchange approvals with confidence.', badge: '24' },
      { title: 'Analytics', detail: 'Monitor conversion, retention, and top-performing SKUs.', badge: 'Updated' },
    ],
  },
  registration: {
    title: 'Seller registration',
    subtitle: 'Verify identity, business details, and account readiness for marketplace access.',
    primaryAction: 'Continue onboarding',
    cards: [
      { title: 'Business info', detail: 'Set your legal name, tax ID, and store type.' },
      { title: 'Verification', detail: 'Upload ID proofs and complete KYC in a few steps.' },
      { title: 'Policy review', detail: 'Accept seller terms, fulfillment rules, and payout terms.' },
    ],
  },
  profile: {
    title: 'Store profile',
    subtitle: 'Create a memorable experience with branding, shipping, and support details.',
    primaryAction: 'Edit profile',
    cards: [
      { title: 'Brand identity', detail: 'Upload logos, imagery, and store tone.' },
      { title: 'Shipping policy', detail: 'Define delivery windows and return windows.' },
      { title: 'Support channels', detail: 'Show contact details and expected response times.' },
    ],
  },
  products: {
    title: 'Products',
    subtitle: 'Manage inventory, pricing, variants, and promotional offers.',
    primaryAction: 'Add product',
    cards: [
      { title: 'Catalog', detail: 'Publish new items with rich descriptions and media.' },
      { title: 'Inventory', detail: 'Track stock levels, restocks, and low-stock alerts.' },
      { title: 'Promotions', detail: 'Run bundles, discounts, and featured campaigns.' },
    ],
  },
  orders: {
    title: 'Orders',
    subtitle: 'Keep fulfillment accurate and customer communication effortless.',
    primaryAction: 'View orders',
    cards: [
      { title: 'Pending orders', detail: 'Confirm requests, pack items, and assign couriers.' },
      { title: 'Fulfillment', detail: 'Monitor shipping labels and delivery milestones.' },
      { title: 'Customer updates', detail: 'Send order updates automatically for better trust.' },
    ],
  },
  returns: {
    title: 'Returns',
    subtitle: 'Resolve refunds and exchanges quickly while protecting margin.',
    primaryAction: 'Review requests',
    cards: [
      { title: 'Refund queue', detail: 'Approve or deny requests based on policy rules.' },
      { title: 'Exchange center', detail: 'Offer replacements and reship options.' },
      { title: 'Resolution trends', detail: 'Spot recurring issues and reduce return rates.' },
    ],
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'See what is converting, what is trending, and where to improve.',
    primaryAction: 'Open reports',
    cards: [
      { title: 'Conversion rate', detail: 'Review product page performance and checkout flow.' },
      { title: 'Best sellers', detail: 'Find repeatable wins for merchandising and inventory.' },
      { title: 'Audience behavior', detail: 'Understand buyer browse patterns and retention signals.' },
    ],
  },
  revenue: {
    title: 'Revenue',
    subtitle: 'Track sales, commission splits, and payout readiness.',
    primaryAction: 'See payouts',
    cards: [
      { title: 'Gross sales', detail: 'Monitor revenue by product, channel, and campaign.' },
      { title: 'Commission', detail: 'Review platform fees and your net earnings.' },
      { title: 'Forecast', detail: 'Plan inventory around upcoming demand spikes.' },
    ],
  },
  withdrawals: {
    title: 'Withdrawals',
    subtitle: 'Manage payout requests, queues, and payment methods.',
    primaryAction: 'Request payout',
    cards: [
      { title: 'Pending withdrawals', detail: 'Approve or process cleared payouts on time.' },
      { title: 'Bank details', detail: 'Keep payment methods accurate and verified.' },
      { title: 'Timeline', detail: 'Track payout processing status and settlement time.' },
    ],
  },
  customers: {
    title: 'Customers',
    subtitle: 'Build loyalty with data-backed engagement and support.',
    primaryAction: 'View customers',
    cards: [
      { title: 'Repeat buyers', detail: 'Reward VIP customers and nurture return visits.' },
      { title: 'Support inbox', detail: 'Manage inquiries and keep service response times fast.' },
      { title: 'Loyalty signals', detail: 'Recognize high-value shoppers with targeted offers.' },
    ],
  },
  coupons: {
    title: 'Coupons',
    subtitle: 'Launch offers that drive revenue without hurting margins.',
    primaryAction: 'Create coupon',
    cards: [
      { title: 'Promo campaigns', detail: 'Create seasonal offers for carts, first-time buyers, and VIPs.' },
      { title: 'Usage limits', detail: 'Set caps, expiry dates, and eligibility rules.' },
      { title: 'Performance', detail: 'Compare redemption rates across every offer.' },
    ],
  },
  inventory: {
    title: 'Inventory',
    subtitle: 'Balance stock availability with demand and replenishment cycles.',
    primaryAction: 'Update stock',
    cards: [
      { title: 'Low stock', detail: 'Replenish fast-moving assortments before demand spikes.' },
      { title: 'Warehouse sync', detail: 'Connect stock movements across storage locations.' },
      { title: 'Restock plan', detail: 'Prioritize products that need attention next week.' },
    ],
  },
  reports: {
    title: 'Reports',
    subtitle: 'Share the performance story with stakeholders and partners.',
    primaryAction: 'Export report',
    cards: [
      { title: 'Sales summary', detail: 'Share weekly revenue and growth snapshots.' },
      { title: 'Performance trends', detail: 'Highlight top categories and strongest campaigns.' },
      { title: 'Operational health', detail: 'Summarize return reasons and shipping reliability.' },
    ],
  },
  settings: {
    title: 'Settings',
    subtitle: 'Tune your seller workspace and keep operations running smoothly.',
    primaryAction: 'Open settings',
    cards: [
      { title: 'Account preferences', detail: 'Adjust notifications, permissions, and team access.' },
      { title: 'Automation', detail: 'Configure rules for order updates and follow-ups.' },
      { title: 'Security', detail: 'Protect your seller workspace with stronger access controls.' },
    ],
  },
};

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const activeSection = sections[activeTab] ?? sections.overview;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Seller dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Run your store with premium clarity</h1>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            View storefront <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-blue-500 dark:text-slate-950">
              <div className="text-sm font-semibold">Shopsy Seller Hub</div>
              <div className="mt-1 text-sm text-slate-300 dark:text-slate-700">Merchant operations center</div>
            </div>

            <div className="mt-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
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

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">{activeSection.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{activeSection.subtitle}</h2>
                </div>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
                  {activeSection.primaryAction}
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activeSection.cards.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      {card.badge ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                          {card.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-700 p-8 text-white shadow-sm">
                <div className="flex items-center gap-2 text-blue-200">
                  <Sparkles className="h-5 w-5" /> Seller growth toolkit
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Everything you need to scale faster</h3>
                <p className="mt-3 max-w-xl text-sm text-slate-300">
                  From onboarding and products to payouts and reporting, this workspace keeps your store organized and premium-looking.
                </p>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Quick progress</p>
                <div className="mt-6 space-y-4">
                  {[
                    ['Registration', '85%'],
                    ['Store profile', '92%'],
                    ['Inventory sync', '76%'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-700 dark:text-slate-300">{label}</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
