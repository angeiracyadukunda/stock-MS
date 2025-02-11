"use client"

import { useState } from "react"
import { BarChart, Download, Filter, FileText } from "lucide-react"

const reports = [
  { id: 1, name: "Monthly Sales Report", type: "Sales", date: "2023-05-01" },
  { id: 2, name: "Inventory Status Report", type: "Inventory", date: "2023-05-15" },
  { id: 3, name: "User Activity Log", type: "User", date: "2023-05-30" },
  { id: 4, name: "Financial Summary", type: "Finance", date: "2023-06-01" },
  { id: 5, name: "Product Performance Analysis", type: "Product", date: "2023-06-15" },
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <BarChart className="h-4 w-4" /> Generate New Report
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <FileText className="h-4 w-4 inline-block mr-1" /> View
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Download className="h-4 w-4 inline-block mr-1" /> Download
                    </button>
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

