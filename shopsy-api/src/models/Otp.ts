import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  purpose: 'email-verification' | 'password-reset' | 'login';
  identifier: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  purpose: { type: String, enum: ['email-verification', 'password-reset', 'login'], required: true },
  identifier: { type: String, required: true, lowercase: true, trim: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

otpSchema.index({ identifier: 1, purpose: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOtp>('Otp', otpSchema);
