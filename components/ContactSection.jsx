"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    try {
      const res = await fetch(`${apiUrl}/inquiries/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Inquiry sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        const error = await res.json();
        console.log(error);
        toast.error("Failed to send inquiry.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 bg-white" id="contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Get a Quote
          </h2>
          <p className="text-gray-600 text-lg font-light">
            Tell us what you need, and we'll provide a custom quote within 24 hours
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF6D1F] focus:border-[#FF6D1F] transition-all placeholder:text-gray-400"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF6D1F] focus:border-[#FF6D1F] transition-all placeholder:text-gray-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Project Details
              </label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF6D1F] focus:border-[#FF6D1F] transition-all resize-none placeholder:text-gray-400"
                placeholder="List the items you need..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6D1F] text-white font-medium py-3.5 rounded-lg hover:bg-[#e55c15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2.5 text-gray-600">
            <Phone className="w-4 h-4 text-[#FF6D1F]" />
            <span className="text-sm">416-291-3866</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <MapPin className="w-4 h-4 text-[#FF6D1F]" />
            <span className="text-sm">2981 Kennedy Rd, Scarborough</span>
          </div>
        </div>
      </div>
    </section>
  );
}
