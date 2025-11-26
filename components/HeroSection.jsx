"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Ruler,
  Truck,
  CreditCard,
  RotateCcw,
  Clock,
  DollarSign,
} from "lucide-react";

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-orange-50/30 via-white to-gray-50/30 overflow-hidden py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="max-w-2xl">
              {/* Main Title */}
              <h1 className="text-4xl font-bold mb-5 tracking-tight leading-tight">
                All Renovation{" "}
                <span className="bg-linear-to-r from-[#FF6D1F] to-orange-500 bg-clip-text text-transparent">
                  and Construction Materials
                </span>{" "}
              </h1>

              {/* Store Information */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-[#FF6D1F] flex-shrink-0" />
                  <span className="text-sm">
                    Kennedy & McNicoll, Scarborough
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-700">
                  <Ruler className="w-4 h-4 text-[#FF6D1F] flex-shrink-0" />
                  <span className="text-sm">
                    50,000 sq ft indoor shopping • 3 acres
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-700">
                  <Truck className="w-4 h-4 text-[#FF6D1F] flex-shrink-0" />
                  <span className="text-sm">Delivery service available</span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-700">
                  <CreditCard className="w-4 h-4 text-[#FF6D1F] flex-shrink-0" />
                  <span className="text-sm">
                    Debit, Credit, Cash, E-Transfer
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-[#FF6D1F] to-orange-500 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Shop Categories
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-[#FF6D1F]"
                >
                  View Products
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:h-[300px] w-full">
              <div>
                <div className="rounded-2xl">
                  <Image
                    src="/hero.jpg"
                    alt="Construction and renovation materials store interior"
                    width={1000}
                    height={700}
                    className="object-cover w-full hover:scale-105 transition-transform duration-700 rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
