'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Gift, Minus, Plus, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';

const initialItems = [
  { id: 1, name: 'Aurora Headphones', price: 149, quantity: 1, saved: false },
  { id: 2, name: 'Luna Backpack', price: 89, quantity: 2, saved: false },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, delta: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const saveForLater = (id: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, saved: !item.saved } : item));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Shopping cart</p>
            <h1 className="mt-2 text-3xl font-semibold">Your premium picks</h1>
          </div>
          <button onClick={() => setDrawerOpen(true)} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
            <span className="flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Quick view</span>
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Add a few products and we’ll keep the experience premium.</p>
                <Link href="/products" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Explore products</Link>
              </div>
            ) : items.map((item) => (
              <motion.div layout key={item.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-slate-900/10">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">${item.price} each</p>
                      {item.saved ? <span className="mt-2 inline-block text-xs font-medium text-emerald-600">Saved for later</span> : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                      <button onClick={() => updateQuantity(item.id, -1)} className="rounded-full p-2 hover:bg-white dark:hover:bg-slate-700"><Minus className="h-4 w-4" /></button>
                      <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="rounded-full p-2 hover:bg-white dark:hover:bg-slate-700"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="font-semibold">${item.price * item.quantity}</div>
                    <button onClick={() => saveForLater(item.id)} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-slate-700 dark:text-slate-300">
                      {item.saved ? 'Unsave' : 'Save for later'}
                    </button>
                    <button onClick={() => removeItem(item.id)} className="rounded-full border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/30"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">Offers</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Coupon code</label>
                  <div className="mt-2 flex gap-2">
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="SAVE10" className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800" />
                    <button className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Apply</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Gift card</label>
                  <div className="mt-2 flex gap-2">
                    <input value={giftCard} onChange={(e) => setGiftCard(e.target.value)} placeholder="GIFT2026" className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800" />
                    <button className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Use</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"><Gift className="h-4 w-4 text-blue-500" /> Gift wrap available</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Estimated delivery: 2–4 business days after checkout.</p>
            </div>

            <Link href="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/50">
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 140, damping: 20 }} className="ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cart preview</h2>
                <button onClick={() => setDrawerOpen(false)} className="rounded-full border border-slate-300 px-3 py-2 text-sm">Close</button>
              </div>
              <div className="mt-6 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm">x{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto rounded-3xl bg-slate-950 p-5 text-white dark:bg-blue-500 dark:text-slate-950">
                <div className="flex items-center justify-between text-sm"><span>Estimated total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
