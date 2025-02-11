"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Package,
  LayoutGrid,
  Box,
  FileText,
  ClipboardList,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/program-manager-dashboard" },
  { icon: Box, label: "Inventory", href: "/program-manager-dashboard/inventory" },
  { icon: ClipboardList, label: "Borrowing History", href: "/program-manager-dashboard/borrowing" },
  { icon: FileText, label: "Reports", href: "/program-manager-dashboard/reports" },
]

export default function ProgramManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSidebarOpen(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        } ${isMobile ? "fixed inset-y-0 left-0 z-50 overflow-hidden" : ""}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-800">Stock Control</span>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-[#6B4BFF] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 w-full transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 transition-colors md:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search inventory..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <img src="https://v0.dev/placeholder-user.jpg" alt="Admin" className="w-8 h-8 rounded-full" />
                <span className="hidden md:inline">ProgramManager</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

