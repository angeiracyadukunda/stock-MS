"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"

const reports = [
  { id: 1, name: "Monthly Inventory Summary", type: "Inventory", date: "2023-05-01", downloadUrl: "#" },
  { id: 2, name: "Quarterly Borrowing Trends", type: "Borrowing", date: "2023-04-01", downloadUrl: "#" },
  { id: 3, name: "Annual Department Usage", type: "Usage", date: "2023-01-01", downloadUrl: "#" },
  { id: 4, name: "Overdue Items Report", type: "Overdue", date: "2023-05-15", downloadUrl: "#" },
  { id: 5, name: "Equipment Maintenance Schedule", type: "Maintenance", date: "2023-05-10", downloadUrl: "#" },
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
      <h2 className="text-3xl font-bold text-gray-900">Reports</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href={report.downloadUrl} className="text-blue-600 hover:text-blue-900">
                    <Download className="h-5 w-5 inline-block mr-1" />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

