"use client"

import { useState } from "react";
import { Package, Eye, EyeOff } from 'lucide-react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Incorrect email or password");
        } else {
          toast.error(data.message || "Login failed");
        }
        throw new Error(data.message || "Login failed");
      }
      
      console.log("Login successful", data);
      localStorage.setItem("token", data.token);
      
      toast.success("Login successful! Redirecting to your dashboard...");
      
      // Redirect user after login (adjust as needed)
      setTimeout(() => {
        window.location.href = "/admin-dashboard/";
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-center mb-8">
              <motion.div className="p-2 rounded-xl bg-[#6B4BFF]/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Package className="w-8 h-8 text-[#6B4BFF]" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8">Enter your credentials to access your account</p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6B4BFF] focus:border-[#6B4BFF] transition duration-200 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-sm text-[#6B4BFF] hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6B4BFF] focus:border-[#6B4BFF] transition duration-200 sm:text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6B4BFF] hover:bg-[#6B4BFF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4BFF] transition duration-200"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </motion.div>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-center text-gray-500">
              Don't have an account? <a href="#" className="text-[#6B4BFF] hover:underline">Contact your administrator</a>.
            </p>
          </div>
        </div>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}