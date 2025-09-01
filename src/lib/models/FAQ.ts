import mongoose, { Schema, Document, model } from "mongoose";

export interface FAQ extends Document {
  question: string;
  answer: string;
  category: string;
}

const FAQSchema = new Schema<FAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FAQ || model<FAQ>("FAQ", FAQSchema);
