import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchHistory extends Document {
  user?: string;
  query: string;
  count: number;
  type: 'search' | 'view';
  updatedAt: Date;
  createdAt: Date;
}

const searchHistorySchema = new Schema<ISearchHistory>({
  user: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User' },
  query: { type: String, required: true, trim: true },
  count: { type: Number, default: 1 },
  type: { type: String, enum: ['search', 'view'], default: 'search' },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

searchHistorySchema.index({ query: 1 });
searchHistorySchema.index({ user: 1, updatedAt: -1 });

export default mongoose.model<ISearchHistory>('SearchHistory', searchHistorySchema);
