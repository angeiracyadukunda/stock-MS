"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Box, Truck, Clipboard, BarChart2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Toaster, toast } from "react-hot-toast"
import React from "react"

const inventoryIcons = [Box, Truck, Clipboard, BarChart2]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentIcon, setCurrentIcon] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => (prevIcon + 1) % inventoryIcons.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

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

  // Determine the redirect URL based on user role
  let redirectUrl = "/login"; // Default to login if role is not recognized
  if (data.role === "admin") {
    redirectUrl = "/admin-dashboard/";
  } else if (data.role === "programManager") {
    redirectUrl = "/program-manager-dashboard/";
  }

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 2000);
} catch (err) {
  setError(error);
} finally {
  setLoading(false);
}

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1">
                <animate
                  attributeName="stop-color"
                  values="#3B82F6;#60A5FA;#93C5FD;#3B82F6"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1">
                <animate
                  attributeName="stop-color"
                  values="#93C5FD;#3B82F6;#60A5FA;#93C5FD"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path fill="url(#bg-gradient)" d="M0 0 Q 50 100 100 0 L 100 100 0 100" />
        </svg>
      </div>

      {/* Floating inventory items */}
      {inventoryIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500 opacity-20"
          initial={{ x: Math.random() * windowSize.width, y: Math.random() * windowSize.height }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-xl rounded-2xl border border-blue-100 overflow-hidden">
          <div className="px-8 py-10">
            <div className="flex justify-center mb-8">
              <motion.div
                className="p-3 rounded-2xl bg-blue-500 text-white"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIcon}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(inventoryIcons[currentIcon], { size: 40 })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome to StockMaster</h2>
            <p className="text-center text-gray-600 mb-8">Your intelligent inventory management solution</p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 sm:text-sm pr-10"
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
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </motion.div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-center text-gray-500">
              Need access?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact your inventory manager
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

