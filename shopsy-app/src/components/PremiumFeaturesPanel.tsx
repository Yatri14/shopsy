'use client';

import { useState } from 'react';
import { Bot, Gift, MessageCircle, Sparkles, Star, Users, Wallet2 } from 'lucide-react';

const features = [
  { title: 'Live chat', subtitle: 'Instant support from concierge agents', icon: MessageCircle },
  { title: 'AI assistant', subtitle: 'Smart recommendations and product guidance', icon: Bot },
  { title: 'Wishlist sharing', subtitle: 'Send curated lists to friends and family', icon: Users },
  { title: 'Reward points', subtitle: 'Earn points on every purchase and referral', icon: Star },
  { title: 'Gift cards', subtitle: 'Send premium gifting experiences instantly', icon: Gift },
  { title: 'Store credit', subtitle: 'Redeem credit across future orders', icon: Wallet2 },
];

export default function PremiumFeaturesPanel() {
  const [active, setActive] = useState('Live chat');

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
        <Sparkles className="h-4 w-4" /> Premium features
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.title}
                onClick={() => setActive(feature.title)}
                className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${active === feature.title ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                <Icon className="mt-0.5 h-4 w-4" />
                <span>
                  <span className="block font-semibold">{feature.title}</span>
                  <span className="mt-1 block text-sm opacity-80">{feature.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
          <h3 className="text-xl font-semibold">{active}</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {active === 'Live chat' && 'Connect with a concierge in seconds for product advice, order updates, and premium support.'}
            {active === 'AI assistant' && 'Get tailored recommendations, compare alternatives, and discover best-fit products instantly.'}
            {active === 'Wishlist sharing' && 'Send beautifully curated lists to friends, family, or collaborators with one tap.'}
            {active === 'Reward points' && 'Earn and redeem points across purchases, referrals, and subscriptions.'}
            {active === 'Gift cards' && 'Send flexible digital gift cards for birthdays, anniversaries, and special occasions.'}
            {active === 'Store credit' && 'Apply store credit to future orders and maintain a seamless loyalty loop.'}
          </p>
          <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200 dark:bg-slate-900">
            Ready for rollout with live APIs, notification hooks, and CRM integrations.
          </div>
        </div>
      </div>
    </section>
  );
}
