import { useState, useEffect } from "react";

interface Rental {
  _id: string;
  name: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  category: "Villa" | "Apartment" | "Bungalow";
  mainImage: string;
  floorPlanImage: string;
  galleryImages: string[];
  amenities: Array<{ name: string; icon?: string }>;
}

export function useRentalData() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/rentals");
        if (!response.ok) {
          throw new Error("Failed to fetch rentals");
        }
        const data = await response.json();
        setRentals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return { rentals, loading, error };
}
