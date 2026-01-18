"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Link from "next/link";

const SubcategorySection = ({ subCategory }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Function to check if scrolling is possible
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left arrow if we have scrolled more than 5px
      setShowLeftArrow(scrollLeft > 5);

      // Show right arrow only if the content is wider than the container
      // AND we haven't reached the end (with 5px buffer)
      setShowRightArrow(
        scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 5,
      );
    }
  };

  // Check on mount and if products change
  useEffect(() => {
    checkScroll();
    // Re-check on window resize
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [subCategory?.products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-2 bg-white relative group">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">{subCategory.name}</h2>
        <Link
          href={`/categories/${subCategory.parent}?subcategory=${subCategory.id}`}
          className="text-pink-600 font-semibold flex items-center"
        >
          See All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-gray-700 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-5 scrollbar-hide snap-x snap-proximity pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {subCategory?.products?.map((product) => (
            <div
              key={product.id}
              className="min-w-[180px] md:min-w-[220px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-gray-700 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
};

export default SubcategorySection;
