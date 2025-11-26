"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Upload,
  Image as ImageIcon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QuillEditor from "@/components/QuillEditor";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    availability: true,
    meta_title: "",
    meta_description: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Fetch categories for dropdown
  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        const options = [];
        data.forEach((cat) => {
          // Top-level category
          options.push({ id: cat.id, name: cat.name, level: 0 });

          // Subcategories
          if (cat.subcategories && cat.subcategories.length > 0) {
            cat.subcategories.forEach((sub) => {
              options.push({ id: sub.id, name: sub.name, level: 1 });
            });
          }
        });
        setCategories(options);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          availability: data.availability ?? true,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          description: data.description || "",
        });
        if (data.image) setPreview(data.image);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate description (strip HTML tags and check if empty)
    const descriptionText = form.description
      ? form.description.replace(/<[^>]*>/g, "").trim()
      : "";
    if (!descriptionText) {
      toast.error("Please provide a product description.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", parseFloat(form.price));
    formData.append("category", Number(form.category));
    formData.append("availability", form.availability);
    formData.append("description", form.description);

    if (form.meta_title) formData.append("meta_title", form.meta_title);
    if (form.meta_description)
      formData.append("meta_description", form.meta_description);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const res = await fetch(`${apiUrl}/products/${id}/update/`, {
        method: "PATCH",
        body: formData,
      });
      if (res.ok) {
        toast.success("Product updated successfully!");
        router.push("/admin");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Update Product
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload - Centered at Top */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Product Image
              </label>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <div
                className={`
                  border-2 border-dashed w-full h-80 rounded-2xl cursor-pointer flex flex-col items-center justify-center 
                  transition-all duration-300 relative overflow-hidden group
                  ${
                    preview
                      ? "border-gray-200"
                      : "border-gray-300 hover:border-gray-900 hover:bg-gray-50"
                  }
                `}
                onClick={() => fileInputRef.current.click()}
              >
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="bg-white p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                        <Upload className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      SVG, PNG, JPG or GIF (max. 800x800px)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Premium Leather Bag"
                className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm placeholder:text-gray-400"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border border-gray-200 pl-8 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm cursor-pointer"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.level === 0 ? cat.name : "— " + cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <input
                type="checkbox"
                name="availability"
                checked={form.availability}
                onChange={handleChange}
                id="availability"
                className="w-5 h-5 text-gray-900 focus:ring-gray-900 rounded border-gray-300 cursor-pointer"
              />
              <label
                htmlFor="availability"
                className="text-sm font-medium text-gray-900 cursor-pointer select-none"
              >
                Available for sale
              </label>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Description <span className="text-red-500">*</span>
              </label>
              <QuillEditor
                value={form.description}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    description: value,
                  }));
                }}
                placeholder="Detailed product description..."
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                SEO Settings (Optional)
              </h3>

              <div className="space-y-6">
                {/* Meta Title */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={form.meta_title}
                    onChange={handleChange}
                    placeholder="SEO Title"
                    className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm placeholder:text-gray-400"
                  />
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    Meta Description
                  </label>
                  <textarea
                    name="meta_description"
                    value={form.meta_description}
                    onChange={handleChange}
                    placeholder="SEO Description"
                    className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 resize-none text-sm placeholder:text-gray-400"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-200 font-medium text-sm shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-[0.98]"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
