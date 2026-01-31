import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { timeAgo } from '../../utils/TimeAgo'
import { useApp } from '../../context/AppContext'

const ProjectCard = ({ project }) => {
  const {toggleLikeProject,user} = useApp()
  const currUser = user?._id
  const likesArray = Array.isArray(project.likes) ? project.likes : []
  console.log("Status",user)
  const isLiked = currUser ? likesArray.includes(currUser) : false;
  

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log("like clicked")
    toggleLikeProject(project._id);
  };

  return (
    <motion.div
      className="card overflow-visible"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <Link to={`/profile/${project?.userId?._id}`}>
            <img
              src={project?.userId?.profileImage || "/default-avatar.png"}
              alt={project?.userId?.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          <div>
            <Link
              to={`/profile/${project?.userId?._id}`}
              className="font-medium hover:text-primary-600"
            >
              {project?.userId?.username || "Unknown User"}
            </Link>

            <p className="text-sm text-gray-500">
              {timeAgo(project.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <Link to={`/project/${project._id}`}>
        <div className="p-4 cursor-pointer">
          <h3 className="text-xl font-bold mb-2">
            {project.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.content}
          </p>

          {project.media && (
            <img
              src={project.media}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
        </div>
      </Link>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex gap-4">
          {/* <button onClick={handleLikeClick} className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <ThumbsUp size={18} fill={isLiked ? "gold" : "none"}/>
            <span className="text-sm">{project.likes.length}</span>
          </button> */}
          <button
      onClick={handleLikeClick}
      className={`flex items-center gap-1 transition-colors ${
        isLiked
          ? "text-blue-600"
          : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
      }`}
    >
      <ThumbsUp
        size={18}
        fill={isLiked ? "currentColor" : "none"}
      />
      <span className="text-sm">{likesArray.length}</span>
    </button>

          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <MessageSquare size={18} />
            <span className="text-sm">0</span>
          </button>

          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
