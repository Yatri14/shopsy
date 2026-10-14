'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ShoppingBag,
  PackageCheck,
  Truck,
  CheckCircle,
} from 'lucide-react';
import { formatUsdAsInr } from '../../lib/utils';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  gst: number;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders =
      localStorage.getItem('shopsy-orders');

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-slate-500">
          View your orders and track their status.
        </p>

        {/* NO ORDERS */}
        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <ShoppingBag className="mx-auto h-16 w-16 text-slate-400" />

            <h2 className="mt-5 text-2xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-slate-500">
              Your completed orders will appear here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-slate-950 px-6 py-3 font-semibold text-white dark:bg-blue-500 dark:text-slate-950"
            >
              Start Shopping
            </Link>

          </div>
        ) : (

          /* ORDERS */
          <div className="mt-8 space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Order ID
                    </p>

                    <h2 className="font-bold">
                      {order.id}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    {order.status}
                  </div>

                </div>

                {/* PRODUCTS */}
                <div className="mt-6 space-y-4">

                  {order.items.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {formatUsdAsInr(item.price)}
                          {(item.quantity ?? 1) > 1 ? ` × ${item.quantity}` : ''}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* ORDER DETAILS */}
                <div className="mt-6 grid gap-4 border-t pt-6 md:grid-cols-3">

                  <div>
                    <p className="text-sm text-slate-500">
                      Delivery
                    </p>

                    <p className="font-semibold">
                      {order.deliveryMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Payment
                    </p>

                    <p className="font-semibold">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Total
                    </p>

                    <p className="text-xl font-bold">
                      {formatUsdAsInr(order.total)}
                    </p>
                  </div>

                </div>

                {/* TRACKING */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <PackageCheck className="h-5 w-5" />
                      <span className="text-sm font-semibold">
                        Order Confirmed
                      </span>
                    </div>

                    <Truck className="h-5 w-5 text-blue-500" />

                  </div>

                  <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-700">

                    <div className="h-2 w-1/3 rounded-full bg-blue-500" />

                  </div>

                  <div className="mt-3 flex justify-between text-xs text-slate-500">
                    <span>Confirmed</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>

                </div>

              </div>

            ))}

            {/* CONTINUE SHOPPING */}

            <div className="text-center">

              <Link
                href="/products"
                className="inline-block rounded-full bg-slate-950 px-6 py-3 font-semibold text-white dark:bg-blue-500 dark:text-slate-950"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}