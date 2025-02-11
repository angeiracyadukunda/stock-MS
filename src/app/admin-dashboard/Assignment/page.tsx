'use client'

import { useState } from 'react'
import { Plus, Search, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'

interface Assignment {
  id: string
  itemId: string
  itemName: string
  assignedTo: string
  department: string
  assignedDate: string
  returnDate: string | null
  status: 'active' | 'returned' | 'overdue'
}

export default function ItemAssignmentPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "ASN001",
      itemId: "INV001",
      itemName: "Dell XPS 15 Laptop",
      assignedTo: "John Doe",
      department: "IT",
      assignedDate: "2024-01-15",
      returnDate: null,
      status: "active"
    },
    {
      id: "ASN002",
      itemId: "INV003",
      itemName: "Projector",
      assignedTo: "Marketing Team",
      department: "Marketing",
      assignedDate: "2024-02-01",
      returnDate: "2024-02-15",
      status: "returned"
    },
    {
      id: "ASN003",
      itemId: "INV005",
      itemName: "Industrial Printer",
      assignedTo: "Print Room",
      department: "Operations",
      assignedDate: "2024-01-01",
      returnDate: null,
      status: "active"
    },
    {
      id: "ASN004",
      itemId: "INV002",
      itemName: "Office Chair",
      assignedTo: "Jane Smith",
      department: "HR",
      assignedDate: "2024-01-20",
      returnDate: null,
      status: "overdue"
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Assign Items to Employees/Trainees</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#6B4BFF] text-white rounded-lg hover:bg-[#5B3FE6] transition-colors">
          <Plus className="h-5 w-5" />
          Assign New Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.assignedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.returnDate || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button className="p-1 hover:text-[#6B4BFF] transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:text-gray-900 transition-colors">
                      <MoreVertical className="h-4 w-4" />
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
