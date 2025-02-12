"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, X, Check, AlertCircle } from 'lucide-react'

interface NewItem {
  name: string
  category: string
  status: "available" | "borrowed" | "damaged" | "disposed"
  assignedTo: string
  condition: string
  serialNumber: string
}

export default function AddItemPage() {
  const router = useRouter()
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    category: "",
    status: "available",
    assignedTo: "",
    condition: "",
    serialNumber: "",
  })
  const [errors, setErrors] = useState<Partial<NewItem>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<NewItem> = {}
    if (!newItem.name) newErrors.name = "Name is required"
    if (!newItem.category) newErrors.category = "Category is required"
    if (!newItem.serialNumber) newErrors.serialNumber = "Serial Number is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("New item:", newItem)
    setIsSubmitting(false)
    router.push("/admin-dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-950  ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6   ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
          <div >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600`}
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
              Category
            </label>
            <select
              id="category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600`}
              required
            >
              <option value="">Select a category</option>
              <option value="Devices">Devices</option>
              <option value="Furniture">Furniture</option>
              <option value="Cleaning Materials">Cleaning Materials</option>
              <option value="Utensils">Utensils</option>
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              value={newItem.status}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value as NewItem["status"] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="damaged">Damaged</option>
              <option value="disposed">Disposed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            value={newItem.assignedTo}
            onChange={(e) => setNewItem({ ...newItem, assignedTo: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
            Condition
          </label>
          <textarea
            id="condition"
            value={newItem.condition}
            onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-200">
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            value={newItem.serialNumber}
            onChange={(e) => setNewItem({ ...newItem, serialNumber: e.target.value })}
            className={`w-full px-3 py-2 border ${errors.serialNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600`}
            required
          />
          {errors.serialNumber && <p className="mt-1 text-xs text-red-500">{errors.serialNumber}</p>}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin-dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              'Add Item'
            )}
          </button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex items-center mb-2">
            <AlertCircle className="mr-2" size={20} />
            <span className="font-semibold">Please correct the following errors:</span>
          </div>
          <ul className="list-disc list-inside">
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}