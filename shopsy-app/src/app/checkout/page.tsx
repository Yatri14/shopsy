'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  PackageCheck,
} from 'lucide-react';
import { formatUsdAsInr } from '../../lib/utils';

interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: 'payment.failed', callback: (event: { error?: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface CartProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  stock: boolean;
  image: string;
  quantity?: number;
}

interface Order {
  id: string;
  items: CartProduct[];
  subtotal: number;
  shipping: number;
  gst: number;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  status: string;
  createdAt: string;
}

const deliveryOptions = [
  {
    name: 'Express',
    time: '1-2 days',
    price: 15,
  },
  {
    name: 'Standard',
    time: '3-5 days',
    price: 8,
  },
  {
    name: 'Free',
    time: '5-7 days',
    price: 0,
  },
];

const paymentMethods = [
  'Cards and UPI apps',
  'Cash on Delivery',
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function paymentRequest<T>(path: string, token: string, payload: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/payments/${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Unable to connect to the payment service. Make sure the Shopsy API is running.');
  }

  let data: T & { message?: string };
  try {
    data = await response.json();
  } catch {
    throw new Error('The payment service returned an invalid response. Please try again.');
  }
  if (!response.ok) throw new Error(data.message || 'Payment request failed.');
  return data;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedDelivery, setSelectedDelivery] =
    useState('Express');
  const [selectedPayment, setSelectedPayment] =
    useState('Cards and UPI apps');
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [confirmedPayment, setConfirmedPayment] = useState('');
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    const savedCart =
      localStorage.getItem('shopsy-cart');

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    const savedUser = localStorage.getItem('shopsy-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as { name?: string; email?: string };
        setCustomer((current) => ({
          ...current,
          fullName: user.name || current.fullName,
          email: user.email || current.email,
        }));
      } catch (error) {
        console.error('Failed to restore checkout account details:', error);
      }
    }
  }, []);

  /*
   * Calculate total from actual cart
   */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const shipping =
    selectedDelivery === 'Express'
      ? 15
      : selectedDelivery === 'Standard'
        ? 8
        : 0;

  const gst = subtotal * 0.18;

  const total = subtotal + shipping + gst;

  /*
   * PLACE ORDER
   */
  const finishOrder = (createdOrderId: string, paymentMethod: string, status: string) => {
    const newOrder: Order = {
      id: createdOrderId,
      items: cart,
      subtotal,
      shipping,
      gst,
      total,
      paymentMethod,
      deliveryMethod: selectedDelivery,
      status,
      createdAt: new Date().toISOString(),
    };

    let orders: Order[] = [];
    const existingOrders = localStorage.getItem('shopsy-orders');
    if (existingOrders) {
      try {
        const savedOrders: unknown = JSON.parse(existingOrders);
        if (Array.isArray(savedOrders)) orders = savedOrders as Order[];
      } catch (error) {
        console.error('Failed to restore local order history:', error);
      }
    }
    orders.unshift(newOrder);
    localStorage.setItem('shopsy-orders', JSON.stringify(orders));
    localStorage.removeItem('shopsy-cart');
    window.dispatchEvent(new Event('cartUpdated'));
    setCart([]);
    setOrderId(createdOrderId);
    setConfirmedPayment(paymentMethod);
    setConfirmed(true);
    setPaymentError('');
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setPaymentError('Your cart is empty. Please add products first.');
      return;
    }

    const token = localStorage.getItem('shopsy-token');
    if (!token) {
      setPaymentError('Please log in before placing an order.');
      return;
    }
    if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim() ||
      !customer.address.trim() || !customer.city.trim() || !customer.pincode.trim()) {
      setPaymentError('Complete all delivery details before placing your order.');
      return;
    }

    setProcessing(true);
    setPaymentError('');
    const payload = {
      items: cart.map((item) => ({ productId: item.id, quantity: item.quantity ?? 1 })),
      deliveryMethod: selectedDelivery,
      customer,
    };

    try {
      if (selectedPayment === 'Cash on Delivery') {
        const result = await paymentRequest<{ success: boolean; orderId: string }>(
          'cash-on-delivery',
          token,
          payload,
        );
        finishOrder(result.orderId, 'Cash on Delivery', 'Pending');
        return;
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay Checkout is still loading. Please try again in a moment.');
      }
      const checkout = await paymentRequest<{
        keyId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
        orderId: string;
      }>('razorpay/orders', token, payload);

      let checkoutUser: { name?: string; email?: string } = {};
      try {
        checkoutUser = JSON.parse(localStorage.getItem('shopsy-user') || '{}') as { name?: string; email?: string };
      } catch (error) {
        console.error('Failed to restore account details for payment:', error);
      }
      const razorpay = new window.Razorpay({
        key: checkout.keyId,
        amount: checkout.amount,
        currency: checkout.currency,
        name: 'Shopsy',
        description: 'Secure checkout',
        order_id: checkout.razorpayOrderId,
        prefill: {
          name: customer.fullName || checkoutUser.name || '',
          email: customer.email || checkoutUser.email || '',
          contact: customer.phone,
        },
        theme: { color: '#2563eb' },
        handler: async (response) => {
          try {
            await paymentRequest<{ success: boolean }>('razorpay/verify', token, response);
            finishOrder(checkout.orderId, 'Razorpay', 'Paid');
          } catch (error) {
            setPaymentError(error instanceof Error ? error.message : 'Payment verification failed.');
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      });
      razorpay.on('payment.failed', (event) => {
        setPaymentError(event.error?.description || 'Payment failed. Please try another payment method.');
        setProcessing(false);
      });
      razorpay.open();
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Could not place your order.');
      setProcessing(false);
    }
  };

  /*
   * EMPTY CART
   */
  if (cart.length === 0 && !confirmed) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <PackageCheck className="mx-auto h-16 w-16 text-slate-400" />

            <h1 className="mt-6 text-3xl font-bold">
              Your cart is empty
            </h1>

            <p className="mt-3 text-slate-500">
              Add some products before going to checkout.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white dark:bg-blue-500 dark:text-slate-950"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your order
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* LEFT */}
          <section className="space-y-6">

            {/* BILLING */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Billing address
                </h2>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                  Required
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Full name"
                  autoComplete="name"
                  required
                  value={customer.fullName}
                  onChange={(event) => setCustomer({ ...customer, fullName: event.target.value })}
                />

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  required
                  value={customer.email}
                  onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                />

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={customer.phone}
                  onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                />

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Address"
                  autoComplete="street-address"
                  required
                  value={customer.address}
                  onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
                />

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                  value={customer.city}
                  onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
                />

                <input
                  className="rounded-2xl border px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="PIN code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  required
                  value={customer.pincode}
                  onChange={(event) => setCustomer({ ...customer, pincode: event.target.value.replace(/\D/g, '') })}
                />

              </div>
            </div>

            {/* DELIVERY */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="text-xl font-semibold">
                Delivery options
              </h2>

              <div className="mt-6 grid gap-3">

                {deliveryOptions.map(
                  (option) => (
                    <button
                      key={option.name}
                      onClick={() =>
                        setSelectedDelivery(
                          option.name
                        )
                      }
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                        selectedDelivery ===
                        option.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">
                          {option.name}
                        </div>

                        <div className="text-sm">
                          {option.time}
                        </div>
                      </div>

                      <div className="font-semibold">
                        {option.price === 0
                          ? 'Free'
                          : formatUsdAsInr(option.price)}
                      </div>
                    </button>
                  )
                )}

              </div>
            </div>

            {/* PAYMENT */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="text-xl font-semibold">
                Payment method
              </h2>

              <div className="mt-6 grid gap-3">

                {paymentMethods.map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() =>
                        setSelectedPayment(
                          method
                        )
                      }
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                        selectedPayment ===
                        method
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">

                        {method === 'Cards and UPI apps' && (
                          <CreditCard className="h-5 w-5" />
                        )}

                        {method === 'Cash on Delivery' && (
                          <PackageCheck className="h-5 w-5" />
                        )}

                        <div>
                          <span className="font-semibold">{method}</span>
                          {method === 'Cards and UPI apps' && (
                            <p className="mt-1 text-xs">Cards and available UPI apps such as Google Pay, PhonePe, Paytm and BHIM</p>
                          )}
                        </div>

                      </div>

                      <span className="text-sm">
                        {method === 'Cash on Delivery' ? 'Pay at delivery' : 'Secure'}
                      </span>

                    </button>
                  )
                )}

              </div>
            </div>

          </section>

          {/* RIGHT */}
          <aside>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              {/* PRODUCTS */}
              <div className="mt-6 space-y-4">

                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        {product.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {formatUsdAsInr(product.price)}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* TOTALS */}
              <div className="mt-6 space-y-3 border-t pt-6">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {formatUsdAsInr(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? 'Free'
                      : formatUsdAsInr(shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>
                    {formatUsdAsInr(gst)}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {formatUsdAsInr(total)}
                  </span>
                </div>

              </div>

              {/* PLACE ORDER */}

              {paymentError && (
                <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {paymentError}
                </p>
              )}

              <button
                onClick={placeOrder}
                disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 font-semibold text-white hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950"
              >
                {processing
                  ? 'Processing...'
                  : selectedPayment === 'Cash on Delivery'
                    ? 'Place order'
                    : 'Pay securely'}
                {!processing && <ArrowRight className="h-4 w-4" />}
              </button>

            </div>

          </aside>

        </div>

        {/* SUCCESS */}

        {confirmed && (
          <div className="mt-8 rounded-[32px] border border-emerald-200 bg-emerald-50 p-8">

            <div className="flex items-center gap-3">

              <BadgeCheck className="h-7 w-7 text-emerald-600" />

              <div>
                <h2 className="text-xl font-semibold text-emerald-800">
                  Order Confirmed!
                </h2>

                <p className="mt-1 text-sm text-emerald-700">
                  {confirmedPayment === 'Cash on Delivery'
                    ? 'Your order is confirmed. Payment is due when it is delivered.'
                    : 'Your payment has been verified and the order is confirmed.'}
                </p>
              </div>

            </div>

            <p className="mt-4 font-semibold text-emerald-800">
              Order ID: {orderId}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                href="/orders"
                className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white"
              >
                View Orders
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-emerald-300 px-6 py-3 font-semibold text-emerald-700"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    </main>
  );
}