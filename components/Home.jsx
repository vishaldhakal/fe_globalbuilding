"use client";
import { useState } from "react";
import React from "react";
import BrowseCategory from "./BrowserCategory";
import SubcategorySection from "./subCategorySection";
const Home = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allCategories = [
    { id: "all", name: "All Products", image: "" },
    ...categories,
  ];

  // Compute subcategories based on selected category
  const filteredSubcategories =
    selectedCategory === "all"
      ? categories.flatMap((cat) => cat.subcategories || [])
      : categories.find((cat) => cat.id === selectedCategory)?.subcategories ||
        [];

  return (
    <div>
      <BrowseCategory
        categories={allCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-col px-2 md:px-12 gap-3 mb-28 ">
        {filteredSubcategories?.length > 0 ? (
          <div className="flex flex-col gap-5 max-w-6xl w-full mx-auto">
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
    </div>
  );
};

export default Home;
