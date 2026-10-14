import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  passwordResetOtp?: string;
  passwordResetExpiresAt?: Date;
  refreshToken?: string;
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>({
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
    default: true,
  },

  passwordResetOtp: String,

  passwordResetExpiresAt: Date,

  refreshToken: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IAdmin>(
  'Admin',
  adminSchema,
  'admins'
);