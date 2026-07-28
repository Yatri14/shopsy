import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', reviewSchema);
