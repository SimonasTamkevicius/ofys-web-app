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
import { Plus, Search, Edit, Trash2 } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
  });

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/faq");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Filter FAQs based on search term
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingFAQ ? "/api/faq" : "/api/faq";
      const method = editingFAQ ? "PUT" : "POST";

      const body = editingFAQ ? { id: editingFAQ._id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save FAQ");
      }

      const savedFAQ = await response.json();

      if (editingFAQ) {
        setFaqs((prev) =>
          prev.map((faq) => (faq._id === editingFAQ._id ? savedFAQ : faq))
        );
      } else {
        setFaqs((prev) => [savedFAQ, ...prev]);
      }

      setFormData({ question: "", answer: "", category: "General" });
      setShowForm(false);
      setEditingFAQ(null);
    } catch (err) {
      console.error("Error saving FAQ:", err);
      alert("Failed to save FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setShowForm(true);
  };

  const handleDelete = async (faqId: string) => {
    try {
      const response = await fetch("/api/faq", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: faqId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete FAQ");
      }

      setFaqs((prev) => prev.filter((faq) => faq._id !== faqId));
      setDeleteDialogOpen(false);
      setFaqToDelete(null);
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      alert("Failed to delete FAQ");
    }
  };

  const openDeleteDialog = (faq: FAQ) => {
    setFaqToDelete(faq);
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setFormData({ question: "", answer: "", category: "General" });
    setShowForm(false);
    setEditingFAQ(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading FAQs...</p>
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
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New FAQ
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Question</label>
                <Input
                  placeholder="Enter the question"
                  value={formData.question}
                  onChange={(e) =>
                    handleInputChange("question", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  placeholder="Enter the answer"
                  value={formData.answer}
                  onChange={(e) => handleInputChange("answer", e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  placeholder="Category (e.g., General, Payments, etc.)"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFAQ ? "Update FAQ" : "Add FAQ"}
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
            placeholder="Search FAQs..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredFAQs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No FAQs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq._id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">
                    {faq.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground flex-1 mr-4">
                    {faq.answer}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(faq)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(faq)}
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
            <DialogTitle>Delete FAQ</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{faqToDelete?.question}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setFaqToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => faqToDelete && handleDelete(faqToDelete._id)}
            >
              Delete FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
