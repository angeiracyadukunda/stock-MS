"use client"

import { useState } from "react"
import { Plus, Filter, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"

interface ConditionLog {
  id: string
  date: string
  condition: string
  type: "before" | "after"
}

interface InventoryItem {
  id: string
  name: string
  category: string
  status: "available" | "borrowed" | "damaged" | "disposed"
  assignedTo: string | null
  condition: string
  lastUpdated: string
  serialNumber: string
  conditionLogs: ConditionLog[]
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "INV001",
      name: "Dell XPS 15 Laptop",
      category: "Electronics",
      status: "available",
      assignedTo: "John Doe",
      condition: "Minor wear and tear",
      lastUpdated: "2024-02-10",
      serialNumber: "DELLXPS15-001",
      conditionLogs: [
        { id: "LOG001", date: "2024-02-01", condition: "New", type: "before" },
        { id: "LOG002", date: "2024-02-10", condition: "Minor wear and tear", type: "after" },
      ],
    },
    {
      id: "INV002",
      name: "Office Chair",
      category: "Furniture",
      status: "damaged",
      assignedTo: null,
      condition: "Broken armrest",
      lastUpdated: "2024-02-09",
      serialNumber: "OFFCHAIR-002",
      conditionLogs: [
        { id: "LOG003", date: "2024-01-15", condition: "Good condition", type: "before" },
        { id: "LOG004", date: "2024-02-09", condition: "Broken armrest", type: "after" },
      ],
    },
    {
      id: "INV003",
      name: "Projector",
      category: "Electronics",
      status: "borrowed",
      assignedTo: "Alice Smith",
      condition: "Good condition",
      lastUpdated: "2024-02-08",
      serialNumber: "PROJ-003",
      conditionLogs: [
        { id: "LOG005", date: "2024-02-01", condition: "Good condition", type: "before" },
        { id: "LOG006", date: "2024-02-08", condition: "Good condition", type: "after" },
      ],
    },
    {
      id: "INV004",
      name: "Printer",
      category: "Electronics",
      status: "disposed",
      assignedTo: null,
      condition: "Out of service",
      lastUpdated: "2024-02-07",
      serialNumber: "PRINT-004",
      conditionLogs: [
        { id: "LOG007", date: "2024-01-01", condition: "Working condition", type: "before" },
        { id: "LOG008", date: "2024-02-07", condition: "Out of service", type: "after" },
      ],
    },
  ])

  const [filter, setFilter] = useState<"all" | "available" | "borrowed" | "damaged" | "disposed">("all")
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false)
  const [newConditionLog, setNewConditionLog] = useState<Omit<ConditionLog, "id">>({
    date: new Date().toISOString().split("T")[0],
    condition: "",
    type: "after",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "borrowed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "damaged":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "disposed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const filteredItems = filter === "all" ? items : items.filter((item) => item.status === filter)

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setIsEditModalOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleAddConditionLog = (itemId: string) => {
    setEditingItem(items.find((item) => item.id === itemId) || null)
    setIsConditionModalOpen(true)
  }

  const handleSaveConditionLog = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        conditionLogs: [...editingItem.conditionLogs, { ...newConditionLog, id: `LOG${Date.now()}` }],
        condition: newConditionLog.condition,
        lastUpdated: newConditionLog.date,
      }
      handleUpdateItem(updatedItem)
      setIsConditionModalOpen(false)
      setNewConditionLog({
        date: new Date().toISOString().split("T")[0],
        condition: "",
        type: "after",
      })
    }
  }

  const handleViewItem = (id: string) => {
    // Implement view functionality (e.g., navigate to a details page)
    console.log(`Viewing item with id: ${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <Link href="/admin-dashboard/add-item">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6B4BFF] text-white rounded-lg hover:bg-[#5B3FE6] transition-colors">
            <Plus className="h-5 w-5" />
            Add New Item
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <select
                className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]"
                onChange={(e) => setFilter(e.target.value as any)}
                value={filter}
              >
                <option value="all">All Items</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="damaged">Damaged</option>
                <option value="disposed">Disposed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto  ">
          <table className="w-full ">
            <thead className="bg-gray-50  ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
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
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.serialNumber}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="text-sm capitalize">{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleViewItem(item.id)} className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleEditItem(item)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Item Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdateItem(editingItem)
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="damaged">Damaged</option>
                    <option value="disposed">Disposed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                  <input
                    type="text"
                    value={editingItem.assignedTo || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, assignedTo: e.target.value || null })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <input
                    type="text"
                    value={editingItem.condition}
                    onChange={(e) => setEditingItem({ ...editingItem, condition: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Condition Log Modal */}
      {isConditionModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Condition Log</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveConditionLog()
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newConditionLog.date}
                    onChange={(e) => setNewConditionLog({ ...newConditionLog, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <textarea
                    value={newConditionLog.condition}
                    onChange={(e) => setNewConditionLog({ ...newConditionLog, condition: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newConditionLog.type}
                    onChange={(e) =>
                      setNewConditionLog({ ...newConditionLog, type: e.target.value as "before" | "after" })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="before">Before Use</option>
                    <option value="after">After Use</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsConditionModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Condition Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

