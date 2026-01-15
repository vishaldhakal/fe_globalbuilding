"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import BrowseCategory from "@/components/BrowserCategory";
import SubcategorySection from "@/components/subCategorySection";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function page() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const allCategories = [{ id: "all", name: "All", image: "" }, ...categories];

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Compute subcategories based on selected category
  const filteredSubcategories =
    selectedCategory === "all"
      ? categories.flatMap((cat) => cat.subcategories || [])
      : categories.find((cat) => cat.id === selectedCategory)?.subcategories ||
        [];

  return (
    <div className="min-h-screen bg-white">
      <BrowseCategory
        categories={allCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="max-w-6xl mx-auto ">
        <div className="flex flex-col gap-3 mb-28">
          {filteredSubcategories?.length > 0 ? (
            <div className="flex flex-col gap-5">
              {filteredSubcategories?.map((subCategory) => {
                return (
                  <SubcategorySection
                    key={subCategory.id}
                    subCategory={subCategory}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-92 flex items-center justify-center mx-auto">
              <span className="text-base">
                No products available for selected Category.
              </span>
            </div>
          )}
        </div>
        <WhyChooseUsSection />
        <ContactSection />
      </div>
    </div>
  );
}
