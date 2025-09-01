import PropertyPage from "../../custom-components/generic/PropertyPage";
import { connectToDatabase } from "@/lib/mongodb";
import Rental from "@/lib/models/Rental";
import { notFound } from "next/navigation";

export default async function PropertyPageServer({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database connection timeout")), 5000)
    );

    const dbPromise = connectToDatabase();
    await Promise.race([dbPromise, timeoutPromise]);

    const property = await Rental.findById(slug);

    if (!property) {
      notFound();
    }

    // Convert to plain object to remove toJSON method and make it serializable
    const propertyData = JSON.parse(JSON.stringify(property));

    return <PropertyPage property={propertyData} type="Rentals" />;
  } catch (error) {
    console.error("Error fetching rental:", error);
    notFound();
  }
}
