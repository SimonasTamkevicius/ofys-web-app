import mongoose, { Schema, Document, model } from "mongoose";

interface Amenity {
  name: string;
  icon?: string;
}

export interface Listing extends Document {
  name: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  amenities: Amenity[];
  price: number;
  order: number;
  category: "Villa" | "Apartment" | "Casita";
  mainImage: string;
  floorPlanImage: string;
  galleryImages: string[];
}

const AmenitySchema = new Schema<Amenity>({
  name: { type: String, required: true },
  icon: { type: String, default: "default-icon.png" },
});

const ListingSchema = new Schema<Listing>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true, default: "Costa Rica" },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    sleeps: { type: Number, required: true },
    amenities: [AmenitySchema],
    price: { type: Number, required: true },
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
  },
  {
    strict: true,
    timestamps: true,
  }
);

console.log("ListingSchema fields:", Object.keys(ListingSchema.paths));
console.log("Location field definition:", ListingSchema.paths.location);
console.log("Schema options:", ListingSchema.options);

export default mongoose.models.Listing ||
  model<Listing>("Listing", ListingSchema);
