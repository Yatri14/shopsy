import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  user: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: Date;
}

const addressSchema = new Schema<IAddress>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  line1: { type: String, required: true, trim: true },
  line2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

addressSchema.index({ user: 1, isDefault: 1 });

export default mongoose.model<IAddress>('Address', addressSchema);
