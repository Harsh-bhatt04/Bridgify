import { useState, useCallback, useEffect } from 'react'
import { 
  MessageSquare, 
  Share2, 
  Github as GitHub, 
  ExternalLink, 
  Users, 
  BookmarkPlus, 
  Calendar, 
  Tag, 
  Flag,
  Play,
  Bookmark,
  Eye,
  Heart,
  Code
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

// Mock project data
const project = {
  id: '1',
  title: 'React Productivity Dashboard',
  description: `A fully-featured dashboard for tracking productivity metrics with analytics and goal setting. Built with React and Chart.js.
  
  This project includes:
  
  - Customizable dashboard widgets
  - Real-time data visualization with Chart.js
  - Task and goal tracking functionality
  - Time tracking with reports
  - Dark and light theme support
  - Mobile responsive design`,
  longDescription: `This dashboard application helps users track their productivity metrics and visualize their progress over time. The main goal was to create an intuitive interface that allows users to quickly glance at their performance and identify areas for improvement.
  
  The frontend is built with React, using Context API for state management and React Router for navigation. Chart.js is used for data visualization, and all styles are implemented with Tailwind CSS for a clean, modern look.
  
  The dashboard offers multiple customizable widgets that users can arrange according to their preferences. Data is persisted using Firebase, allowing users to access their information across devices.
  
  Future plans include adding team collaboration features, more advanced reporting, and integration with popular productivity tools like Todoist and Notion.`,
  posted: '2 days ago',
  image: 'https://placehold.co/1200x600/4f46e5/FFFFFF/png?text=Dashboard&font=montserrat',
  video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example video URL
  status: 'Open',
  techStack: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
  tags: ['Productivity', 'Dashboard', 'Analytics'],
  githubUrl: 'https://github.com/username/project',
  demoUrl: 'https://demo-url.com',
  likes: 42,
  comments: [
    {
      id: 1,
      text: 'This looks amazing! The UI is so clean and intuitive.',
      author: {
        name: 'Alex Johnson',
        username: 'alexj',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      date: '1 day ago',
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      text: 'I love the dashboard layout. Would you consider adding export to PDF functionality?',
      author: {
        name: 'Sarah Chen',
        username: 'sarahc',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      date: '12 hours ago',
      likes: 2,
      isLiked: false
    }
  ],
  author: {
    name: 'Jane Smith',
    username: 'janesmith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Frontend developer specializing in React and data visualization',
    github: 'https://github.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith'
  }
}

const ProjectView = () => {
  const { addNotification } = useApp()
  const [projectData, setProjectData] = useState(project)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLike = useCallback(() => {
    setIsLiked(prev => {
      const newState = !prev
      setProjectData(prevData => ({
        ...prevData,
        likes: prevData.likes + (newState ? 1 : -1)
      }))
      return newState
    })
    addNotification(isLiked ? 'Removed like' : 'Added like')
  }, [isLiked, addNotification])

  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev)
    addNotification(isSaved ? 'Project removed from bookmarks' : 'Project saved to bookmarks')
  }, [isSaved, addNotification])

  const handleCommentLike = useCallback((commentId) => {
    setProjectData(prevData => ({
      ...prevData,
      comments: prevData.comments.map(comment => {
        if (comment.id === commentId) {
          const newIsLiked = !comment.isLiked
          return {
            ...comment,
            likes: comment.likes + (newIsLiked ? 1 : -1),
            isLiked: newIsLiked
          }
        }
        return comment
      })
    }))
  }, [])

  const handleSubmitComment = useCallback((e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: {
        name: 'Current User',
        username: 'currentuser',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      date: 'Just now',
      likes: 0,
      isLiked: false
    }

    setProjectData(prevData => ({
      ...prevData,
      comments: [newCommentObj, ...prevData.comments]
    }))
    setNewComment('')
    addNotification('Comment posted successfully')
  }, [newComment, addNotification])

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    addNotification('Project link copied to clipboard')
  }, [addNotification])

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Sticky Header on Scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <h2 className="font-bold text-lg truncate">{projectData.title}</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLike}
                  className="btn btn-sm btn-ghost flex items-center gap-1"
                >
                  <Heart size={16} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                  <span>{projectData.likes}</span>
                </button>
                <button 
                  onClick={handleSave}
                  className="btn btn-sm btn-ghost"
                >
                  {isSaved ? <Bookmark size={16} className="fill-current" /> : <BookmarkPlus size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden bg-white dark:bg-gray-800 shadow-xl mb-8"
      >
        <div className="relative">
          {showVideo && projectData.video ? (
            <div className="w-full aspect-video">
              <iframe
                src={projectData.video}
                title="Project Demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video group">
              <img 
                src={projectData.image} 
                alt={projectData.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {projectData.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm p-4 rounded-full"
                  >
                    <Play size={48} className="text-white" />
                  </motion.div>
                </button>
              )}
            </div>
          )}

          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            {projectData.demoUrl && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={projectData.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm glass text-white hover:text-white flex items-center gap-1"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </motion.a>
            )}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={projectData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm glass text-white hover:text-white flex items-center gap-1"
            >
              <GitHub size={16} />
              <span>Source</span>
            </motion.a>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {projectData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-primary-500" />
                  <span>Posted {projectData.posted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} className="text-primary-500" />
                  <span>1.2k views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={14} className="text-primary-500" />
                  <span>{projectData.techStack.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700"
            >
              <img 
                src={projectData.author.avatar} 
                alt={projectData.author.name} 
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800"
              />
              <div>
                <div className="font-medium text-lg">{projectData.author.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">@{projectData.author.username}</div>
                <div className="mt-2 flex gap-2">
                  <a href={projectData.author.github} target="_blank" rel="noreferrer" 
                     className="text-gray-600 hover:text-primary-500 dark:text-gray-400">
                    <GitHub size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Tag size={18} className="text-primary-500" />
              </span>
              About this project
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-line leading-relaxed">{projectData.longDescription}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Code size={18} className="text-primary-500" />
              </span>
              Technologies used
            </h2>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`btn ${isLiked ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              <span>{projectData.likes} Likes</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`btn ${isSaved ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
            >
              {isSaved ? <Bookmark size={18} className="fill-current" /> : <BookmarkPlus size={18} />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="btn btn-outline flex items-center gap-2"
            >
              <Share2 size={18} />
              <span>Share</span>
            </motion.button>

            {projectData.status === 'Open' && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Users size={18} />
                <span>Request to Collaborate</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Project Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <Heart size={24} className="text-primary-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">{projectData.likes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <MessageSquare size={24} className="text-primary-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">{projectData.comments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Comments</div>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <Users size={24} className="text-primary-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Collaborators</div>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <BookmarkPlus size={24} className="text-primary-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">28</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Saves</div>
          </div>
        </div>
      </motion.div>
      
      {/* Comments Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <MessageSquare size={18} className="text-primary-500" />
            </span>
            Comments ({projectData.comments.length})
          </h2>
          
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this project..."
              className="input resize-none w-full mb-3 min-h-[120px] focus:ring-2 focus:ring-primary-500"
              rows="3"
            ></textarea>
            <div className="flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="btn btn-primary"
                disabled={!newComment.trim()}
              >
                Post Comment
              </motion.button>
            </div>
          </form>
          
          <div className="space-y-6">
            {projectData.comments.map((comment) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={comment.id} 
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
              >
                <div className="flex gap-4">
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{comment.author.name}</span>
                        <span className="text-sm text-gray-500 ml-2">@{comment.author.username}</span>
                      </div>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                      {comment.text}
                    </p>
                    
                    <div className="flex gap-6">
                      <button 
                        onClick={() => handleCommentLike(comment.id)}
                        className={`text-sm hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1.5 ${
                          comment.isLiked ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'
                        }`}
                      >
                        <Heart size={14} className={comment.isLiked ? 'fill-current' : ''} />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>Reply</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5">
                        <Flag size={14} />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectView