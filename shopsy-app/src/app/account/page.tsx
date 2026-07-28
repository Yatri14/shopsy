'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, CreditCard, Heart, MapPin, MessageSquareText, Package, RefreshCcw, Settings, ShieldCheck, Sparkles, Star, Ticket, Wallet2 } from 'lucide-react';
import PremiumFeaturesPanel from '../../components/PremiumFeaturesPanel';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Sparkles },
  { key: 'profile', label: 'Profile', icon: ShieldCheck },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'wallet', label: 'Wallet', icon: Wallet2 },
  { key: 'coupons', label: 'Coupons', icon: CreditCard },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'support', label: 'Support', icon: Ticket },
  { key: 'reviews', label: 'Reviews', icon: Star },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const cards = [
  { title: 'Orders', value: '3 active', accent: 'from-blue-500/20 to-slate-900/10' },
  { title: 'Wishlist', value: '12 saved', accent: 'from-slate-900/20 to-blue-500/10' },
  { title: 'Wallet', value: '$248', accent: 'from-emerald-500/20 to-slate-900/10' },
  { title: 'Support', value: '2 tickets', accent: 'from-amber-500/20 to-slate-900/10' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Customer dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Welcome back, Alex</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Premium member • Verified account
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-blue-500 dark:text-slate-950">
              <div className="text-sm font-semibold">Alex Morgan</div>
              <div className="mt-1 text-sm text-slate-300 dark:text-slate-700">alex@shopsy.com</div>
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
              {cards.map((card) => (
                <div key={card.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className={`h-12 rounded-2xl bg-gradient-to-br ${card.accent}`} />
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                  <p className="mt-2 text-xl font-semibold">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <PremiumFeaturesPanel />
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">{activeTab === 'dashboard' ? 'Dashboard overview' : activeTab}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{activeTab === 'dashboard' ? 'Your account at a glance' : `Manage your ${activeTab}`}</h2>
                </div>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300">Edit</button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {activeTab === 'dashboard' ? (
                  <>
                    <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-lg font-semibold"><Package className="h-5 w-5 text-blue-500" /> Recent orders</div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Aurora Headphones — Delivered yesterday</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-lg font-semibold"><Heart className="h-5 w-5 text-blue-500" /> Saved items</div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">12 items saved for later</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-lg font-semibold"><Wallet2 className="h-5 w-5 text-blue-500" /> Wallet balance</div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">$248 available for future purchases</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-lg font-semibold"><Bell className="h-5 w-5 text-blue-500" /> Notifications</div>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">2 updates from Shopsy</p>
                    </div>
                  </>
                ) : activeTab === 'orders' ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Order #SHP-1042</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Aurora Headphones • Delivered</p>
                      </div>
                      <button className="rounded-full bg-slate-950 px-3 py-2 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Track</button>
                    </div>
                  </div>
                ) : activeTab === 'wishlist' ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Your wishlist includes premium gear, travel accessories, and home essentials.</p>
                  </div>
                ) : activeTab === 'wallet' ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Balance: $248 • Reward points: 1,250</p>
                  </div>
                ) : activeTab === 'support' ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Open support ticket for delivery questions or product issues.</p>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Your account settings and preferences are managed here.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
