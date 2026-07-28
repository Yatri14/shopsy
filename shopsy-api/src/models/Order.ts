import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: string;
  items: Array<{ product: string; quantity: number; price: number }>;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  currency: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Product' }, quantity: Number, price: Number }],
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'paid' },
  currency: { type: String, default: 'USD' },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IOrder>('Order', orderSchema);
