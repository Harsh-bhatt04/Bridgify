import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  MessageSquare, 
  Menu, 
  User,
  LogOut
} from 'lucide-react'

const Navbar = ({ isDarkMode, toggleDarkMode, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?img=8'
  }

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/')
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          
          <Link to="/feed" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
              <Code size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Brigify
            </span>
          </Link>


        </div>

        {/* Search bar */}
        {/* <div className="hidden md:flex relative flex-1 max-w-md mx-6">
          <input 
            type="text" 
            placeholder="Search projects, developers..." 
            className="input pl-10 py-1.5 text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> */}

        {/* Right nav items */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <Link to="/messages" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <MessageSquare size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Link>

          <Link to="/notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              5
            </span>
          </Link>

          {/* User avatar with dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>

            {showUserMenu && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
                
                <Link 
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Code size={16} />
                  <span>Dashboard</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar