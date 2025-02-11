"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

const inventoryItems = [
  { id: 1, name: "Laptop X1", category: "Electronics", quantity: 50, status: "In Stock" },
  { id: 2, name: "Office Chair", category: "Furniture", quantity: 30, status: "Low Stock" },
  { id: 3, name: "Whiteboard", category: "Office Supplies", quantity: 20, status: "In Stock" },
  { id: 4, name: "Projector", category: "Electronics", quantity: 10, status: "Low Stock" },
  { id: 5, name: "Filing Cabinet", category: "Furniture", quantity: 15, status: "In Stock" },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredItems = inventoryItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "All" || item.category === categoryFilter),
  )

  const categories = ["All", ...new Set(inventoryItems.map((item) => item.category))]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Inventory</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

