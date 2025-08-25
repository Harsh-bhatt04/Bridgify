import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Compass, 
  Upload, 
  User, 
  PieChart, 
  Rocket, 
  MessageCircle, 
  X 
} from 'lucide-react'

const navItems = [
  { name: 'Feed', path: '/feed', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Upload Project', path: '/projectupload', icon: Upload },
  { name: 'My Profile', path: '/profile/johndoe', icon: User },
  { name: 'Dashboard', path: '/dashboard', icon: PieChart },
  { name: 'Startup Corner', path: '/startup-corner', icon: Rocket },
  { name: 'Community', path: '/community', icon: MessageCircle },
]

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 z-50 md:z-0 
                   border-r border-gray-200 dark:border-gray-800 w-64 md:w-56 lg:w-64
                   md:flex flex-col`}
        initial={false}
        animate={{ 
          x: open ? 0 : -320,
          transition: { type: 'tween' }
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="md:hidden p-4 flex justify-end">
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                          ${isActive ? 
                            'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 
                            'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-8 bg-primary-600 dark:bg-primary-400 rounded-r-full"
                  />
                )}
              </Link>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="card p-4">
            <h4 className="text-sm font-medium mb-2">Upload your project</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Share your work with the community and get feedback
            </p>
            <Link 
              to="/project/upload"
              onClick={() => setOpen(false)}
              className="btn btn-primary text-sm w-full flex justify-center"
            >
              <Upload size={16} className="mr-2" /> Upload
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
//update