import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Listing from "@/lib/models/Listing";
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

// ✅ GET - Fetch all listings (excluding apartments)
export async function GET() {
  await connectToDatabase();
  const listings = await Listing.find({ category: { $ne: "Apartment" } }).sort({
    order: 1,
  });
  return NextResponse.json(listings);
}

// ✅ POST - Create a new listing with images
export async function POST(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const formData = await req.formData();

  console.log("Received form data:", formData);

  // Extract fields
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const bedrooms = parseInt(formData.get("bedrooms") as string);
  const bathrooms = parseInt(formData.get("bathrooms") as string);
  const sleeps = parseInt(formData.get("sleeps") as string);
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as "Villa" | "Apartment" | "Casita";
  const amenities = JSON.parse(formData.get("amenities") as string);

  // Auto-assign order value (highest existing order + 1)
  const existingListings = await Listing.find({
    category: { $ne: "Apartment" },
  });
  const maxOrder = existingListings.reduce(
    (max, listing) => Math.max(max, listing.order || 0),
    0
  );
  const order = maxOrder + 1;

  // Validate category uniqueness for Apartment and Casita
  if (category === "Apartment" || category === "Casita") {
    const existingCategory = await Listing.findOne({ category });
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
    const key = `listings/${randomUUID()}-${mainImage.name}`;
    mainImageUrl = await uploadToS3(buffer, key, mainImage.type);
  }

  if (floorplan) {
    const buffer = Buffer.from(await floorplan.arrayBuffer());
    const key = `listings/${randomUUID()}-${floorplan.name}`;
    floorplanUrl = await uploadToS3(buffer, key, floorplan.type);
  }

  for (const file of gallery) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `listings/gallery/${randomUUID()}-${file.name}`;
    const url = await uploadToS3(buffer, key, file.type);
    galleryUrls.push(url);
  }

  const newListing = await Listing.create({
    name,
    description,
    location,
    bedrooms,
    bathrooms,
    sleeps,
    price,
    order,
    category,
    amenities: amenitiesArr,
    mainImage: mainImageUrl,
    floorPlanImage: floorplanUrl,
    galleryImages: galleryUrls,
  });

  return NextResponse.json(newListing);
}

// ✅ PUT - Update listing (with optional new images)
export async function PUT(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const formData = await req.formData();

  const id = formData.get("id") as string;

  const amenities = JSON.parse(formData.get("amenities") as string);
  const amenitiesArr = (amenities as string[]).map((name) => ({
    name,
    icon: "default-icon.png", // or map to your icon logic
  }));

  const updateData: Record<string, unknown> = {
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location") as string,
    bedrooms: parseInt(formData.get("bedrooms") as string),
    bathrooms: parseInt(formData.get("bathrooms") as string),
    sleeps: parseInt(formData.get("sleeps") as string),
    price: parseFloat(formData.get("price") as string),
    order: parseInt(formData.get("order") as string) || 0,
    category: formData.get("category") as "Villa" | "Apartment" | "Casita",
    amenities: amenitiesArr,
  };

  // Validate category uniqueness for Apartment and Casita (only if category is being changed)
  if (updateData.category === "Apartment" || updateData.category === "Casita") {
    const existingCategory = await Listing.findOne({
      category: updateData.category,
      _id: { $ne: id }, // Exclude current listing from check
    });
    if (existingCategory) {
      return NextResponse.json(
        { error: `Only one ${updateData.category} property is allowed` },
        { status: 400 }
      );
    }
  }

  // Get existing listing to preserve current images
  const existingListing = await Listing.findById(id);
  if (!existingListing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
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
    const key = `listings/${randomUUID()}-${mainImage.name}`;
    updateData.mainImage = await uploadToS3(buffer, key, mainImage.type);
    // Delete old main image from S3 if it exists
    if (existingListing.mainImage) {
      await deleteFromS3(existingListing.mainImage);
    }
  } else {
    // Preserve existing main image
    updateData.mainImage = existingListing.mainImage;
  }

  if (floorplan) {
    const buffer = Buffer.from(await floorplan.arrayBuffer());
    const key = `listings/${randomUUID()}-${floorplan.name}`;
    updateData.floorPlanImage = await uploadToS3(buffer, key, floorplan.type);
    // Delete old floorplan image from S3 if it exists
    if (existingListing.floorPlanImage) {
      await deleteFromS3(existingListing.floorPlanImage);
    }
  } else {
    // Preserve existing floorplan image
    updateData.floorPlanImage = existingListing.floorPlanImage;
  }

  // Process gallery - combine existing URLs with new uploaded files
  const finalGalleryUrls: string[] = [];

  // Start with existing URLs that should be preserved
  finalGalleryUrls.push(...existingGalleryUrls);

  // Upload new gallery files
  if (newGalleryFiles.length > 0) {
    for (const file of newGalleryFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = `listings/gallery/${randomUUID()}-${file.name}`;
      const url = await uploadToS3(buffer, key, file.type);
      finalGalleryUrls.push(url);
    }
  }

  updateData.galleryImages = finalGalleryUrls;

  // Delete removed images from S3
  const imagesToDelete = existingListing.galleryImages.filter(
    (existingUrl: string) => !finalGalleryUrls.includes(existingUrl)
  );
  if (imagesToDelete.length > 0) {
    await deleteMultipleFromS3(imagesToDelete);
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return NextResponse.json(updatedListing);
}

// ✅ PATCH - Update order of multiple listings
export async function PATCH(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  try {
    const { updates } = await req.json();

    // Update multiple listings with new order values
    const updatePromises = updates.map(
      (update: { id: string; order: number }) =>
        Listing.findByIdAndUpdate(update.id, { order: update.order })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating listing orders:", error);
    return NextResponse.json(
      { error: "Failed to update listing orders" },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Remove listing and associated images
export async function DELETE(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await req.json();

  try {
    // First, fetch the listing to get all image URLs
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Collect all image URLs to delete
    const imagesToDelete: string[] = [];

    if (listing.mainImage) {
      imagesToDelete.push(listing.mainImage);
    }

    if (listing.floorPlanImage) {
      imagesToDelete.push(listing.floorPlanImage);
    }

    if (listing.galleryImages && listing.galleryImages.length > 0) {
      imagesToDelete.push(...listing.galleryImages);
    }

    // Delete all images from S3
    if (imagesToDelete.length > 0) {
      await deleteMultipleFromS3(imagesToDelete);
    }

    // Delete the listing from database
    await Listing.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Listing and associated images deleted",
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
