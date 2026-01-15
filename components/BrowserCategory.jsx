"use client";
import React, { useState } from "react";

const BrowseCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    categories?.length > 0 && (
      <div className="w-full  sticky top-22 z-50  bg-white  border-b border-gray-200 ">
        <div className="flex h-full  gap-8 mx-4 md:mx-8  lg:mx-42 overflow-x-auto scrollbar-hide ">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex  items-center min-w-[90px] gap-1 cursor-pointer py-2 ${
                selectedCategory === cat.id
                  ? "border-b-4 border-b-orange-500"
                  : ""
              }`}
            >
              <div className="w-12 text-base font-bold text-center leading-tight text-gray-700 text-wrap">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default BrowseCategory;
