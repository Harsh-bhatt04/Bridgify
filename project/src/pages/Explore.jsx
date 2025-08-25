import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import ProjectCard from '../components/project/ProjectCard'

// Reuse dummy data from Feed page
const projectsData = [
  {
    id: 1,
    title: 'React Productivity Dashboard',
    description: 'A fully-featured dashboard for tracking productivity metrics with analytics and goal setting.',
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
  },
  {
    id: 4,
    title: 'E-commerce Platform with Cryptocurrency Payments',
    description: 'A complete e-commerce solution that accepts various cryptocurrencies with real-time price conversion.',
    posted: '3 days ago',
    status: 'Startup Ready',
    techStack: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Web3.js'],
    githubUrl: 'https://github.com/username/project',
    demoUrl: 'https://demo-url.com',
    likes: 93,
    comments: 27,
    author: {
      name: 'Michael Torres',
      username: 'miketorres',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  }
]

const techCategories = [
  'All',
  'Frontend',
  'Backend',
  'Mobile',
  'AI/ML',
  'Blockchain',
  'DevOps',
  'Full Stack'
]

const projectStatuses = [
  { value: 'all', label: 'All Projects' },
  { value: 'open', label: 'Open to Collaborate' },
  { value: 'showcase', label: 'Showcase Only' },
  { value: 'startup', label: 'Startup Ready' }
]

const sortOptions = [
  { value: 'popular', label: 'Most Popular', sortFn: (a, b) => b.likes - a.likes },
  { value: 'recent', label: 'Most Recent', sortFn: (a, b) => new Date(b.posted) - new Date(a.posted) },
  { value: 'trending', label: 'Trending', sortFn: (a, b) => (b.likes + b.comments) - (a.likes + a.comments) }
]

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [statusFilter, setStatusFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)

  // Tech stack categories mapping
  const techStackCategories = {
    Frontend: ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
    Backend: ['Node.js', 'Express', 'MongoDB', 'Firebase'],
    Mobile: ['React Native', 'Flutter', 'iOS', 'Android'],
    'AI/ML': ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API'],
    Blockchain: ['Web3.js', 'Solidity', 'Ethereum'],
    DevOps: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    'Full Stack': ['MERN', 'MEAN', 'Full Stack']
  }

  // Filter and sort projects based on all criteria
  const filterAndSortProjects = useMemo(() => {
    let result = [...projectsData]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(project =>
        project.techStack.some(tech => 
          techStackCategories[activeCategory]?.includes(tech)
        )
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(project => {
        const status = project.status.toLowerCase()
        switch (statusFilter) {
          case 'open':
            return status.includes('open')
          case 'showcase':
            return status.includes('showcase')
          case 'startup':
            return status.includes('startup')
          default:
            return true
        }
      })
    }

    // Sort
    const selectedSort = sortOptions.find(option => option.value === sortBy)
    if (selectedSort) {
      result.sort(selectedSort.sortFn)
    }

    return result
  }, [searchQuery, activeCategory, statusFilter, sortBy])

  // Update filtered projects when filters or sort changes
  useEffect(() => {
    setFilteredProjects(filterAndSortProjects)
  }, [filterAndSortProjects])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by the useMemo hook
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Explore Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing projects from developers around the world
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="input pl-10 pr-4 py-2 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </form>
      </div>
      
      {/* Category Filters */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {techCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            className="input py-1 text-sm w-40"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gray-500" />
            <select 
              className="input py-1 text-sm w-40"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {projectStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              className={`p-1.5 rounded ${
                viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
              }`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={`p-1.5 rounded ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
              }`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              viewMode={viewMode}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No projects found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
//update