import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import { ProjectProvider } from './context/ProjectContext'
import Sidebar from './components/Sidebar'
import Notification from './components/Notification'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute';

// Pages
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Feed from './pages/Feed'
import ExplorePage from './pages/Explore'
import ProjectUpload from './pages/ProjectUpload'
import ProjectView from './pages/ProjectView'
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard'
import StartupCorner from './pages/StartupCorner'
import CommunityPage from './pages/Community'
import StartupIdeas from './pages/StartupIdeas'
import VerifyOtp from './pages/auth/VerifyOtp'
import UpgradePlans from './pages/upgrade'
import Messages from './pages/message'  
import Notify from './pages/notify'
import JobBoard from './pages/jobboard'
import Support from './pages/support' 
import Setting from './pages/setting'



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check user's preferred color scheme or saved preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <ProjectProvider>
    <AppProvider>
      
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Notification />
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
                
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verify-otp" element={<VerifyOtp />} />
                </Route>
                
                {/* Main App Routes */}
                
                <Route element={<MainLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/project/upload" element={<ProjectUpload />} />
                  <Route path="/project/:id" element={<ProjectView />} />
                  <Route path="/profile/:username" element={<UserProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='/upgrade' element={<UpgradePlans />} />
                  <Route path="/startup-ideas" element={<StartupIdeas />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/notifications" element={<Notify />} />
                  <Route path="/jobs" element={<JobBoard />} />
                  <Route path="/support" element={<Support />} /> 
                  <Route path="/projects" element={<StartupIdeas />} />
                  <Route path="/settings" element={<Setting />} />
                </Route>
                </Route>
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
        </AppProvider>
      </ProjectProvider>
  )
}

export default App
//update