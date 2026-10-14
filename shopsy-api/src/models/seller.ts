import mongoose, { Schema, Document } from 'mongoose';

export interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: Date;
  passwordResetOtp?: string;
  passwordResetExpiresAt?: Date;
  refreshToken?: string;
  storeName?: string;
  createdAt: Date;
}

const sellerSchema = new Schema<ISeller>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  otpCode: String,

  otpExpiresAt: Date,

  passwordResetOtp: String,

  passwordResetExpiresAt: Date,

  refreshToken: String,

  storeName: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ISeller>(
  'Seller',
  sellerSchema,
  'sellers'
);