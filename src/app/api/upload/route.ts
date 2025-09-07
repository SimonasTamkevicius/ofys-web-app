import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user ||
    (session.user as { role?: string }).role !== "admin"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const bucketName = process.env.AWS_S3_BUCKET;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: bucketName,
      Key: file.name, // You can prefix with folder name if needed
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    return NextResponse.json({
      message: "File uploaded successfully",
      url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
