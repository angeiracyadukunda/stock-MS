"use client"

import { useState } from "react"
import { Search, ChevronUp, ChevronDown } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantityAvailable: number
  status: "New" | "Good" | "Damaged" | "Disposed"
  lastUpdated: string
}

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "INV001",
      name: "Dell XPS 15 Laptop",
      category: "Electronics",
      quantityAvailable: 5,
      status: "New",
      lastUpdated: "2024-02-15T10:30:00",
    },
    {
      id: "INV002",
      name: "Office Chair",
      category: "Furniture",
      quantityAvailable: 20,
      status: "Good",
      lastUpdated: "2024-02-14T14:45:00",
    },
    {
      id: "INV003",
      name: "Projector",
      category: "Electronics",
      quantityAvailable: 2,
      status: "Damaged",
      lastUpdated: "2024-02-13T09:15:00",
    },
    {
      id: "INV004",
      name: "Whiteboard",
      category: "Office Supplies",
      quantityAvailable: 10,
      status: "New",
      lastUpdated: "2024-02-12T16:20:00",
    },
    {
      id: "INV005",
      name: "Filing Cabinet",
      category: "Furniture",
      quantityAvailable: 0,
      status: "Disposed",
      lastUpdated: "2024-02-11T11:00:00",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof InventoryItem) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedItems = [...inventoryItems].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredItems = sortedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Damaged":
        return "bg-yellow-100 text-yellow-800"
      case "Disposed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {(["id", "name", "category", "quantityAvailable", "status", "lastUpdated"] as const).map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(column)}
                  >
                    <div className="flex items-center">
                      {column === "id"
                        ? "Item ID"
                        : column === "name"
                          ? "Item Name"
                          : column === "quantityAvailable"
                            ? "Quantity Available"
                            : column === "lastUpdated"
                              ? "Last Updated"
                              : column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortColumn === column &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantityAvailable}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

