"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, TrendingUp, ClipboardList, Bell, Monitor, Wrench, AlertTriangle, Laptop, RockingChairIcon as Chair, SprayCanIcon as Spray, Utensils, CheckCircle, AlertOctagon, XCircle, BarChart4, PieChart, LineChart, Activity } from 'lucide-react'
import { Pie, Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js'
import { useTheme } from "next-themes"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title)

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

const inventoryData = {
  labels: ['Laptops', 'Furniture', 'Cleaning Materials', 'Utensils'],
  datasets: [
    {
      data: [30, 25, 20, 25],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
  ]
}

const itemConditionData = {
  labels: ['New', 'Good', 'Worn Out', 'Damaged'],
  datasets: [
    {
      label: 'Item Condition',
      data: [40, 35, 15, 10],
      backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336'],
    }
  ]
}

const borrowingStatusData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Borrowed Items',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#36A2EB',
      fill: false,
    },
    {
      label: 'Returned Items',
      data: [28, 48, 40, 19, 86, 27],
      borderColor: '#FF6384',
      fill: false,
    }
  ]
}

const mostBorrowedItemsData = {
  labels: ['Laptops', 'Chairs', 'Projectors', 'Whiteboards', 'Microphones'],
  datasets: [
    {
      label: 'Borrow Frequency',
      data: [150, 100, 80, 60, 40],
      backgroundColor: '#4BC0C0',
    }
  ]
}

const recentBorrowingActivity = [
  { borrower: "John Doe", item: "Laptop", expectedReturn: "2023-07-15", conditionBefore: "Good", conditionAfter: "Good" },
  { borrower: "Jane Smith", item: "Projector", expectedReturn: "2023-07-18", conditionBefore: "New", conditionAfter: "Good" },
  { borrower: "Mike Johnson", item: "Chair", expectedReturn: "2023-07-20", conditionBefore: "Worn Out", conditionAfter: "Damaged" },
]

const recentItemAdditions = [
  { item: "Dell XPS 15", category: "Laptop", condition: "New", addedDate: "2023-07-01" },
  { item: "Ergonomic Chair", category: "Furniture", condition: "New", addedDate: "2023-07-03" },
  { item: "Vacuum Cleaner", category: "Cleaning Materials", condition: "New", addedDate: "2023-07-05" },
]

const damagedItems = [
  { item: "HP Printer", reportedBy: "Alice Cooper", reason: "Paper jam caused internal damage", date: "2023-07-02" },
  { item: "Meeting Room Table", reportedBy: "Bob Marley", reason: "Surface scratched during relocation", date: "2023-07-04" },
]

export default function ProgramManagerDashboard() {
  const [timeframe, setTimeframe] = useState("Monthly")
  const [showConditionForm, setShowConditionForm] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: currentTheme === 'dark' ? '#e5e7eb' : '#374151',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: currentTheme === 'dark' ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: currentTheme === 'dark' ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  }

  if (!isMounted) {
    return null
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Program Manager Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            View asset conditions, assignments, and operational status.
          </motion.p>
        </div>
     
      </div>

      <motion.div 
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            variants={fadeInUp}
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
              <stat.icon className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className={stat.change.startsWith('+') ? "text-green-500" : "text-red-500"}>{stat.change}</span> from last month
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          variants={fadeInUp}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Inventory Overview</h2>
          <div className="h-64">
            <Pie data={inventoryData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          variants={fadeInUp}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Item Condition Report</h2>
          <div className="h-64">
            <Bar data={itemConditionData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          variants={fadeInUp}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Borrowing Status</h2>
          <div className="h-64">
            <Line data={borrowingStatusData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          variants={fadeInUp}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Most Borrowed Items</h2>
          <div className="h-64">
            <Bar data={mostBorrowedItemsData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        variants={fadeInUp}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Borrowing Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Borrower</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expected Return</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition Before</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition After</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentBorrowingActivity.map((activity, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{activity.borrower}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{activity.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{activity.expectedReturn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{activity.conditionBefore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{activity.conditionAfter}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div 
        className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 p-4 sm:p-6 rounded-lg"
        variants={fadeInUp}
      >
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Alerts & Notifications</h3>
            <p className="text-red-700 dark:text-red-300 mt-1">🔴 2 items are overdue!</p>
            <p className="text-red-700 dark:text-red-300">⚠️ Low stock alert: Only 2 brooms left!</p>
            <p className="text-red-700 dark:text-red-300">🔧 3 items marked for repair</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConditionForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}