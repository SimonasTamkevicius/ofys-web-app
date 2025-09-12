import mongoose, { Schema, Document, model } from "mongoose";

interface Amenity {
  name: string;
  icon?: string;
}

export interface Rental extends Document {
  name: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  order: number;
  category: "Villa" | "Apartment" | "Casita";
  mainImage: string;
  floorPlanImage: string;
  galleryImages: string[];
  amenities: Amenity[];
}

const AmenitySchema = new Schema<Amenity>({
  name: { type: String, required: true },
  icon: { type: String, default: "default-icon.png" },
});

const RentalSchema = new Schema<Rental>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    sleeps: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    pricePerWeek: { type: Number, required: true },
    pricePerMonth: { type: Number, required: true },
    order: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Villa", "Apartment", "Casita"],
      default: "Villa",
    },
    mainImage: { type: String, required: true },
    floorPlanImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    amenities: [AmenitySchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rental || model<Rental>("Rental", RentalSchema);
