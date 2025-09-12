import { useState, useEffect } from "react";

interface Listing {
  _id: string;
  name: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  price: number;
  order: number;
  category: "Villa" | "Casita";
  mainImage: string;
  floorPlanImage: string;
  galleryImages: string[];
  amenities: Array<{ name: string; icon?: string }>;
}

export function useRealtyData() {
  const [properties, setProperties] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/realty");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}
