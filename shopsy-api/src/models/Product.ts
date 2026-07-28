import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand?: string;
  stock: number;
  sku?: string;
  status: 'draft' | 'active' | 'archived';
  seller?: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true, trim: true },
  brand: { type: String, trim: true },
  stock: { type: Number, required: true, default: 10 },
  sku: { type: String, trim: true },
  status: { type: String, enum: ['draft', 'active', 'archived'], default: 'active' },
  seller: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ category: 1, status: 1, price: 1 });
productSchema.index({ brand: 1, status: 1 });
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IProduct>('Product', productSchema);
