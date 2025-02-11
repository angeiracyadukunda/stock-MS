'use client'

import { useState } from 'react'
import { Plus, Filter, MoreVertical, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface InventoryItem {
    id: string
    name: string
    category: string
    status: 'available' | 'borrowed' | 'damaged' | 'disposed'
    assignedTo: string | null
    condition: string
    lastUpdated: string
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
            lastUpdated: "2024-02-10"
        },
        {
            id: "INV002",
            name: "Office Chair",
            category: "Furniture",
            status: "damaged",
            assignedTo: null,
            condition: "Broken armrest",
            lastUpdated: "2024-02-09"
        },
        {
            id: "INV003",
            name: "Projector",
            category: "Electronics",
            status: "borrowed",
            assignedTo: "Alice Smith",
            condition: "Good condition",
            lastUpdated: "2024-02-08"
        },
        {
            id: "INV004",
            name: "Printer",
            category: "Electronics",
            status: "disposed",
            assignedTo: null,
            condition: "Out of service",
            lastUpdated: "2024-02-07"
        }
    ])

    const [filter, setFilter] = useState<'all' | 'available' | 'borrowed' | 'damaged' | 'disposed'>('all')

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'available':
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case 'borrowed':
                return <CheckCircle className="h-5 w-5 text-blue-500" />
            case 'damaged':
                return <AlertCircle className="h-5 w-5 text-orange-500" />
            case 'disposed':
                return <XCircle className="h-5 w-5 text-red-500" />
            default:
                return null
        }
    }

    const filteredItems = filter === 'all' ? items : items.filter(item => item.status === filter)

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

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {getStatusIcon(item.status)}
                                        <span className="text-sm capitalize">{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.assignedTo || '-'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.condition}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.lastUpdated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
