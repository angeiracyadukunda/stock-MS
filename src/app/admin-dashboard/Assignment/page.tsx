"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, X } from "lucide-react"

interface Assignment {
  id: string
  itemId: string
  itemName: string
  assignedTo: string
  department: string
  assignedDate: string
  returnDate: string | null
  status: "active" | "returned" | "overdue"
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
      status: "active",
    },
    {
      id: "ASN002",
      itemId: "INV003",
      itemName: "Projector",
      assignedTo: "Marketing Team",
      department: "Marketing",
      assignedDate: "2024-02-01",
      returnDate: "2024-02-15",
      status: "returned",
    },
    {
      id: "ASN003",
      itemId: "INV005",
      itemName: "Industrial Printer",
      assignedTo: "Print Room",
      department: "Operations",
      assignedDate: "2024-01-01",
      returnDate: null,
      status: "active",
    },
    {
      id: "ASN004",
      itemId: "INV002",
      itemName: "Office Chair",
      assignedTo: "Jane Smith",
      department: "HR",
      assignedDate: "2024-01-20",
      returnDate: null,
      status: "overdue",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, "id">>({
    itemId: "",
    itemName: "",
    assignedTo: "",
    department: "",
    assignedDate: new Date().toISOString().split("T")[0],
    returnDate: null,
    status: "active",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (isEditMode && editingAssignment) {
      setEditingAssignment({ ...editingAssignment, [name]: value })
    } else {
      setNewAssignment((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode && editingAssignment) {
      setAssignments(assignments.map((a) => (a.id === editingAssignment.id ? editingAssignment : a)))
      setIsEditMode(false)
      setEditingAssignment(null)
    } else {
      const newId = `ASN${(assignments.length + 1).toString().padStart(3, "0")}`
      const assignmentToAdd = { ...newAssignment, id: newId }
      setAssignments((prev) => [...prev, assignmentToAdd])
    }
    setIsModalOpen(false)
    setNewAssignment({
      itemId: "",
      itemName: "",
      assignedTo: "",
      department: "",
      assignedDate: new Date().toISOString().split("T")[0],
      returnDate: null,
      status: "active",
    })
  }

  const handleEdit = (assignment: Assignment) => {
    setIsEditMode(true)
    setEditingAssignment(assignment)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter((a) => a.id !== id))
    }
  }

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    if (isModalOpen && isEditMode && editingAssignment) {
      setNewAssignment(editingAssignment)
    }
  }, [isModalOpen, isEditMode, editingAssignment])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Assign Items to Employees/Trainees</h1>
        <button
          onClick={() => {
            setIsEditMode(false)
            setEditingAssignment(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#6B4BFF] text-white rounded-lg hover:bg-[#5B3FE6] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Assign New Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF] text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.assignedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{assignment.returnDate || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignment.status === "active"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "returned"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="p-1 hover:text-[#6B4BFF] transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="p-1 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditMode ? "Edit Assignment" : "Assign New Item"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                  Item ID
                </label>
                <input
                  type="text"
                  id="itemId"
                  name="itemId"
                  value={isEditMode ? editingAssignment?.itemId : newAssignment.itemId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={isEditMode ? editingAssignment?.itemName : newAssignment.itemName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  value={isEditMode ? editingAssignment?.assignedTo : newAssignment.assignedTo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={isEditMode ? editingAssignment?.department : newAssignment.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="assignedDate" className="block text-sm font-medium text-gray-700">
                  Assigned Date
                </label>
                <input
                  type="date"
                  id="assignedDate"
                  name="assignedDate"
                  value={isEditMode ? editingAssignment?.assignedDate : newAssignment.assignedDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={isEditMode ? editingAssignment?.returnDate || "" : newAssignment.returnDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={isEditMode ? editingAssignment?.status : newAssignment.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-base"
                  required
                >
                  <option value="active">Active</option>
                  <option value="returned">Returned</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isEditMode ? "Update Assignment" : "Assign Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

