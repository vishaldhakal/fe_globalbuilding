"use client";

import { ShieldCheck, PackageCheck, Users } from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Huge Selection",
      description:
        "From paints to pipes, flooring to fixtures, our extensive collection and innovation are top-notch.",
      icon: <PackageCheck className="w-5 h-5" />,
    },
    {
      title: "Trusted Brands",
      description:
        "Authorised dealer for top-quality brands and the best products for builders and homeowners alike.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: "Retail & Wholesale",
      description:
        "Big or small, we serve everyone—whether you're buying for a project or completing your business.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <section className="w-full mx-auto px-2 md:px-12 ">
      <div className="max-w-6xl w-full  mx-auto bg-gray-100/50 px-12  py-26">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-semibold text-gray-900 tracking-tight mb-6 leading-tight">
              Building Trust, One Project at a Time
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              We're not just a supplier; we're your partner in building.
              Quality, reliability, and service you can count on, every single
              time.
            </p>
          </div>

          {/* Right Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
