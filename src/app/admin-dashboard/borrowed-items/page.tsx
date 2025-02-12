"use client"

import { useState } from "react"
import { Eye, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface BorrowedItem {
  id: string
  itemName: string
  borrowerName: string
  borrowerContact: string
  borrowedDate: string
  expectedReturnDate: string
  status: "Returned" | "Overdue" | "Pending"
}

export default function BorrowedItemsPage() {
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([
    {
      id: "BOR001",
      itemName: "Dell XPS 15 Laptop",
      borrowerName: "John Doe",
      borrowerContact: "john.doe@example.com",
      borrowedDate: "2024-02-01",
      expectedReturnDate: "2024-02-15",
      status: "Overdue",
    },
    {
      id: "BOR002",
      itemName: "Projector",
      borrowerName: "Jane Smith",
      borrowerContact: "jane.smith@example.com",
      borrowedDate: "2024-02-10",
      expectedReturnDate: "2024-02-17",
      status: "Pending",
    },
    {
      id: "BOR003",
      itemName: "Office Chair",
      borrowerName: "Bob Johnson",
      borrowerContact: "bob.johnson@example.com",
      borrowedDate: "2024-01-20",
      expectedReturnDate: "2024-02-03",
      status: "Returned",
    },
  ])

  const [detailsItem, setDetailsItem] = useState<BorrowedItem | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Returned":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const handleMarkAsReturned = (id: string) => {
    setBorrowedItems(borrowedItems.map((item) => (item.id === id ? { ...item, status: "Returned" } : item)))
  }

  const handleViewDetails = (item: BorrowedItem) => {
    setDetailsItem(item)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Borrowed Items</h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrower Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrower Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrowed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Return Date
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
              {borrowedItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.borrowerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.borrowerContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.borrowedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.expectedReturnDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2">{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleMarkAsReturned(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      disabled={item.status === "Returned"}
                    >
                      Mark as Returned
                    </button>
                    <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-5 w-5 inline-block" />
                      <span className="ml-1">View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detailsItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Borrower Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  <strong>Name:</strong> {detailsItem.borrowerName}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Contact:</strong> {detailsItem.borrowerContact}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Item:</strong> {detailsItem.itemName}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Borrowed Date:</strong> {detailsItem.borrowedDate}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Expected Return:</strong> {detailsItem.expectedReturnDate}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {detailsItem.status}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setDetailsItem(null)}
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

