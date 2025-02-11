"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import type React from "react" // Added import for React

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactorAuth: false,
    language: "en",
    theme: "light",
  })

  const handleChange = (name: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notifications}
              onChange={(e) => handleChange("notifications", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="text-gray-700">
              Enable email notifications
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleChange("twoFactorAuth", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="twoFactorAuth" className="text-gray-700">
              Enable two-factor authentication
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <div className="mt-2 space-y-2">
                {["light", "dark", "system"].map((themeOption) => (
                  <div key={themeOption} className="flex items-center">
                    <input
                      id={themeOption}
                      name="theme"
                      type="radio"
                      checked={settings.theme === themeOption}
                      onChange={() => handleChange("theme", themeOption)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={themeOption} className="ml-3 block text-sm font-medium text-gray-700 capitalize">
                      {themeOption}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}

