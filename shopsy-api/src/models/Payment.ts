import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  user: string;
  order: string;
  amount: number;
  method: string;
  status: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
