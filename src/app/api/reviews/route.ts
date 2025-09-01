import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/lib/models/Review";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// ✅ GET - Fetch all reviews
export async function GET() {
  await connectToDatabase();
  const reviews = await Review.find().sort({ createdAt: -1 });
  return NextResponse.json(reviews);
}

// ✅ POST - Create a new review
export async function POST(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const { author, role, content, rating, featured } = body;

  if (!author || !role || !content || !rating) {
    return NextResponse.json(
      { error: "Author, role, content, and rating are required" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  const newReview = await Review.create({
    author,
    role,
    content,
    rating,
    featured: featured || false,
  });

  return NextResponse.json(newReview);
}

// ✅ PUT - Update review
export async function PUT(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const { id, author, role, content, rating, featured } = body;

  if (!id || !author || !role || !content || !rating) {
    return NextResponse.json(
      { error: "ID, author, role, content, and rating are required" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  const updatedReview = await Review.findByIdAndUpdate(
    id,
    {
      author,
      role,
      content,
      rating,
      featured: featured || false,
    },
    { new: true }
  );

  if (!updatedReview) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json(updatedReview);
}

// ✅ DELETE - Remove review
export async function DELETE(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Review ID is required" },
      { status: 400 }
    );
  }

  const deletedReview = await Review.findByIdAndDelete(id);

  if (!deletedReview) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Review deleted successfully" });
}
