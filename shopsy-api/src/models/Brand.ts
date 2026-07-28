import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  slug: string;
  createdAt: Date;
}

const brandSchema = new Schema<IBrand>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBrand>('Brand', brandSchema);
