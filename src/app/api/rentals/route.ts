import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Rental from "@/lib/models/Rental";
import { uploadToS3, deleteFromS3, deleteMultipleFromS3 } from "@/lib/s3";
import { randomUUID } from "crypto";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user ||
    (session.user as { role?: string }).role !== "admin"
  ) {
    return null;
  }
  return session;
}

// ✅ GET - Fetch all rentals
export async function GET() {
  await connectToDatabase();
  const rentals = await Rental.find();
  return NextResponse.json(rentals);
}

// ✅ POST - Create a new rental with images
export async function POST(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const formData = await req.formData();

  // Extract fields
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const bedrooms = parseInt(formData.get("bedrooms") as string);
  const bathrooms = parseInt(formData.get("bathrooms") as string);
  const sleeps = parseInt(formData.get("sleeps") as string);
  const pricePerNight = parseFloat(formData.get("pricePerNight") as string);
  const pricePerWeek = parseFloat(formData.get("pricePerWeek") as string);
  const pricePerMonth = parseFloat(formData.get("pricePerMonth") as string);
  const category = formData.get("category") as
    | "Villa"
    | "Apartment"
    | "Bungalow";
  const amenities = JSON.parse(formData.get("amenities") as string);

  // Validate category uniqueness for Apartment and Bungalow
  if (category === "Apartment" || category === "Bungalow") {
    const existingCategory = await Rental.findOne({ category });
    if (existingCategory) {
      return NextResponse.json(
        { error: `Only one ${category} property is allowed` },
        { status: 400 }
      );
    }
  }

  const amenitiesArr = (amenities as string[]).map((name) => ({
    name,
    icon: "default-icon.png", // or map to your icon logic
  }));

  // Files
  const mainImage = formData.get("mainImage") as File | null;
  const floorplan = formData.get("floorplan") as File | null;
  const gallery = formData.getAll("gallery") as File[];

  // Upload files to S3
  let mainImageUrl = "";
  let floorplanUrl = "";
  const galleryUrls: string[] = [];

  if (mainImage) {
    const buffer = Buffer.from(await mainImage.arrayBuffer());
    const key = `rentals/${randomUUID()}-${mainImage.name}`;
    mainImageUrl = await uploadToS3(buffer, key, mainImage.type);
  }

  if (floorplan) {
    const buffer = Buffer.from(await floorplan.arrayBuffer());
    const key = `rentals/${randomUUID()}-${floorplan.name}`;
    floorplanUrl = await uploadToS3(buffer, key, floorplan.type);
  }

  for (const file of gallery) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `rentals/gallery/${randomUUID()}-${file.name}`;
    const url = await uploadToS3(buffer, key, file.type);
    galleryUrls.push(url);
  }

  const newRental = await Rental.create({
    name,
    description,
    location,
    bedrooms,
    bathrooms,
    sleeps,
    pricePerNight,
    pricePerWeek,
    pricePerMonth,
    category,
    amenities: amenitiesArr,
    mainImage: mainImageUrl,
    floorPlanImage: floorplanUrl,
    galleryImages: galleryUrls,
  });

  return NextResponse.json(newRental);
}

// ✅ PUT - Update rental (with optional new images)
export async function PUT(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const formData = await req.formData();

  const id = formData.get("id") as string;

  const amenities = JSON.parse(formData.get("amenities") as string);

  const updateData: Record<string, unknown> = {
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location") as string,
    bedrooms: parseInt(formData.get("bedrooms") as string),
    bathrooms: parseInt(formData.get("bathrooms") as string),
    sleeps: parseInt(formData.get("sleeps") as string),
    pricePerNight: parseFloat(formData.get("pricePerNight") as string),
    pricePerWeek: parseFloat(formData.get("pricePerWeek") as string),
    pricePerMonth: parseFloat(formData.get("pricePerMonth") as string),
    category: formData.get("category") as "Villa" | "Apartment" | "Bungalow",
    amenities: (amenities as string[]).map((name) => ({
      name,
      icon: "default-icon.png", // or map to your icon logic
    })),
  };

  // Validate category uniqueness for Apartment and Bungalow (only if category is being changed)
  if (
    updateData.category === "Apartment" ||
    updateData.category === "Bungalow"
  ) {
    const existingCategory = await Rental.findOne({
      category: updateData.category,
      _id: { $ne: id }, // Exclude current rental from check
    });
    if (existingCategory) {
      return NextResponse.json(
        { error: `Only one ${updateData.category} property is allowed` },
        { status: 400 }
      );
    }
  }

  // Get existing rental to preserve current images
  const existingRental = await Rental.findById(id);
  if (!existingRental) {
    return NextResponse.json({ error: "Rental not found" }, { status: 404 });
  }

  // Optional files
  const mainImage = formData.get("mainImage") as File | null;
  const floorplan = formData.get("floorplan") as File | null;

  // Handle gallery - get existing URLs and new files separately
  const existingGalleryUrls = JSON.parse(
    (formData.get("existingGalleryUrls") as string) || "[]"
  );
  const newGalleryFiles = formData.getAll("gallery") as File[];

  if (mainImage) {
    const buffer = Buffer.from(await mainImage.arrayBuffer());
    const key = `rentals/${randomUUID()}-${mainImage.name}`;
    updateData.mainImage = await uploadToS3(buffer, key, mainImage.type);
    // Delete old main image from S3 if it exists
    if (existingRental.mainImage) {
      await deleteFromS3(existingRental.mainImage);
    }
  } else {
    // Preserve existing main image
    updateData.mainImage = existingRental.mainImage;
  }

  if (floorplan) {
    const buffer = Buffer.from(await floorplan.arrayBuffer());
    const key = `rentals/${randomUUID()}-${floorplan.name}`;
    updateData.floorPlanImage = await uploadToS3(buffer, key, floorplan.type);
    // Delete old floorplan image from S3 if it exists
    if (existingRental.floorPlanImage) {
      await deleteFromS3(existingRental.floorPlanImage);
    }
  } else {
    // Preserve existing floorplan image
    updateData.floorPlanImage = existingRental.floorPlanImage;
  }

  // Process gallery - combine existing URLs with new uploaded files
  const finalGalleryUrls: string[] = [];

  // Start with existing URLs that should be preserved
  finalGalleryUrls.push(...existingGalleryUrls);

  // Upload new gallery files
  if (newGalleryFiles.length > 0) {
    for (const file of newGalleryFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = `rentals/gallery/${randomUUID()}-${file.name}`;
      const url = await uploadToS3(buffer, key, file.type);
      finalGalleryUrls.push(url);
    }
  }

  updateData.galleryImages = finalGalleryUrls;

  // Delete removed images from S3
  const imagesToDelete = existingRental.galleryImages.filter(
    (existingUrl: string) => !finalGalleryUrls.includes(existingUrl)
  );
  if (imagesToDelete.length > 0) {
    await deleteMultipleFromS3(imagesToDelete);
  }

  const updatedRental = await Rental.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return NextResponse.json(updatedRental);
}

// ✅ DELETE - Remove rental and associated images
export async function DELETE(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await req.json();

  try {
    // First, fetch the rental to get all image URLs
    const rental = await Rental.findById(id);

    if (!rental) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    // Collect all image URLs to delete
    const imagesToDelete: string[] = [];

    if (rental.mainImage) {
      imagesToDelete.push(rental.mainImage);
    }

    if (rental.floorPlanImage) {
      imagesToDelete.push(rental.floorPlanImage);
    }

    if (rental.galleryImages && rental.galleryImages.length > 0) {
      imagesToDelete.push(...rental.galleryImages);
    }

    // Delete all images from S3
    if (imagesToDelete.length > 0) {
      await deleteMultipleFromS3(imagesToDelete);
    }

    // Delete the rental from database
    await Rental.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Rental and associated images deleted",
    });
  } catch (error) {
    console.error("Error deleting rental:", error);
    return NextResponse.json(
      { error: "Failed to delete rental" },
      { status: 500 }
    );
  }
}
