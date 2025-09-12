"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Bed,
  Bath,
  Users,
  GripVertical,
} from "lucide-react";

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
  order: number;
  category: "Villa" | "Apartment" | "Casita";
  mainImage: string;
  floorPlanImage: string;
  galleryImages: string[];
  amenities: Array<{ name: string; icon?: string }>;
}

interface GalleryImage {
  id: string;
  file: File;
  preview: string;
}

interface ExistingGalleryImage {
  id: string;
  url: string;
  isExisting: true;
}

// Sortable Rental Card Component
function SortableRentalCard({
  rental,
  onEdit,
  onDelete,
}: {
  rental: Rental;
  onEdit: (rental: Rental) => void;
  onDelete: (rental: Rental) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rental._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{rental.name}</CardTitle>
            <div className="flex gap-2">
              {rental.category && (
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {rental.category}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm line-clamp-2">
              {rental.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{rental.bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{rental.bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Sleeps {rental.sleeps}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold">
                  {formatPrice(rental.pricePerNight)}
                </div>
                <div className="text-xs text-gray-600">per night</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold">
                  {formatPrice(rental.pricePerWeek)}
                </div>
                <div className="text-xs text-gray-600">per week</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold">
                  {formatPrice(rental.pricePerMonth)}
                </div>
                <div className="text-xs text-gray-600">per month</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Order: {rental.order || 0}
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(rental)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(rental)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RentalManagement() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRental, setEditingRental] = useState<Rental | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState<Rental | null>(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    sleeps: "",
    pricePerNight: "",
    pricePerWeek: "",
    pricePerMonth: "",
    order: 0,
    category: "Villa" as "Villa" | "Apartment" | "Casita",
    amenities: [] as string[],
    mainImage: null as File | null,
    mainImagePreview: "" as string,
    floorplan: null as File | null,
    floorplanPreview: "" as string,
    gallery: [] as (GalleryImage | ExistingGalleryImage)[],
  });

  // Fetch rentals from API
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

  useEffect(() => {
    fetchRentals();
  }, []);

  // Filter rentals based on search term
  const filteredRentals = rentals.filter(
    (rental) =>
      rental.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.pricePerNight.toString().includes(searchTerm) ||
      rental.pricePerWeek.toString().includes(searchTerm) ||
      rental.pricePerMonth.toString().includes(searchTerm) ||
      rental.bedrooms.toString().includes(searchTerm) ||
      rental.bathrooms.toString().includes(searchTerm)
  );

  const handleInputChange = (
    field: string,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle drag end for reordering
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = rentals.findIndex((item) => item._id === active.id);
      const newIndex = rentals.findIndex((item) => item._id === over?.id);

      const newRentals = arrayMove(rentals, oldIndex, newIndex);

      // Update order values in the local state immediately with a single state update
      const updatedRentals = newRentals.map((rental, index) => ({
        ...rental,
        order: index + 1,
      }));

      // Use React's batching to prevent multiple re-renders
      React.startTransition(() => {
        setRentals(updatedRentals);
      });

      // Update order values in the database
      const updates = updatedRentals.map((rental, index) => ({
        id: rental._id,
        order: index + 1,
      }));

      try {
        const response = await fetch("/api/rentals", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates }),
        });

        if (!response.ok) {
          throw new Error("Failed to update order");
        }
      } catch (error) {
        console.error("Error updating rental order:", error);
        // Revert the change on error
        fetchRentals();
      }
    }
  };

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (field: string, files: FileList | null) => {
    if (!files) return;

    if (field === "gallery") {
      const newGalleryImages: GalleryImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const preview = await createImagePreview(file);
        newGalleryImages.push({
          id: `${Date.now()}-${i}`,
          file,
          preview,
        });
      }

      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newGalleryImages],
      }));
    } else {
      const file = files[0];
      const preview = await createImagePreview(file);

      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: preview,
      }));
    }
  };

  const removeGalleryImage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== id),
    }));
  };

  const reorderGalleryImages = (fromIndex: number, toIndex: number) => {
    setFormData((prev) => {
      const newGallery = [...prev.gallery];
      const [movedItem] = newGallery.splice(fromIndex, 1);
      newGallery.splice(toIndex, 0, movedItem);
      return { ...prev, gallery: newGallery };
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (fromIndex !== toIndex) {
      reorderGalleryImages(fromIndex, toIndex);
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleEdit = (rental: Rental) => {
    setEditingRental(rental);

    console.log("Editing rental:", rental);
    console.log("Rental galleryImages:", rental.galleryImages);

    // Convert existing gallery images to the format we need
    const existingGalleryImages: ExistingGalleryImage[] =
      rental.galleryImages.map((url, index) => ({
        id: `existing-${index}`,
        url,
        isExisting: true,
      }));

    console.log("Converted existingGalleryImages:", existingGalleryImages);

    setFormData({
      name: rental.name,
      description: rental.description,
      location: rental.location,
      bedrooms: rental.bedrooms.toString(),
      bathrooms: rental.bathrooms.toString(),
      sleeps: rental.sleeps.toString(),
      pricePerNight: rental.pricePerNight.toString(),
      pricePerWeek: rental.pricePerWeek.toString(),
      pricePerMonth: rental.pricePerMonth.toString(),
      order: rental.order || 0,
      category: rental.category,
      amenities: rental.amenities.map((a) => a.name),
      mainImage: null,
      mainImagePreview: rental.mainImage || "",
      floorplan: null,
      floorplanPreview: rental.floorPlanImage || "",
      gallery: existingGalleryImages,
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!rentalToDelete) return;
    const rentalId = rentalToDelete._id;
    try {
      const response = await fetch("/api/rentals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: rentalId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete rental");
      }

      setRentals((prev) => prev.filter((r) => r._id !== rentalId));
      setDeleteDialogOpen(false);
      setRentalToDelete(null);
    } catch (err) {
      console.error("Error deleting rental:", err);
      alert("Failed to delete rental");
    }
  };

  const openDeleteDialog = (rental: Rental) => {
    setRentalToDelete(rental);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("bedrooms", formData.bedrooms);
      formDataToSend.append("bathrooms", formData.bathrooms);
      formDataToSend.append("sleeps", formData.sleeps);
      formDataToSend.append("pricePerNight", formData.pricePerNight);
      formDataToSend.append("pricePerWeek", formData.pricePerWeek);
      formDataToSend.append("pricePerMonth", formData.pricePerMonth);
      formDataToSend.append("order", formData.order.toString());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("amenities", JSON.stringify(formData.amenities));

      // Add image files
      if (formData.mainImage) {
        formDataToSend.append("mainImage", formData.mainImage);
      }
      if (formData.floorplan) {
        formDataToSend.append("floorplan", formData.floorplan);
      }

      // Handle gallery images - send existing URLs and new files separately
      const existingGalleryUrls: string[] = [];

      formData.gallery.forEach((galleryImage) => {
        if ("file" in galleryImage) {
          // New file - append directly
          formDataToSend.append("gallery", galleryImage.file);
        } else {
          // Existing image - collect URL to preserve
          existingGalleryUrls.push(galleryImage.url);
        }
      });

      // Send existing URLs as JSON string
      formDataToSend.append(
        "existingGalleryUrls",
        JSON.stringify(existingGalleryUrls)
      );

      const url = editingRental ? "/api/rentals" : "/api/rentals";
      const method = editingRental ? "PUT" : "POST";

      if (editingRental) {
        formDataToSend.append("id", editingRental._id);
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(
          editingRental ? "Failed to update rental" : "Failed to create rental"
        );
      }

      const newRental = await response.json();

      if (editingRental) {
        setRentals((prev) =>
          prev.map((r) => (r._id === editingRental._id ? newRental : r))
        );
      } else {
        setRentals((prev) => [...prev, newRental]);
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        sleeps: "",
        pricePerNight: "",
        pricePerWeek: "",
        pricePerMonth: "",
        order: 0,
        category: "Villa",
        amenities: [],
        mainImage: null,
        mainImagePreview: "",
        floorplan: null,
        floorplanPreview: "",
        gallery: [],
      });

      setShowForm(false);
      setEditingRental(null);
    } catch (err) {
      console.error("Error saving rental:", err);
      alert(
        editingRental ? "Failed to update rental" : "Failed to create rental"
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      sleeps: "",
      pricePerNight: "",
      pricePerWeek: "",
      pricePerMonth: "",
      order: 0,
      category: "Villa",
      amenities: [],
      mainImage: null,
      mainImagePreview: "",
      floorplan: null,
      floorplanPreview: "",
      gallery: [],
    });
    setShowForm(false);
    setEditingRental(null);
  };

  const commonAmenities = [
    "WiFi",
    "Air Conditioning",
    "Kitchen",
    "Pool",
    "Garden",
    "Parking",
    "Ocean View",
    "Mountain View",
    "Beach Access",
    "Fully Furnished",
    "Cleaning Service",
    "Concierge",
    "Security",
    "Gym",
    "Spa",
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading rentals...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Rental Properties</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Rental
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {editingRental ? "Edit Rental" : "Add New Rental"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange(
                      "category",
                      e.target.value as "Villa" | "Apartment" | "Bungalow"
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85277F] focus:border-transparent"
                  required
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Casita">Casita</option>
                </select>
                <p className="text-xs text-gray-600">
                  Only one Apartment and one Casita property are allowed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Rental Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Luxury Beach Villa"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerNight">Price Per Night (USD)</Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) =>
                      handleInputChange("pricePerNight", e.target.value)
                    }
                    placeholder="250"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricePerWeek">Price Per Week (USD)</Label>
                  <Input
                    id="pricePerWeek"
                    type="number"
                    value={formData.pricePerWeek}
                    onChange={(e) =>
                      handleInputChange("pricePerWeek", e.target.value)
                    }
                    placeholder="1500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerMonth">Price Per Month (USD)</Label>
                  <Input
                    id="pricePerMonth"
                    type="number"
                    value={formData.pricePerMonth}
                    onChange={(e) =>
                      handleInputChange("pricePerMonth", e.target.value)
                    }
                    placeholder="5000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      handleInputChange("bedrooms", e.target.value)
                    }
                    placeholder="3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      handleInputChange("bathrooms", e.target.value)
                    }
                    placeholder="2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleeps">Sleeps</Label>
                  <Input
                    id="sleeps"
                    type="number"
                    value={formData.sleeps}
                    onChange={(e) =>
                      handleInputChange("sleeps", e.target.value)
                    }
                    placeholder="6"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the rental property features, amenities, and highlights..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="e.g., Costa Rica"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={(e) =>
                          handleAmenityChange(amenity, e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mainImage">Main Image</Label>
                  <input
                    id="mainImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange("mainImage", e.target.files)
                    }
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                  />

                  {formData.mainImagePreview && (
                    <div className="mt-2">
                      <img
                        src={formData.mainImagePreview}
                        alt="Main image preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floorplan">Floor Plan</Label>
                  <Input
                    id="floorplan"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange("floorplan", e.target.files)
                    }
                    className="cursor-pointer"
                  />
                  {formData.floorplanPreview && (
                    <div className="mt-2">
                      <img
                        src={formData.floorplanPreview}
                        alt="Floor plan preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery">Gallery Images</Label>
                  <Input
                    id="gallery"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleFileChange("gallery", e.target.files)
                    }
                    className="cursor-pointer"
                  />
                  {formData.gallery.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Drag to reorder images (first image will be the cover):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {formData.gallery.map((image, index) => {
                          console.log("Rendering rental gallery image:", image);
                          const imageSrc =
                            "preview" in image ? image.preview : image.url;
                          console.log("Rental image src:", imageSrc);
                          return (
                            <div
                              key={image.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, index)}
                              className="relative group cursor-move border rounded-lg overflow-hidden"
                            >
                              <img
                                src={imageSrc}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-24 object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                {index + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(image.id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                x
                              </button>
                              <div className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 rounded text-xs">
                                <GripVertical className="w-3 h-3" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRental ? "Update Rental" : "Add Rental"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center py-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rentals..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRentals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No rentals found.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredRentals.map((rental) => rental._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-4">
              {filteredRentals.map((rental) => (
                <SortableRentalCard
                  key={rental._id}
                  rental={rental}
                  onEdit={handleEdit}
                  onDelete={openDeleteDialog}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Rental</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{rentalToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
