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

  // Mock data
  const projects = {
    overview: [
      {
        id: 1,
        title: "SmartHub",
        description: "A social platform for developers to showcase their projects",
        techStack: ["React", "Node.js", "MongoDB"],
        status: "Open to Collaborate",
        upvotes: 42,
        views: 1200,
        comments: 15
      },
      {
        id: 2,
        title: "AI Assistant",
        description: "An AI-powered personal assistant",
        techStack: ["Python", "TensorFlow", "React"],
        status: "Showcase Only",
        upvotes: 28,
        views: 850,
        comments: 8
      },
      {
        id: 3,
        title: "DevConnect",
        description: "Developer networking platform",
        techStack: ["Vue.js", "Firebase"],
        status: "In Progress",
        upvotes: 12,
        views: 320,
        comments: 5
      },
      {
        id: 4,
        title: "CodeCollab",
        description: "Real-time collaborative code editor",
        techStack: ["React", "Socket.io"],
        status: "Open Source",
        upvotes: 156,
        views: 2400,
        comments: 32
      }
    ]
  }

  return (
    <AppProvider>
      <ProjectProvider>
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
                  <Route path="/startup-ideas" element={<StartupIdeas />} />
                  <Route path="/community" element={<CommunityPage />} />
                </Route>
                </Route>
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </ProjectProvider>
    </AppProvider>
  )
}

export default App
//update