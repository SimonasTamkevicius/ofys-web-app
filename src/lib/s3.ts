import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

// Initialize S3 client
export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload a file to S3 and return its public URL
 * @param file - Buffer containing file data
 * @param key - Path/key for the file in S3
 * @param contentType - MIME type of the file
 */
export async function uploadToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION;

  if (!bucket)
    throw new Error("AWS_BUCKET_NAME environment variable is not defined");
  if (!region)
    throw new Error("AWS_REGION environment variable is not defined");

  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw new Error("Failed to upload file to S3");
  }
}

/**
 * Delete a file from S3
 * @param url - The full S3 URL of the file to delete
 */
export async function deleteFromS3(url: string): Promise<void> {
  const bucket = process.env.AWS_S3_BUCKET;

  if (!bucket)
    throw new Error("AWS_BUCKET_NAME environment variable is not defined");

  try {
    // Extract the key from the URL more robustly
    let key: string;

    // Handle different S3 URL formats
    if (url.includes(".s3.")) {
      // Format: https://bucket.s3.region.amazonaws.com/key
      const urlObj = new URL(url);
      key = urlObj.pathname.substring(1); // Remove leading slash
    } else if (url.includes("/")) {
      // Fallback: assume the key is everything after the last slash
      key = url.split("/").slice(-1)[0];
    } else {
      // If it's already just a key
      key = url;
    }

    // Clean up the key (remove any query parameters)
    key = key.split("?")[0];

    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
  } catch (err) {
    console.error("Error deleting from S3:", err);
    // Don't throw error to prevent blocking the delete operation
    // The database record will still be deleted even if S3 deletion fails
  }
}

/**
 * Delete multiple files from S3
 * @param urls - Array of S3 URLs to delete
 */
export async function deleteMultipleFromS3(urls: string[]): Promise<void> {
  const deletePromises = urls.map((url) => deleteFromS3(url));
  await Promise.allSettled(deletePromises);
}
