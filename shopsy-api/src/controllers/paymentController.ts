import crypto from 'node:crypto';
import { Request } from 'express';
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const USD_TO_INR_RATE = 95.28;
const GST_RATE = 0.18;
const productCatalog: Record<number, { name: string; priceUsd: number }> = {
  1: { name: 'Aurora Headphones', priceUsd: 149 },
  2: { name: 'Luna Backpack', priceUsd: 89 },
  3: { name: 'Nova Smart Watch', priceUsd: 219 },
  4: { name: 'Halo Lamp', priceUsd: 129 },
  5: { name: 'Orbit Speaker', priceUsd: 99 },
  6: { name: 'Atlas Tote', priceUsd: 74 },
};
const deliveryPricesUsd: Record<string, number> = {
  Express: 15,
  Standard: 8,
  Free: 0,
};

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret || keyId.includes('your_key') || keySecret.includes('your_secret')) {
    throw new AppError('Online payments are not configured. Add your Razorpay test keys to the API environment.', 503);
  }
  return { keyId, keySecret };
}

function getCheckoutDetails(body: unknown) {
  if (!body || typeof body !== 'object') {
    throw new AppError('Invalid checkout request', 400);
  }

  const { items, deliveryMethod, customer } = body as {
    items?: unknown;
    deliveryMethod?: unknown;
    customer?: unknown;
  };
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    throw new AppError('Your cart is empty or contains too many items', 400);
  }
  if (typeof deliveryMethod !== 'string' || !(deliveryMethod in deliveryPricesUsd)) {
    throw new AppError('Choose a valid delivery option', 400);
  }
  if (!customer || typeof customer !== 'object') {
    throw new AppError('Enter your delivery details', 400);
  }
  const address = customer as Record<string, unknown>;
  const shippingAddress = {
    fullName: typeof address.fullName === 'string' ? address.fullName.trim() : '',
    email: typeof address.email === 'string' ? address.email.trim() : '',
    phone: typeof address.phone === 'string' ? address.phone.trim() : '',
    address: typeof address.address === 'string' ? address.address.trim() : '',
    city: typeof address.city === 'string' ? address.city.trim() : '',
    pincode: typeof address.pincode === 'string' ? address.pincode.trim() : '',
  };
  if (
    Object.values(shippingAddress).some((value) => !value || value.length > 200) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email) ||
    !/^[0-9+\-\s()]{7,20}$/.test(shippingAddress.phone) ||
    !/^[0-9]{6}$/.test(shippingAddress.pincode)
  ) {
    throw new AppError('Enter a valid name, email, phone number and 6-digit PIN code', 400);
  }

  const orderItems = items.map((item: unknown) => {
    if (!item || typeof item !== 'object') throw new AppError('Invalid cart item', 400);
    const { productId, quantity } = item as { productId?: unknown; quantity?: unknown };
    if (!Number.isSafeInteger(productId) || !Number.isSafeInteger(quantity) || Number(quantity) < 1 || Number(quantity) > 20) {
      throw new AppError('Invalid product or quantity in your cart', 400);
    }
    const catalogProduct = productCatalog[Number(productId)];
    if (!catalogProduct) throw new AppError('A product in your cart is no longer available', 400);

    return {
      productId: Number(productId),
      name: catalogProduct.name,
      quantity: Number(quantity),
      price: Math.round(catalogProduct.priceUsd * USD_TO_INR_RATE),
      lineTotal: catalogProduct.priceUsd * Number(quantity),
    };
  });

  const subtotalUsd = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingUsd = deliveryPricesUsd[deliveryMethod];
  const totalInr = Math.round((subtotalUsd + shippingUsd + subtotalUsd * GST_RATE) * USD_TO_INR_RATE);
  return {
    items: orderItems.map(({ productId, name, quantity, price }) => ({ productId, name, quantity, price })),
    totalInr,
    deliveryMethod,
    shippingAddress,
  };
}

function getUserId(req: Request) {
  return (req as any).user?._id;
}

export const getPayments = asyncHandler(async (_req, res) => {
  const payments = await Payment.find();
  res.json({ success: true, payments });
});

export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { keyId, keySecret } = getRazorpayCredentials();
  const checkout = getCheckoutDetails(req.body);
  const userId = getUserId(req);
  if (!userId) throw new AppError('Not authenticated', 401);

  const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: checkout.totalInr * 100,
      currency: 'INR',
      receipt: `shopsy_${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`,
      notes: { userId: String(userId) },
    }),
  });
  const providerOrder = await razorpayResponse.json() as { id?: string; error?: { description?: string } };
  if (!razorpayResponse.ok || !providerOrder.id) {
    throw new AppError(providerOrder.error?.description || 'Could not create a Razorpay order. Please try again.', 502);
  }

  const order = await Order.create({
    user: userId,
    items: checkout.items,
    total: checkout.totalInr,
    paymentMethod: 'Razorpay',
    status: 'pending',
    currency: 'INR',
    deliveryMethod: checkout.deliveryMethod,
    shippingAddress: checkout.shippingAddress,
  });
  await Payment.create({
    user: userId,
    order: order._id,
    amount: checkout.totalInr,
    currency: 'INR',
    method: 'Razorpay',
    status: 'pending',
    providerOrderId: providerOrder.id,
  });

  res.status(201).json({
    keyId,
    razorpayOrderId: providerOrder.id,
    amount: checkout.totalInr * 100,
    currency: 'INR',
    orderId: order._id,
  });
});

export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { keyId, keySecret } = getRazorpayCredentials();
  const { razorpay_order_id: providerOrderId, razorpay_payment_id: providerPaymentId, razorpay_signature: signature } = req.body as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  if (!providerOrderId || !providerPaymentId || !signature) {
    throw new AppError('Payment verification details are missing', 400);
  }

  const payment = await Payment.findOne({
    providerOrderId,
    user: (req as any).user?._id,
  });
  if (!payment) throw new AppError('Payment order not found', 404);
  if (payment.status === 'paid') {
    return res.json({ success: true, orderId: payment.order });
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${providerOrderId}|${providerPaymentId}`)
    .digest('hex');
  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    throw new AppError('Payment signature verification failed', 400);
  }

  const providerResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(providerPaymentId)}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
  });
  let providerPayment = await providerResponse.json() as {
    order_id?: string;
    amount?: number;
    currency?: string;
    status?: string;
    method?: string;
    error?: { description?: string };
  };
  if (
    !providerResponse.ok ||
    providerPayment.order_id !== providerOrderId ||
    providerPayment.amount !== payment.amount * 100 ||
    providerPayment.currency !== payment.currency
  ) {
    throw new AppError(providerPayment.error?.description || 'Payment has not been captured successfully', 402);
  }
  if (providerPayment.status === 'authorized') {
    const captureResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(providerPaymentId)}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: payment.amount * 100, currency: payment.currency }),
      },
    );
    providerPayment = await captureResponse.json() as typeof providerPayment;
    if (!captureResponse.ok) {
      throw new AppError(providerPayment.error?.description || 'Could not capture the authorized payment', 402);
    }
  }
  if (providerPayment.status !== 'captured') {
    throw new AppError('Payment has not been captured successfully', 402);
  }

  payment.status = 'paid';
  payment.method = `Razorpay ${providerPayment.method || 'online'}`;
  payment.providerPaymentId = providerPaymentId;
  await payment.save();
  await Order.findByIdAndUpdate(payment.order, {
    paymentMethod: payment.method,
    status: 'paid',
  });

  res.json({ success: true, orderId: payment.order });
});

export const createCashOnDeliveryOrder = asyncHandler(async (req, res) => {
  const checkout = getCheckoutDetails(req.body);
  const userId = getUserId(req);
  if (!userId) throw new AppError('Not authenticated', 401);

  const order = await Order.create({
    user: userId,
    items: checkout.items,
    total: checkout.totalInr,
    paymentMethod: 'Cash on Delivery',
    status: 'pending',
    currency: 'INR',
    deliveryMethod: checkout.deliveryMethod,
    shippingAddress: checkout.shippingAddress,
  });
  await Payment.create({
    user: userId,
    order: order._id,
    amount: checkout.totalInr,
    currency: 'INR',
    method: 'Cash on Delivery',
    status: 'pending',
  });

  res.status(201).json({ success: true, orderId: order._id });
});

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!payment) throw new AppError('Payment not found', 404);
  res.json({ success: true, payment });
});
