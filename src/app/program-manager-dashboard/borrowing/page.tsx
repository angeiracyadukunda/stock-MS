"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

const borrowingHistory = [
  {
    id: 1,
    item: "Laptop X1",
    borrower: "John Doe",
    department: "IT",
    borrowDate: "2023-05-01",
    returnDate: "2023-05-15",
    status: "Returned",
  },
  {
    id: 2,
    item: "Projector",
    borrower: "Jane Smith",
    department: "Marketing",
    borrowDate: "2023-05-10",
    returnDate: null,
    status: "Borrowed",
  },
  {
    id: 3,
    item: "Office Chair",
    borrower: "Mike Johnson",
    department: "HR",
    borrowDate: "2023-04-20",
    returnDate: "2023-05-05",
    status: "Returned",
  },
  {
    id: 4,
    item: "Whiteboard",
    borrower: "Sarah Williams",
    department: "Sales",
    borrowDate: "2023-05-15",
    returnDate: null,
    status: "Overdue",
  },
  {
    id: 5,
    item: "Filing Cabinet",
    borrower: "Tom Brown",
    department: "Finance",
    borrowDate: "2023-05-05",
    returnDate: "2023-05-20",
    status: "Returned",
  },
]

export default function BorrowingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredHistory = borrowingHistory.filter(
    (record) =>
      (record.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || record.status === statusFilter),
  )

  const statuses = ["All", ...new Set(borrowingHistory.map((record) => record.status))]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Borrowing History</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search borrowing history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrower
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrow Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHistory.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.borrower}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.borrowDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.returnDate || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === "Returned"
                        ? "bg-green-100 text-green-800"
                        : record.status === "Borrowed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.status}
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

