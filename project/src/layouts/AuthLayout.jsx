import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 flex flex-col">
      <header className="py-4 px-6">
        <Link to="/" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-xl">
          <LogIn size={24} />
          <span>Brigify</span>
        </Link>
      </header>
      
      <motion.main 
        className="flex-1 flex items-center justify-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  )
}

export default AuthLayout
//update