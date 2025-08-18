import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

const MainLayout = ({ isDarkMode, toggleDarkMode }) => {
  const { isLoading } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout