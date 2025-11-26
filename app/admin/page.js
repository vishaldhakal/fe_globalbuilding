"use client";
import { useState, useEffect } from "react";
import AdminPanel from "@/components/AdminPanel";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_login", "true");
      toast.success("Welcome back");
    } else {
      toast.error("Invalid credentials");
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_login") === "true";
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  if (isLoggedIn) return <AdminPanel />;

  return (
    <div className="min-h-screen  flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-[400px]">
        {/* Login Form Card */}
        <div className="bg-white  relative overflow-hidden">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 w-full h-1.5"></div>

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="/Global_LOGO_200.jpg"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to manage your inventory
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-[#FF6D1F]/10 focus:border-[#FF6D1F] transition-all placeholder:text-gray-400"
                required
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-[#FF6D1F]/10 focus:border-[#FF6D1F] transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6D1F] text-white py-3.5 rounded-xl font-medium hover:bg-[#e55c15] transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Global Building Supplies.
        </p>
      </div>
    </div>
  );
}
