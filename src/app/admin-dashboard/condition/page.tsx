'use client'

import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, XCircle, BarChart2, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface ConditionReport {
  id: string
  itemId: string
  itemName: string
  category: string
  lastInspection: string
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  notes: string
  nextInspectionDue: string
}

export default function ConditionMonitoringPage() {
  const [reports, setReports] = useState<ConditionReport[]>([
    {
      id: "REP001",
      itemId: "INV001",
      itemName: "Dell XPS 15 Laptop",
      category: "Electronics",
      lastInspection: "2024-02-01",
      condition: "good",
      notes: "Minor scratches on the lid, otherwise in good working condition.",
      nextInspectionDue: "2024-05-01"
    },
    {
      id: "REP002",
      itemId: "INV002",
      itemName: "Office Chair",
      category: "Furniture",
      lastInspection: "2024-01-15",
      condition: "fair",
      notes: "Armrest padding worn, consider replacement in next 6 months.",
      nextInspectionDue: "2024-04-15"
    },
    {
      id: "REP003",
      itemId: "INV003",
      itemName: "Projector",
      category: "Electronics",
      lastInspection: "2024-02-10",
      condition: "excellent",
      notes: "Recently serviced, all components in perfect working order.",
      nextInspectionDue: "2024-08-10"
    },
    {
      id: "REP004",
      itemId: "INV004",
      itemName: "Conference Table",
      category: "Furniture",
      lastInspection: "2024-01-20",
      condition: "poor",
      notes: "Surface heavily scratched and stained. Recommend replacement.",
      nextInspectionDue: "2024-03-20"
    }
  ])

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'good':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case 'fair':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'poor':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Condition Monitoring</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#6B4BFF] text-white rounded-lg hover:bg-[#5B3FE6] transition-colors">
          <BarChart2 className="h-5 w-5" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Overall Condition</h2>
            <ArrowUpRight className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600 mt-1">Items in excellent or good condition</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Inspections</h2>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600 mt-1">Items due for inspection this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Maintenance Required</h2>
            <ArrowDownRight className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-600 mt-1">Items needing immediate attention</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Inspection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Inspection</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.itemId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.lastInspection}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getConditionIcon(report.condition)}
                      <span className="text-sm font-medium capitalize">{report.condition}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{report.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.nextInspectionDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 4 entries</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-[#6B4BFF] rounded hover:bg-[#5B3FE6]">1</button>
              <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}