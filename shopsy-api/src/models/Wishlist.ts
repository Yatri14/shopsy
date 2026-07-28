import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlist extends Document {
  user: string;
  items: Array<{ product: string }>;
  createdAt: Date;
}

const wishlistSchema = new Schema<IWishlist>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Product' } }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);
