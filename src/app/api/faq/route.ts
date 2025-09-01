import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// ✅ GET - Fetch all FAQs
export async function GET() {
  await connectToDatabase();
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

// ✅ POST - Create a new FAQ
export async function POST(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const { question, answer, category } = body;

  if (!question || !answer) {
    return NextResponse.json(
      { error: "Question and answer are required" },
      { status: 400 }
    );
  }

  const newFAQ = await FAQ.create({
    question,
    answer,
    category: category || "General",
  });

  return NextResponse.json(newFAQ);
}

// ✅ PUT - Update FAQ
export async function PUT(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();

  const { id, question, answer, category } = body;

  if (!id || !question || !answer) {
    return NextResponse.json(
      { error: "ID, question, and answer are required" },
      { status: 400 }
    );
  }

  const updatedFAQ = await FAQ.findByIdAndUpdate(
    id,
    {
      question,
      answer,
      category: category || "General",
    },
    { new: true }
  );

  if (!updatedFAQ) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  return NextResponse.json(updatedFAQ);
}

// ✅ DELETE - Remove FAQ
export async function DELETE(req: Request) {
  const session = await checkAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
  }

  const deletedFAQ = await FAQ.findByIdAndDelete(id);

  if (!deletedFAQ) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "FAQ deleted successfully" });
}
