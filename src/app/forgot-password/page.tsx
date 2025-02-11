"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Forgot password submitted for:", email)
    setIsSubmitted(true)
  }

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
              <motion.div
                className="p-2 rounded-xl bg-[#6B4BFF]/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package className="w-8 h-8 text-[#6B4BFF]" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-center text-gray-600 mb-8">
              {isSubmitted ? "Check your email for reset instructions" : "Enter your email to reset your password"}
            </p>
            {!isSubmitted ? (
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#6B4BFF] focus:border-[#6B4BFF] transition duration-200 sm:text-sm"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6B4BFF] hover:bg-[#6B4BFF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4BFF] transition duration-200"
                  >
                    Reset Password
                  </button>
                </motion.div>
              </form>
            ) : (
              <p className="text-center text-green-600">
                If an account exists for {email}, you will receive password reset instructions.
              </p>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-center text-gray-500">
              Remember your password?{" "}
              <Link href="/login" className="text-[#6B4BFF] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

