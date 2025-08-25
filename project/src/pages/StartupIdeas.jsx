import { useState } from 'react'
import { 
  Heart,
  MessageSquare,
  Share2,
  BookmarkPlus,
  Bookmark,
  TrendingUp,
  Zap,
  Target,
  Users,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock startup ideas data
const startupIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Learning Assistant",
    description: "An AI tutor that adapts to individual learning styles and creates personalized curriculum paths for students.",
    category: "Education",
    problemStatement: "Traditional education struggles to provide personalized attention to each student.",
    solution: "Using AI to create adaptive learning paths and provide instant feedback.",
    marketSize: "$350B EdTech Market",
    techStack: ["AI/ML", "React", "Python", "AWS"],
    targetAudience: "K-12 Students, College Students, Lifelong Learners",
    monetization: "Freemium Model with Premium Features",
    likes: 234,
    comments: 45,
    saves: 89,
    difficulty: "Medium",
    timeToMarket: "6-12 months",
    initialInvestment: "$100K-$500K",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  },
  {
    id: 2,
    title: "Sustainable Food Delivery Platform",
    description: "Zero-waste food delivery service using reusable containers and electric vehicles.",
    category: "Sustainability",
    problemStatement: "Food delivery creates massive packaging waste and carbon emissions.",
    solution: "Reusable container system and eco-friendly delivery methods.",
    marketSize: "$150B Food Delivery Market",
    techStack: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
    targetAudience: "Environmentally Conscious Urban Professionals",
    monetization: "Commission + Container Deposit System",
    likes: 189,
    comments: 32,
    saves: 67,
    difficulty: "High",
    timeToMarket: "12-18 months",
    initialInvestment: "$500K-$1M",
    author: {
      name: "Mike Green",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  },
  {
    id: 3,
    title: "Mental Health AI Chatbot",
    description: "24/7 mental health support through an AI-powered chatbot trained by professional therapists.",
    category: "Healthcare",
    problemStatement: "Limited access to mental health support, especially during off-hours.",
    solution: "AI chatbot providing immediate emotional support and resources.",
    marketSize: "$250B Mental Health Market",
    techStack: ["Python", "TensorFlow", "React", "AWS"],
    targetAudience: "Anyone seeking mental health support",
    monetization: "B2B (Enterprise) + B2C Premium Features",
    likes: 312,
    comments: 56,
    saves: 123,
    difficulty: "High",
    timeToMarket: "9-15 months",
    initialInvestment: "$300K-$800K",
    author: {
      name: "Dr. Emily Watson",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    id: 4,
    title: "Decentralized Freelance Marketplace",
    description: "Blockchain-based platform connecting freelancers with clients, ensuring fair payment and dispute resolution.",
    category: "Fintech",
    problemStatement: "Traditional freelance platforms have high fees and payment issues.",
    solution: "Smart contracts for automatic payments and blockchain for transparency.",
    marketSize: "$200B Freelance Market",
    techStack: ["Solidity", "React", "Node.js", "Ethereum"],
    targetAudience: "Freelancers and Businesses",
    monetization: "Small Transaction Fee",
    likes: 278,
    comments: 42,
    saves: 95,
    difficulty: "High",
    timeToMarket: "12-18 months",
    initialInvestment: "$400K-$900K",
    author: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: 5,
    title: "Smart Home Energy Optimizer",
    description: "IoT system that automatically optimizes home energy usage using AI and real-time pricing data.",
    category: "Sustainability",
    problemStatement: "High energy costs and inefficient home energy management.",
    solution: "Smart devices and AI for automated energy optimization.",
    marketSize: "$120B Smart Home Market",
    techStack: ["IoT", "Python", "React Native", "TensorFlow"],
    targetAudience: "Homeowners and Property Managers",
    monetization: "Hardware Sales + Subscription",
    likes: 156,
    comments: 28,
    saves: 72,
    difficulty: "Medium",
    timeToMarket: "9-15 months",
    initialInvestment: "$200K-$600K",
    author: {
      name: "Lisa Park",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  },
  {
    id: 6,
    title: "AR Shopping Assistant",
    description: "Mobile app using AR to help shoppers find products, compare prices, and get personalized recommendations in physical stores.",
    category: "Mobile",
    problemStatement: "Difficult to find items and compare prices in physical stores.",
    solution: "AR navigation and real-time price comparison.",
    marketSize: "$80B Retail Tech Market",
    techStack: ["Unity", "ARKit", "React Native", "Node.js"],
    targetAudience: "Retail Shoppers and Stores",
    monetization: "B2B SaaS + Affiliate Marketing",
    likes: 198,
    comments: 37,
    saves: 84,
    difficulty: "Medium",
    timeToMarket: "6-12 months",
    initialInvestment: "$150K-$400K",
    author: {
      name: "Tom Wilson",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: 7,
    title: "AI Code Review Assistant",
    description: "AI-powered tool that automatically reviews code, suggests improvements, and identifies potential bugs.",
    category: "AI/ML",
    problemStatement: "Code review process is time-consuming and can miss issues.",
    solution: "Automated code analysis and suggestions using AI.",
    marketSize: "$40B Developer Tools Market",
    techStack: ["Python", "TensorFlow", "GitHub API", "Docker"],
    targetAudience: "Development Teams and Companies",
    monetization: "Team Subscription Model",
    likes: 423,
    comments: 67,
    saves: 156,
    difficulty: "High",
    timeToMarket: "9-15 months",
    initialInvestment: "$300K-$700K",
    author: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=15"
    }
  },
  {
    id: 8,
    title: "Virtual Event Platform",
    description: "Immersive virtual events platform with 3D environments, networking features, and interactive presentations.",
    category: "Mobile",
    problemStatement: "Current virtual event solutions lack engagement and networking opportunities.",
    solution: "3D virtual spaces with real-time interaction.",
    marketSize: "$90B Virtual Events Market",
    techStack: ["Three.js", "WebRTC", "React", "Node.js"],
    targetAudience: "Event Organizers and Attendees",
    monetization: "Event Hosting Fee + Premium Features",
    likes: 267,
    comments: 48,
    saves: 112,
    difficulty: "Medium",
    timeToMarket: "6-12 months",
    initialInvestment: "$200K-$500K",
    author: {
      name: "Rachel Martinez",
      avatar: "https://i.pravatar.cc/150?img=16"
    }
  }
]

const categories = ["All", "Education", "Healthcare", "Sustainability", "Fintech", "AI/ML", "Mobile"]
const difficulties = ["All", "Low", "Medium", "High"]
const timeframes = ["All", "0-6 months", "6-12 months", "12+ months"]
const investments = ["All", "$0-$100K", "$100K-$500K", "$500K+"]

const StartupIdeas = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [likedIdeas, setLikedIdeas] = useState(new Set())
  const [savedIdeas, setSavedIdeas] = useState(new Set())

  const handleLike = (id) => {
    setLikedIdeas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSave = (id) => {
    setSavedIdeas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const filteredIdeas = startupIdeas.filter(idea => {
    const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || idea.difficulty === selectedDifficulty
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Startup Ideas Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover innovative startup ideas, share your thoughts, and find inspiration for your next venture.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search startup ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Filter size={20} />
            <span>Filters</span>
            <ChevronDown size={20} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select w-full"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="select w-full"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Time to Market</label>
                  <select className="select w-full">
                    {timeframes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Initial Investment</label>
                  <select className="select w-full">
                    {investments.map(investment => (
                      <option key={investment} value={investment}>{investment}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map(idea => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Category Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  {idea.category}
                </span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(idea.id)}
                    className="text-gray-400 hover:text-primary-500"
                  >
                    {savedIdeas.has(idea.id) ? (
                      <Bookmark className="fill-primary-500 text-primary-500" size={20} />
                    ) : (
                      <BookmarkPlus size={20} />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{idea.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Market Size</div>
                  <div className="font-semibold">{idea.marketSize}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Time to Market</div>
                  <div className="font-semibold">{idea.timeToMarket}</div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={idea.author.avatar}
                  alt={idea.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{idea.author.name}</span>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(idea.id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-primary-500"
                >
                  <Heart
                    size={18}
                    className={likedIdeas.has(idea.id) ? 'fill-primary-500 text-primary-500' : ''}
                  />
                  <span>{idea.likes + (likedIdeas.has(idea.id) ? 1 : 0)}</span>
                </motion.button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500">
                  <MessageSquare size={18} />
                  <span>{idea.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary-500">
                  <Share2 size={18} />
                </button>
                <div className="flex-1 text-right">
                  <span className={`text-sm font-medium ${
                    idea.difficulty === 'Low' ? 'text-green-500' :
                    idea.difficulty === 'Medium' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Target size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No ideas found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  )
}

export default StartupIdeas 
//update