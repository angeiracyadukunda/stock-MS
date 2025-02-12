"use client"

import { useState } from "react"
import { BarChart, Download, Filter, FileText, Laptop, AlertTriangle, Clock, UserCheck, Plus, Edit, Trash2, X } from 'lucide-react'

const reports = [
  { id: 1, name: "Monthly Sales Report", type: "Sales", date: "2023-05-01" },
  { id: 2, name: "Inventory Status Report", type: "Inventory", date: "2023-05-15" },
  { id: 3, name: "User Activity Log", type: "User", date: "2023-05-30" },
  { id: 4, name: "Financial Summary", type: "Finance", date: "2023-06-01" },
  { id: 5, name: "Product Performance Analysis", type: "Product", date: "2023-06-15" },
]

const inventoryStatus = [
  { item: "Laptops", available: 10, damaged: 2, borrowed: 5 },
  { item: "Projectors", available: 5, damaged: 1, borrowed: 2 },
  { item: "Tablets", available: 15, damaged: 0, borrowed: 8 },
]

const borrowingHistory = [
  { id: 1, item: "Laptop", user: "John Doe", borrowDate: "2023-05-01", returnDate: "2023-05-15", status: "Returned" },
  { id: 2, item: "Projector", user: "Jane Smith", borrowDate: "2023-06-01", returnDate: "2023-06-10", status: "Overdue" },
  { id: 3, item: "Tablet", user: "Mike Johnson", borrowDate: "2023-06-15", returnDate: null, status: "Borrowed" },
]

const actionLogs = [
  { id: 1, action: "Added", item: "Laptop", user: "Admin", date: "2023-05-01" },
  { id: 2, action: "Updated", item: "Projector", user: "Manager", date: "2023-05-15" },
  { id: 3, action: "Deleted", item: "Old Printer", user: "Admin", date: "2023-06-01" },
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newReport, setNewReport] = useState({ name: "", type: "", date: "" })
  const [reportsList, setReportsList] = useState(reports)

  const filteredReports = reportsList.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault()
    const newReportWithId = { ...newReport, id: reportsList.length + 1 }
    setReportsList([...reportsList, newReportWithId])
    setIsModalOpen(false)
    setNewReport({ name: "", type: "", date: "" })
  }

  const handleViewReport = (report: typeof reports[0]) => {
    // In a real application, this would open the report in a new tab or modal
    console.log("Viewing report:", report)
    alert(`Viewing report: ${report.name}`)
  }

  const handleDownloadReport = (report: typeof reports[0]) => {
    // In a real application, this would trigger a download of the report
    console.log("Downloading report:", report)
    alert(`Downloading report: ${report.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Audit Logs</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <BarChart className="h-4 w-4" /> Generate New Report
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generate New Report</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleGenerateReport} className="space-y-4">
              <div>
                <label htmlFor="reportName" className="block text-sm font-medium text-gray-700">Report Name</label>
                <input
                  type="text"
                  id="reportName"
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Report Type</label>
                <input
                  type="text"
                  id="reportType"
                  value={newReport.type}
                  onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700">Report Date</label>
                <input
                  type="date"
                  id="reportDate"
                  value={newReport.date}
                  onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Inventory Levels */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Current Inventory Levels</h2>
          <div className="space-y-4">
            {inventoryStatus.map((item) => (
              <div key={item.item} className="flex items-center justify-between">
                <span className="font-medium">{item.item}</span>
                <div className="flex gap-4">
                  <span className="text-green-600"><Laptop className="h-4 w-4 inline-block mr-1" />{item.available} Available</span>
                  <span className="text-red-600"><AlertTriangle className="h-4 w-4 inline-block mr-1" />{item.damaged} Damaged</span>
                  <span className="text-blue-600"><Clock className="h-4 w-4 inline-block mr-1" />{item.borrowed} Borrowed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Borrowing History */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Borrowing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowingHistory.map((history) => (
                  <tr key={history.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{history.item}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{history.user}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${history.status === 'Returned' ? 'bg-green-100 text-green-800' : 
                          history.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {history.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Logs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Action Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actionLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.action === 'Added' && <Plus className="h-4 w-4 text-green-600 inline-block mr-1" />}
                    {log.action === 'Updated' && <Edit className="h-4 w-4 text-blue-600 inline-block mr-1" />}
                    {log.action === 'Deleted' && <Trash2 className="h-4 w-4 text-red-600 inline-block mr-1" />}
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Reports */}
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
                    <button 
                      onClick={() => handleViewReport(report)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FileText className="h-4 w-4 inline-block mr-1" /> View
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(report)}
                      className="text-green-600 hover:text-green-900"
                    >
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