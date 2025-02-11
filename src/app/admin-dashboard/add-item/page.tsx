"use client"

import { useState, useEffect } from "react"
import { Save, Upload } from "lucide-react"

export default function AddItemPage() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unitPrice: "",
    totalValue: "",
    supplierName: "",
    purchaseDate: "",
    status: "",
    description: "",
    image: null as File | null,
  })

  useEffect(() => {
    // Auto-calculate total value
    const quantity = Number.parseFloat(item.quantity) || 0
    const unitPrice = Number.parseFloat(item.unitPrice) || 0
    const totalValue = (quantity * unitPrice).toFixed(2)
    setItem((prev) => ({ ...prev, totalValue }))
  }, [item.quantity, item.unitPrice])

  const handleChange = (name: string, value: string | File | null) => {
    setItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New item:", item)
    // Here you would typically send the data to your backend
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleChange("image", file)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Item Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              id="name"
              type="text"
              value={item.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={item.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              required
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
              Unit Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="unitPrice"
                type="number"
                value={item.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                required
                min="0"
                step="0.01"
                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label htmlFor="totalValue" className="block text-sm font-medium text-gray-700">
              Total Value
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="totalValue"
                type="text"
                value={item.totalValue}
                readOnly
                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              id="supplierName"
              type="text"
              value={item.supplierName}
              onChange={(e) => handleChange("supplierName", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              id="purchaseDate"
              type="date"
              value={item.purchaseDate}
              onChange={(e) => handleChange("purchaseDate", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={item.status}
              onChange={(e) => handleChange("status", e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a status</option>
              <option value="inStock">In Stock</option>
              <option value="lowStock">Low Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={item.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {item.image && <p className="mt-2 text-sm text-gray-500">Selected file: {item.image.name}</p>}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" /> Add Item
          </button>
        </div>
      </form>
    </div>
  )
}

