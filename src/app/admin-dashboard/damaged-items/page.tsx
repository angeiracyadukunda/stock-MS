"use client"

import { useState } from "react"
import { Eye, Edit, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface DamagedItem {
  id: string
  itemName: string
  dateReported: string
  reportedBy: string
  damageDescription: string
  status: "Under Repair" | "Disposed" | "Fixed"
}

export default function DamagedItemsPage() {
  const [damagedItems, setDamagedItems] = useState<DamagedItem[]>([
    {
      id: "DAM001",
      itemName: "Dell XPS 15 Laptop",
      dateReported: "2024-02-15",
      reportedBy: "John Doe",
      damageDescription: "Screen cracked, keyboard not responding",
      status: "Under Repair",
    },
    {
      id: "DAM002",
      itemName: "Office Chair",
      dateReported: "2024-02-10",
      reportedBy: "Jane Smith",
      damageDescription: "Broken armrest, wheel missing",
      status: "Disposed",
    },
    {
      id: "DAM003",
      itemName: "Projector",
      dateReported: "2024-02-18",
      reportedBy: "Alice Johnson",
      damageDescription: "Lamp burnt out",
      status: "Fixed",
    },
  ])

  const [viewItem, setViewItem] = useState<DamagedItem | null>(null)
  const [editItem, setEditItem] = useState<DamagedItem | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Repair":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "Disposed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "Fixed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const handleView = (item: DamagedItem) => {
    setViewItem(item)
  }

  const handleEdit = (item: DamagedItem) => {
    setEditItem(item)
  }

  const handleUpdateStatus = (id: string, newStatus: DamagedItem["status"]) => {
    setDamagedItems(damagedItems.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    setEditItem(null)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Damaged Items</h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Reported
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Damage Description
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
              {damagedItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateReported}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reportedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.damageDescription}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2">{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-4">
                      <Eye className="h-5 w-5 inline-block mr-1" />
                      View
                    </button>
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5 inline-block mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Damage Report Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  <strong>Item:</strong> {viewItem.itemName}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date Reported:</strong> {viewItem.dateReported}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Reported By:</strong> {viewItem.reportedBy}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Damage Description:</strong> {viewItem.damageDescription}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {viewItem.status}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setViewItem(null)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Update Item Status</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  <strong>Item:</strong> {editItem.itemName}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Current Status:</strong> {editItem.status}
                </p>
                <div className="mt-4">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    New Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue={editItem.status}
                    onChange={(e) => handleUpdateStatus(editItem.id, e.target.value as DamagedItem["status"])}
                  >
                    <option value="Under Repair">Under Repair</option>
                    <option value="Disposed">Disposed</option>
                    <option value="Fixed">Fixed</option>
                  </select>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

