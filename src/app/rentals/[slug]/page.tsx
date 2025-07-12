import PropertyPage from "../../components/generic/PropertyPage";
import properties from "@/app/data/properties";
import { notFound } from "next/navigation";

export default async function PropertyPageServer({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((v) => v.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyPage property={property} type="Rentals" />;
}
