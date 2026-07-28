'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, BadgeCheck, CreditCard, Landmark, PackageCheck, ShieldCheck, Truck, Wallet } from 'lucide-react';

const deliveryOptions = [
  { name: 'Express', time: '1-2 days', price: '$15' },
  { name: 'Standard', time: '3-5 days', price: '$8' },
  { name: 'Free', time: '5-7 days', price: 'Free' },
];

const paymentMethods = ['Stripe', 'Razorpay', 'Cash on Delivery', 'UPI'];

export default function CheckoutPage() {
  const [selectedDelivery, setSelectedDelivery] = useState('Express');
  const [selectedPayment, setSelectedPayment] = useState('Stripe');
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = 149 + 89 * 2;
  const shipping = selectedDelivery === 'Express' ? 15 : selectedDelivery === 'Standard' ? 8 : 0;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold">Complete your order</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Billing address</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">Required</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="Full name" />
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="Email" />
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="Phone" />
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="Address" />
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="City" />
                <input className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800" placeholder="PIN code" />
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Shipping address</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">Same as billing</span>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                42, Skyline Avenue, New York, NY 10001
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold">Delivery options</h2>
              <div className="mt-6 grid gap-3">
                {deliveryOptions.map((option) => (
                  <button key={option.name} onClick={() => setSelectedDelivery(option.name)} className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left ${selectedDelivery === option.name ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                    <div>
                      <div className="font-semibold">{option.name}</div>
                      <div className="mt-1 text-sm">{option.time}</div>
                    </div>
                    <div className="font-semibold">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold">Payment methods</h2>
              <div className="mt-6 grid gap-3">
                {paymentMethods.map((method) => (
                  <button key={method} onClick={() => setSelectedPayment(method)} className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left ${selectedPayment === method ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      {method === 'Stripe' ? <CreditCard className="h-5 w-5" /> : method === 'Razorpay' ? <Wallet className="h-5 w-5" /> : method === 'Cash on Delivery' ? <Landmark className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                      <span className="font-semibold">{method}</span>
                    </div>
                    <span className="text-sm">Secure</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span>Subtotal</span><span>$238</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{selectedDelivery === 'Express' ? '$15' : selectedDelivery === 'Standard' ? '$8' : 'Free'}</span></div>
                <div className="flex justify-between"><span>GST</span><span>${(subtotal * 0.18).toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Coupon code</label>
                <div className="mt-2 flex gap-2">
                  <input className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="SAVE20" />
                  <button className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:bg-blue-500 dark:text-slate-950">Apply</button>
                </div>
              </div>
              <button onClick={() => setConfirmed(true)} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950">
                Place order <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-lg font-semibold"><PackageCheck className="h-5 w-5 text-blue-500" /> Delivery info</div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Estimated delivery: {selectedDelivery === 'Express' ? '1-2 days' : selectedDelivery === 'Standard' ? '3-5 days' : '5-7 days'}</p>
            </div>
          </aside>
        </div>

        {confirmed ? (
          <div className="mt-8 rounded-[32px] border border-emerald-200 bg-emerald-50 p-8 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/30">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300">Order confirmed</h2>
                <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">Your order has been placed successfully. An invoice has been generated for your records.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">Download invoice</button>
              <Link href="/" className="rounded-full border border-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-700">Continue shopping</Link>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
