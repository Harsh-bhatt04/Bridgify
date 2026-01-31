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
import { useProjects } from '../context/ProjectContext'

const ProjectsView = () => {
  /* =======================
     CONTEXT & STATE HOOKS
  ======================= */
  const { addNotification } = useApp()
  const { projects, loading, error } = useProjects()

  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* =======================
     EFFECTS
  ======================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* =======================
     CALLBACK HANDLERS
  ======================= */
  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev)
    addNotification(isLiked ? 'Removed like' : 'Added like')
  }, [isLiked, addNotification])

  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev)
    addNotification(isSaved ? 'Removed from bookmarks' : 'Saved to bookmarks')
  }, [isSaved, addNotification])

  const handleSubmitComment = useCallback(
    (e) => {
      e.preventDefault()
      if (!newComment.trim()) return
      setNewComment('')
      addNotification('Comment posted successfully')
    },
    [newComment, addNotification]
  )

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    addNotification('Project link copied')
  }, [addNotification])

  /* =======================
     SAFE RETURNS (AFTER HOOKS)
  ======================= */
  if (loading) {
    return <div className="text-center py-10">Loading project...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!projects) return null

  /* =======================
     JSX
  ======================= */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Sticky Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b"
          >
            <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between">
              <h2 className="font-bold truncate">{projects.title}</h2>
              <div className="flex gap-3">
                <button onClick={handleLike} className="btn btn-sm btn-ghost">
                  <Heart size={16} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                </button>
                <button onClick={handleSave} className="btn btn-sm btn-ghost">
                  {isSaved ? <Bookmark size={16} /> : <BookmarkPlus size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div className="card overflow-hidden mb-8">
        <div className="relative">
          {showVideo && projects.video ? (
            <iframe
              src={projects.video}
              title="Project Demo"
              className="w-full aspect-video"
              allowFullScreen
            />
          ) : (
            <div className="relative aspect-video">
              <img
                src={projects.image}
                alt={projects.title}
                className="w-full h-full object-cover"
              />
              {projects.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <Play size={48} className="text-white" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{projects.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {projects.posted}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> 1.2k views
            </span>
            <span className="flex items-center gap-1">
              <Tag size={14} /> {projects.techStack.join(', ')}
            </span>
          </div>

          <p className="leading-relaxed mb-6">{projects.longDescription}</p>

          <div className="flex gap-4">
            <button onClick={handleLike} className="btn btn-outline">
              <Heart size={16} /> Like
            </button>
            <button onClick={handleSave} className="btn btn-outline">
              <BookmarkPlus size={16} /> Save
            </button>
            <button onClick={handleShare} className="btn btn-outline">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Comments */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input w-full mb-3"
            placeholder="Write a comment..."
          />
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProjectsView

