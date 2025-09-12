import mongoose, { Schema, Document, model } from "mongoose";

export interface Review extends Document {
  author: string;
  role: string;
  content: string;
  rating: number;
  featured: boolean;
}

const ReviewSchema = new Schema<Review>(
  {
    author: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || model<Review>("Review", ReviewSchema);
