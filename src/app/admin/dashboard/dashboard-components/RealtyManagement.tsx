"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  // Upload,
  GripVertical,
} from "lucide-react";

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

// Sortable Property Card Component
function SortablePropertyCard({
  realty,
  onEdit,
  onDelete,
}: {
  realty: Listing;
  onEdit: (realty: Listing) => void;
  onDelete: (realty: Listing) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: realty._id });

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
            <CardTitle className="text-lg">{realty.name}</CardTitle>
            <div className="flex gap-2">
              {realty.category && (
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {realty.category}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm line-clamp-2">
              {realty.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{realty.bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{realty.bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Sleeps {realty.sleeps}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  {formatPrice(realty.price)}
                </p>
                <p className="text-sm text-gray-500">
                  Order: {realty.order || 0}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(realty)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(realty)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RealtyManagement() {
  const [realties, setRealties] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProperty, setEditingProperty] = useState<Listing | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Listing | null>(
    null
  );

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
    price: "",
    order: 0,
    category: "Villa" as "Villa" | "Casita",
    amenities: [] as string[],
    mainImage: null as File | null,
    mainImagePreview: "" as string,
    floorplan: null as File | null,
    floorplanPreview: "" as string,
    gallery: [] as (GalleryImage | ExistingGalleryImage)[],
  });

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/realty");
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setRealties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on search term
  const filteredRealties = realties.filter(
    (realty) =>
      realty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      realty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      realty.price.toString().includes(searchTerm) ||
      realty.bedrooms.toString().includes(searchTerm) ||
      realty.bathrooms.toString().includes(searchTerm)
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
      const oldIndex = realties.findIndex((item) => item._id === active.id);
      const newIndex = realties.findIndex((item) => item._id === over?.id);

      const newRealties = arrayMove(realties, oldIndex, newIndex);

      // Update order values in the local state immediately with a single state update
      const updatedRealties = newRealties.map((realty, index) => ({
        ...realty,
        order: index + 1,
      }));

      // Use React's batching to prevent multiple re-renders
      React.startTransition(() => {
        setRealties(updatedRealties);
      });

      // Update order values in the database
      const updates = updatedRealties.map((realty, index) => ({
        id: realty._id,
        order: index + 1,
      }));

      try {
        const response = await fetch("/api/realty", {
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
        console.error("Error updating order:", error);
        // Revert the change on error
        fetchProperties();
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

  const handleEdit = (property: Listing) => {
    setEditingProperty(property);

    console.log("Editing property:", property);
    console.log("Property galleryImages:", property.galleryImages);

    // Convert existing gallery images to the format we need
    const existingGalleryImages: ExistingGalleryImage[] =
      property.galleryImages.map((url, index) => ({
        id: `existing-${index}`,
        url,
        isExisting: true,
      }));

    console.log("Converted existingGalleryImages:", existingGalleryImages);

    setFormData({
      name: property.name,
      description: property.description,
      location: property.location,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      sleeps: property.sleeps.toString(),
      price: property.price.toString(),
      order: property.order || 0,
      category: property.category,
      amenities: property.amenities.map((a) => a.name),
      mainImage: null,
      mainImagePreview: property.mainImage || "",
      floorplan: null,
      floorplanPreview: property.floorPlanImage || "",
      gallery: existingGalleryImages,
    });
    setShowForm(true);
  };

  const handleDelete = async (propertyId: string) => {
    try {
      const response = await fetch("/api/realty", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: propertyId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      setRealties((prev) => prev.filter((p) => p._id !== propertyId));
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete property");
    }
  };

  const openDeleteDialog = (property: Listing) => {
    setPropertyToDelete(property);
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
      formDataToSend.append("price", formData.price);
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

      const url = editingProperty ? "/api/realty" : "/api/realty";
      const method = editingProperty ? "PUT" : "POST";

      if (editingProperty) {
        formDataToSend.append("id", editingProperty._id);
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(
          editingProperty
            ? "Failed to update property"
            : "Failed to create property"
        );
      }

      const newProperty = await response.json();

      if (editingProperty) {
        setRealties((prev) =>
          prev.map((p) => (p._id === editingProperty._id ? newProperty : p))
        );
      } else {
        setRealties((prev) => [...prev, newProperty]);
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        sleeps: "",
        price: "",
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
      setEditingProperty(null);
    } catch (err) {
      console.error("Error saving property:", err);
      alert(
        editingProperty
          ? "Failed to update property"
          : "Failed to create property"
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
      price: "",
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
    setEditingProperty(null);
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
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading properties...</div>
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
        <h2 className="text-xl font-semibold">Realty Properties</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {editingProperty ? "Edit Property" : "Add New Property"}
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
                  <option value="Casita">Casita</option>
                </select>
                <p className="text-xs text-gray-600">
                  Only one Casita property is allowed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Beachfront Villa"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="1200000"
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
                  placeholder="Describe the property features, amenities, and highlights..."
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
                  <Input
                    id="mainImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange("mainImage", e.target.files)
                    }
                    className="cursor-pointer"
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
                          console.log("Rendering gallery image:", image);
                          const imageSrc =
                            "preview" in image ? image.preview : image.url;
                          console.log("Image src:", imageSrc);
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
                                ×
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
                  {editingProperty ? "Update Property" : "Add Property"}
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
            placeholder="Search properties..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRealties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredRealties.map((realty) => realty._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 gap-4">
              {filteredRealties.map((realty) => (
                <SortablePropertyCard
                  key={realty._id}
                  realty={realty}
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
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{propertyToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setPropertyToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                propertyToDelete && handleDelete(propertyToDelete._id)
              }
            >
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
