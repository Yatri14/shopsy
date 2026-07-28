import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  user: string;
  items: Array<{ product: string; quantity: number }>;
  createdAt: Date;
}

const cartSchema = new Schema<ICart>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Product' }, quantity: { type: Number, default: 1 } }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICart>('Cart', cartSchema);
