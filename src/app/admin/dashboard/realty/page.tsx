"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AdminListingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [sleeps, setSleeps] = useState(1);
  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState<string[]>(["WiFi", "Pool"]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [floorplan, setFloorplan] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("bedrooms", bedrooms.toString());
    formData.append("bathrooms", bathrooms.toString());
    formData.append("sleeps", sleeps.toString());
    formData.append("price", price.toString());
    formData.append("amenities", JSON.stringify(amenities));

    if (mainImage) formData.append("mainImage", mainImage);
    if (floorplan) formData.append("floorplan", floorplan);
    gallery.forEach((file) => formData.append("gallery", file));

    try {
      const res = await fetch("/api/realty", {
        method: "POST",
        body: formData,
        credentials: "include", // include cookies for NextAuth
      });

      if (!res.ok) throw new Error("Failed to create listing");

      toast.success("Listing created successfully!");

      // Clear form
      setName("");
      setDescription("");
      setBedrooms(1);
      setBathrooms(1);
      setSleeps(1);
      setPrice(0);
      setAmenities(["WiFi", "Pool"]);
      setMainImage(null);
      setFloorplan(null);
      setGallery([]);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Beach House"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beautiful property near the beach..."
                required
              />
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label>Sleeps</Label>
                <Input
                  type="number"
                  value={sleeps}
                  onChange={(e) => setSleeps(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <Label>Amenities (comma separated)</Label>
              <Input
                value={amenities.join(", ")}
                onChange={(e) =>
                  setAmenities(e.target.value.split(",").map((a) => a.trim()))
                }
                placeholder="WiFi, Pool, Air Conditioning"
              />
            </div>

            <div>
              <Label>Main Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setMainImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <div>
              <Label>Blueprint / Floorplan</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFloorplan(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <div>
              <Label>Gallery Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setGallery(e.target.files ? Array.from(e.target.files) : [])
                }
              />
            </div>

            <Button type="submit">Create Listing</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminListingForm;
