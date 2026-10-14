import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: string;
  items: Array<{
    product?: string;
    productId?: number;
    name?: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  currency: string;
  deliveryMethod: string;
  shippingAddress?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Product', required: false },
    productId: { type: Number },
    name: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  currency: { type: String, default: 'INR' },
  deliveryMethod: { type: String, default: 'Standard' },
  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IOrder>('Order', orderSchema);
