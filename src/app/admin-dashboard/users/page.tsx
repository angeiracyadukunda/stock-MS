"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Edit, Trash2, X } from "lucide-react"
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-02-10 09:30 AM",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Manager",
      status: "active",
      lastLogin: "2024-02-09 02:15 PM",
    },
    {
      id: "USR003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "User",
      status: "inactive",
      lastLogin: "2024-01-30 11:45 AM",
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null,
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser])
    setIsAddModalOpen(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditModalOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setDeleteConfirmation({ isOpen: true, userId })
  }

  const confirmDelete = () => {
    if (deleteConfirmation.userId) {
      setUsers(users.filter((user) => user.id !== deleteConfirmation.userId))
      setDeleteConfirmation({ isOpen: false, userId: null })
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#6B4BFF] text-white rounded-lg hover:bg-[#5B3FE6] transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Add New User
        </button>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <UserModal onClose={() => setIsAddModalOpen(false)} onSave={handleAddUser} title="Add New User" />
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <UserModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditUser}
          title="Edit User"
          user={editingUser}
        />
      )}

      {deleteConfirmation.isOpen && (
        <DeleteConfirmationModal
          onClose={() => setDeleteConfirmation({ isOpen: false, userId: null })}
          onConfirm={confirmDelete}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF]">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["User ID", "Name", "Email", "Role", "Status", "Last Login", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-1 hover:text-[#6B4BFF] transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="p-1 hover:text-gray-900 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
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

interface UserModalProps {
  onClose: () => void
  onSave: (user: User) => void
  title: string
  user?: User
}

function UserModal({ onClose, onSave, title, user }: UserModalProps) {
  const [formData, setFormData] = useState<User>(
    user || {
      id: `USR${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: "",
      email: "",
      role: "User",
      status: "active",
      lastLogin: new Date().toLocaleString(),
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <select
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
          <select
            className="w-full p-2 border rounded"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit" className="w-full p-2 bg-[#6B4BFF] text-white rounded hover:bg-[#5B3FE6]">
            Save User
          </button>
        </form>
      </div>
    </div>
  )
}

