"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";

interface Review {
  _id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  featured: boolean;
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    author: "",
    role: "",
    content: "",
    rating: 5,
    featured: false,
  });

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(
    (review) =>
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingReview ? "/api/reviews" : "/api/reviews";
      const method = editingReview ? "PUT" : "POST";

      const body = editingReview
        ? { id: editingReview._id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save review");
      }

      const savedReview = await response.json();

      if (editingReview) {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === editingReview._id ? savedReview : review
          )
        );
      } else {
        setReviews((prev) => [savedReview, ...prev]);
      }

      setFormData({
        author: "",
        role: "",
        content: "",
        rating: 5,
        featured: false,
      });
      setShowForm(false);
      setEditingReview(null);
    } catch (err) {
      console.error("Error saving review:", err);
      alert("Failed to save review");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      author: review.author,
      role: review.role,
      content: review.content,
      rating: review.rating,
      featured: review.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reviewId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  const openDeleteDialog = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setFormData({
      author: "",
      role: "",
      content: "",
      rating: 5,
      featured: false,
    });
    setShowForm(false);
    setEditingReview(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Review
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingReview ? "Edit Review" : "Add New Review"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Author Name</label>
                <Input
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role/Title</label>
                <Input
                  placeholder="Enter role or title (e.g., Luxury Home Buyer)"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Review Content</label>
                <Textarea
                  placeholder="Enter the review content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleInputChange("rating", star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating}/5
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Review
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingReview ? "Update Review" : "Add Review"}
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
            placeholder="Search reviews..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredReviews.map((review) => (
            <Card key={review._id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {review.featured && (
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start">
                  <p className="text-muted-foreground flex-1 mr-4">
                    &quot;{review.content}&quot;
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(review)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the review by &quot;
              {reviewToDelete?.author}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setReviewToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => reviewToDelete && handleDelete(reviewToDelete._id)}
            >
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
