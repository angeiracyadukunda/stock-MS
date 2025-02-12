'use client'

import React, { useState, useCallback } from 'react'
import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample data (replace with actual data fetching logic)
const initialUsers = [
  {
    id: 1,
    nationalId: "1234567890",
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    residence: "123 Main St, City",
    assurerName: "Jane Smith",
    assurerContact: "+0987654321",
    type: "Borrower"
  },
  {
    id: 2,
    nationalId: "0987654321",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "+1122334455",
    residence: "456 Elm St, Town",
    assurerName: "Bob Brown",
    assurerContact: "+5544332211",
    type: "Staff"
  },
  // Add more user data as needed
]

export default function BorrowersStaffTable() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nationalId.includes(searchTerm)
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handleView = useCallback((user: { fullName: any }) => {
    // Implement view logic here
    console.log('Viewing user:', user)
    alert(`Viewing ${user.fullName}'s details`)
  }, [])

  const handleEdit = useCallback((user: { fullName: any }) => {
    // Implement edit logic here
    console.log('Editing user:', user)
    alert(`Editing ${user.fullName}'s information`)
  }, [])

  const handleDelete = useCallback((userId: number) => {
    // Implement delete logic here
    console.log('Deleting user with ID:', userId)
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }, [])

  const changePage = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Borrowers & Staff</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or National ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">National ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Residence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assurer's Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assurer's Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.nationalId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.residence}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.assurerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.assurerContact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800" 
                      title="View"
                      onClick={() => handleView(user)}
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-800" 
                      title="Edit"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800" 
                      title="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}