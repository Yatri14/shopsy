import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'seller' | 'admin';
  isVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: Date;
  passwordResetOtp?: string;
  passwordResetExpiresAt?: Date;
  refreshToken?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
  isVerified: { type: Boolean, default: false },
  otpCode: { type: String },
  otpExpiresAt: { type: Date },
  passwordResetOtp: { type: String },
  passwordResetExpiresAt: { type: Date },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ role: 1, isVerified: 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model<IUser>('User', userSchema);
