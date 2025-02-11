"use client"

import { useState, useEffect } from "react"
import { BarChart, Users, Package, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { title: "Total Inventory", value: "1,234", icon: Package, change: "+5.2%", trend: "up" },
  { title: "Active Borrowers", value: "567", icon: Users, change: "+3.1%", trend: "up" },
  { title: "Overdue Items", value: "23", icon: AlertTriangle, change: "-2.5%", trend: "down" },
  { title: "Utilization Rate", value: "78%", icon: BarChart, change: "+1.2%", trend: "up" },
]

const recentActivity = [
  { type: "new", text: "New item added: Laptop X1", user: "John Doe", time: "2 hours ago" },
  { type: "return", text: "Item returned: Office Chair", user: "Jane Smith", time: "5 hours ago" },
  { type: "borrow", text: "Item borrowed: Projector", user: "Mike Johnson", time: "1 day ago" },
]

const inventoryStatus = [
  { category: "Electronics", percentage: 75 },
  { category: "Furniture", percentage: 60 },
  { category: "Office Supplies", percentage: 90 },
]

export default function ProgramManagerDashboard() {
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-900"
      >
        Dashboard Overview
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs md:text-sm text-gray-600 mt-1 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="text-green-500 mr-1 h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <ArrowDownRight className="text-red-500 mr-1 h-3 w-3 md:h-4 md:w-4" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span> from last
                month
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-4"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "new"
                        ? "bg-blue-600"
                        : activity.type === "return"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                    }`}
                  ></span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-600">
                      {activity.user} - {activity.time}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
            <div className="space-y-4">
              {inventoryStatus.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-end gap-4"
      >
        <div className="relative inline-block">
          <button
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            Export Report
          </button>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm">
              Download a detailed report of your inventory
              <svg
                className="absolute text-gray-900 h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xmlSpace="preserve"
              >
                <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
          )}
        </div>
        <button className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View All Items
        </button>
      </motion.div>
    </div>
  )
}

