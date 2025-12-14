import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp as Trending, Clock, Filter } from 'lucide-react'
import ProjectCard from '../components/project/ProjectCard'
import { useProjects } from '../context/ProjectContext'

// Dummy data for projects
const projectsData = [
  {
    id: 1,
    title: 'React Productivity Dashboard',
    description: 'A fully-featured dashboard for tracking productivity metrics with analytics and goal setting. Built with React and Chart.js.',
    posted: '2 days ago',
    image: 'https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Dashboard&font=montserrat',
    status: 'Open',
    techStack: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    githubUrl: 'https://github.com/username/project',
    demoUrl: 'https://demo-url.com',
    likes: 42,
    comments: 12,
    author: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: 2,
    title: 'AI Powered Task Management App',
    description: 'Task management application that uses AI to prioritize and schedule your tasks for maximum productivity.',
    posted: '5 hours ago',
    status: 'Startup Ready',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/username/project',
    demoUrl: 'https://demo-url.com',
    likes: 128,
    comments: 31,
    author: {
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  },
  {
    id: 3,
    title: 'Dev Portfolio Template',
    description: 'A customizable portfolio template specially designed for developers to showcase their skills and projects.',
    posted: '1 week ago',
    image: 'https://placehold.co/600x400/6d28d9/FFFFFF/png?text=Portfolio&font=montserrat',
    status: 'Showcase Only',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    githubUrl: 'https://github.com/username/project',
    demoUrl: 'https://demo-url.com',
    likes: 76,
    comments: 8,
    author: {
      name: 'Sarah Chen',
      username: 'sarahc',
      avatar: 'https://i.pravatar.cc/150?img=10'
    }
  }
]

const Feed = () => {
  const [activeTab, setActiveTab] = useState('trending')
  const [showFilters, setShowFilters] = useState(false)

  const {projects,loading,error} = useProjects()
  console.log(projects)

  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Feed</h1>
        
        <button 
          className="btn btn-outline text-sm flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="card p-4 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="input">
                  <option value="">All Statuses</option>
                  <option value="open">Open to Collaborate</option>
                  <option value="showcase">Showcase Only</option>
                  <option value="startup">Startup Ready</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack</label>
                <select className="input">
                  <option value="">All Technologies</option>
                  <option value="react">React</option>
                  <option value="nodejs">Node.js</option>
                  <option value="python">Python</option>
                  <option value="flutter">Flutter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time Period</label>
                <select className="input">
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
            activeTab === 'trending'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
          onClick={() => setActiveTab('trending')}
        >
          <Trending size={16} />
          <span>Trending</span>
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
            activeTab === 'recent'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
          onClick={() => setActiveTab('recent')}
        >
          <Clock size={16} />
          <span>Recent</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Feed




