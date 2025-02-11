"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, TrendingUp, ClipboardList, Bell, Monitor, Wrench } from "lucide-react"

const categories = [
  { name: "Equipment Health", value: 89, items: "Operational Units", growth: 3.2, color: "bg-green-500" },
  { name: "Maintenance Requests", value: 24, items: "Pending Repairs", growth: 5.1, color: "bg-yellow-500" },
  { name: "Inspections Completed", value: 157, items: "Last Month", growth: 4.7, color: "bg-blue-500" },
]

const stats = [
  { title: "Condition Reports", value: "47", icon: Monitor, change: "+15.4%" },
  { title: "Assignments in Progress", value: "12", icon: ClipboardList, change: "+8.2%" },
  { title: "Alerts & Notifications", value: "9", icon: Bell, change: "-2.5%" },
]

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("Monthly")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Monitor asset conditions, assignments, and operational status.
          </p>
        </div>
        <Link
          href="/admin-dashboard/add-condition"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <Plus className="h-4 w-4" /> Log Condition Report
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <stat.icon className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500">{stat.change}</span> from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div key={index} className={`${category.color} text-white p-4 sm:p-6 rounded-lg shadow-sm`}>
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">{category.name}</h3>
            <p className="text-2xl sm:text-3xl font-bold mb-1">{category.value}</p>
            <p className="text-xs sm:text-sm opacity-80">{category.items}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">+{category.growth}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Performance Trends</h2>
          <div className="flex justify-end mb-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-sm"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="h-[200px] flex items-center justify-center text-gray-500 text-sm sm:text-base">
            Chart will be implemented here
          </div>
        </div>

        <div className="bg-purple-500 text-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Asset Condition</h2>
            <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <p className="text-4xl sm:text-6xl font-bold mb-2">92%</p>
          <p className="text-sm sm:text-base opacity-80">Assets in optimal condition</p>
        </div>
      </div>
    </div>
  )
}

