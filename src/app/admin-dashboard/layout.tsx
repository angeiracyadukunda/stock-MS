"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Package, Users, Settings, Bell, ChevronDown, Search, BarChart, LogOut, Activity, ListChecks, Menu, Briefcase, Clock, AlertTriangle, Moon, Sun, User } from 'lucide-react'
import type React from "react"

const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/admin-dashboard" },
    { icon: Package, label: "Inventory", href: "/admin-dashboard/inventory" },
    { icon: Users, label: "Users", href: "/admin-dashboard/users" },
    { icon: Briefcase, label: "Borrowed Items", href: "/admin-dashboard/borrowed-items" },
    { icon: Clock, label: "Item History", href: "/admin-dashboard/item-history" },
    { icon: User, label: "Borrowers", href: "/admin-dashboard/borrowers" },
    { icon: AlertTriangle, label: "Damaged items", href: "/admin-dashboard/damaged-items" },
    { icon: ListChecks, label: "Assignments and Tracking", href: "/admin-dashboard/Assignment" },
    { icon: BarChart, label: "Reports", href: "/admin-dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" },
]

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarOpen(true)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        // Check for dark mode preference in local storage
        const darkModePreference = localStorage.getItem('darkMode')
        setIsDarkMode(darkModePreference === 'true')

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        // Apply dark mode to the document
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        // Save preference to local storage
        localStorage.setItem('darkMode', isDarkMode.toString())
    }, [isDarkMode])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <aside
                className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"
                    } ${isMobile ? "absolute z-10 h-full" : ""}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <Package className="h-6 w-6 text-[#6B4BFF]" />
                        {isSidebarOpen && <span className="font-semibold text-gray-800 dark:text-white">Stock Control</span>}
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.href
                                                ? "bg-[#6B4BFF] text-white"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-[#6B4BFF]/5 hover:text-[#6B4BFF] dark:hover:bg-[#6B4BFF]/20 dark:hover:text-[#8B6FFF]"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {isSidebarOpen && <span>{item.label}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 w-full transition-colors">
                            <LogOut className="h-5 w-5" />
                            {isSidebarOpen && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300 hover:text-[#6B4BFF] dark:hover:text-[#8B6FFF] transition-colors">
                                <Menu className="h-6 w-6" />
                            </button>
                            <div className="flex-1 max-w-2xl">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="search"
                                        placeholder="Search inventory..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4BFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={toggleDarkMode} className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#6B4BFF] dark:hover:text-[#8B6FFF] transition-colors">
                                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#6B4BFF] dark:hover:text-[#8B6FFF] transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                                <img src="https://v0.dev/placeholder-user.jpg" alt="Admin" className="w-8 h-8 rounded-full" />
                                <span className="hidden md:inline">Admin</span>
                                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-6">{children}</div>
            </main>
        </div>
    )
}