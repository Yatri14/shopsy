import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  user: string;
  order: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  providerOrderId?: string;
  providerPaymentId?: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  method: { type: String, required: true },
  status: { type: String, default: 'pending' },
  providerOrderId: { type: String, unique: true, sparse: true },
  providerPaymentId: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
