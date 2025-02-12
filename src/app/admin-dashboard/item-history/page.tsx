"use client"

import { useState } from "react"
import { Eye, ChevronDown, ChevronUp } from "lucide-react"

interface ItemHistoryEntry {
  id: string
  itemName: string
  borrowerName: string
  borrowedDate: string
  returnedDate: string
  conditionBefore: string
  conditionAfter: string
}

interface ItemFullHistory {
  id: string
  itemName: string
  history: ItemHistoryEntry[]
}

export default function ItemHistoryPage() {
  const [itemHistories, setItemHistories] = useState<ItemFullHistory[]>([
    {
      id: "ITEM001",
      itemName: "Dell XPS 15 Laptop",
      history: [
        {
          id: "HIST001",
          itemName: "Dell XPS 15 Laptop",
          borrowerName: "John Doe",
          borrowedDate: "2024-01-15",
          returnedDate: "2024-01-30",
          conditionBefore: "Excellent",
          conditionAfter: "Minor scratches on the lid",
        },
        {
          id: "HIST002",
          itemName: "Dell XPS 15 Laptop",
          borrowerName: "Jane Smith",
          borrowedDate: "2024-02-05",
          returnedDate: "2024-02-20",
          conditionBefore: "Minor scratches on the lid",
          conditionAfter: "Minor scratches on the lid, slight wear on keyboard",
        },
      ],
    },
    {
      id: "ITEM002",
      itemName: "Projector",
      history: [
        {
          id: "HIST003",
          itemName: "Projector",
          borrowerName: "Alice Johnson",
          borrowedDate: "2024-01-10",
          returnedDate: "2024-01-12",
          conditionBefore: "Good",
          conditionAfter: "Good",
        },
      ],
    },
  ])

  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const handleViewDetails = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Item History</h1>

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
                  Borrowed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returned Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition Before Use
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition After Use
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemHistories.map((item) => (
                <>
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.history[0].borrowerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.history[0].borrowedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.history[0].returnedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.history[0].conditionBefore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.history[0].conditionAfter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="h-5 w-5 mr-1" />
                        View Details
                        {expandedItem === item.id ? (
                          <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedItem === item.id && (
                    <tr>
                      <td colSpan={7}>
                        <div className="px-6 py-4 bg-gray-50">
                          <h4 className="text-lg font-semibold mb-2">Full History</h4>
                          <ul className="space-y-4">
                            {item.history.map((entry, index) => (
                              <li key={entry.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <p className="font-semibold">Usage #{index + 1}</p>
                                <p>Borrower: {entry.borrowerName}</p>
                                <p>Borrowed: {entry.borrowedDate}</p>
                                <p>Returned: {entry.returnedDate}</p>
                                <p>Condition Before: {entry.conditionBefore}</p>
                                <p>Condition After: {entry.conditionAfter}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

