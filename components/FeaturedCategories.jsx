"use client";

import Link from "next/link";
import {
  Paintbrush,
  Hammer,
  Wrench,
  Zap,
  Ruler,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Paint & Finishes",
      subcategories: [
        "Interior Paint",
        "Exterior Paint",
        "Primers",
        "Wood Stains",
      ],
      icon: <Paintbrush className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "Hardware",
      subcategories: [
        "Fasteners",
        "Door Hardware",
        "Cabinet Hardware",
        "Locks",
      ],
      icon: <Hammer className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      name: "Plumbing",
      subcategories: ["Pipes & Fittings", "Faucets", "Sinks", "Water Heaters"],
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      name: "Electrical",
      subcategories: [
        "Wiring",
        "Switches & Outlets",
        "Lighting",
        "Circuit Breakers",
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      name: "Tools",
      subcategories: [
        "Power Tools",
        "Hand Tools",
        "Measuring Tools",
        "Tool Storage",
      ],
      icon: <Ruler className="w-6 h-6" />,
      color: "bg-red-50 text-red-600",
    },
    {
      name: "Flooring",
      subcategories: ["Tiles", "Laminate", "Hardwood", "Vinyl"],
      icon: <Layers className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-center text-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Shop by Department
            </h2>
            <p className="text-gray-500">
              Find everything you need for your project
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href="/categories"
              className="group p-6 rounded-2xl border border-gray-100 hover:border-[#FF6D1F]/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 bg-white"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 ">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-500 mb-4">
                    {cat.subcategories.map((sub, subIdx) => (
                      <span
                        key={subIdx}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {sub}
                        {subIdx < cat.subcategories.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link
            href="/categories"
            className="inline-flex items-center text-sm font-semibold text-[#FF6D1F] hover:text-[#e55c15] transition-colors"
          >
            View all departments <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
