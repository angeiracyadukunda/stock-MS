"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react"

interface DamagedItem {
  id: string
  name: string
  category: string
  damageReportDate: string
  reportedBy: string
  damageDescription: string
  repairStatus: "Pending" | "In Progress" | "Completed"
  expectedResolutionDate: string
}

export default function DamagedItemsPage() {
  const [damagedItems, setDamagedItems] = useState<DamagedItem[]>([
    {
      id: "DMG001",
      name: "Dell XPS 15 Laptop",
      category: "Electronics",
      damageReportDate: "2024-02-10",
      reportedBy: "John Doe",
      damageDescription: "Screen cracked, keyboard not responding",
      repairStatus: "In Progress",
      expectedResolutionDate: "2024-02-20",
    },
    {
      id: "DMG002",
      name: "Office Chair",
      category: "Furniture",
      damageReportDate: "2024-02-05",
      reportedBy: "Jane Smith",
      damageDescription: "Broken armrest, wheel missing",
      repairStatus: "Pending",
      expectedResolutionDate: "2024-02-25",
    },
    {
      id: "DMG003",
      name: "Projector",
      category: "Electronics",
      damageReportDate: "2024-01-28",
      reportedBy: "Mike Johnson",
      damageDescription: "Lamp burnt out, color distortion",
      repairStatus: "Completed",
      expectedResolutionDate: "2024-02-15",
    },
    {
      id: "DMG004",
      name: "Whiteboard",
      category: "Office Supplies",
      damageReportDate: "2024-02-12",
      reportedBy: "Sarah Lee",
      damageDescription: "Surface scratched, difficult to erase",
      repairStatus: "Pending",
      expectedResolutionDate: "2024-02-28",
    },
    {
      id: "DMG005",
      name: "Conference Phone",
      category: "Electronics",
      damageReportDate: "2024-01-20",
      reportedBy: "Alex Chen",
      damageDescription: "Poor audio quality, buttons not responsive",
      repairStatus: "In Progress",
      expectedResolutionDate: "2024-02-10",
    },
  ])

  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [filterCategory, setFilterCategory] = useState<string>("All")

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const filteredItems = damagedItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || item.repairStatus === filterStatus) &&
      (filterCategory === "All" || item.category === filterCategory),
  )

  const isOverdue = (item: DamagedItem) => {
    return new Date(item.expectedResolutionDate) < new Date() && item.repairStatus !== "Completed"
  }

  const getStatusColor = (status: DamagedItem["repairStatus"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const uniqueCategories = Array.from(new Set(damagedItems.map((item) => item.category)))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Damaged Items</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search damaged items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Damage Report Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repair Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Resolution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className={`${isOverdue(item) ? "bg-red-50" : ""} hover:bg-gray-50`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.damageReportDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reportedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.repairStatus)}`}
                      >
                        {item.repairStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.expectedResolutionDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleRowExpansion(item.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label={expandedRows.includes(item.id) ? "Collapse details" : "Expand details"}
                      >
                        {expandedRows.includes(item.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(item.id) && (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 whitespace-normal text-sm text-gray-500 bg-gray-50">
                        <strong>Damage Description:</strong> {item.damageDescription}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

