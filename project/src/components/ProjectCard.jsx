import { Star, Eye, MessageSquare, Pin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { togglePinProject, toggleLikeProject,user } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const isLiked = user ? project.likes.includes(user._id) : false;

  console.log(isLiked)

  const handleProjectClick = () => {
    navigate(`/project/${project._id}`);
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePinProject(project._id);
    
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log("like clicked")
    toggleLikeProject(project._id);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/project/${project._id}?tab=comments`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={handleProjectClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="p-4 relative z-10">

        {/* Top Section */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>

          <span 
            className={`px-2 py-0.5 text-[10px] rounded-full ${
              project.status === 'Open to Collaborate'
                ? 'bg-green-100/70 text-green-800 dark:bg-green-900/70 dark:text-green-300'
              : project.status === 'Completed'
                ? 'bg-blue-100/70 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300'
              : 'bg-purple-100/70 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Content */}
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {project.content}
        </p>

        {/* Image */}
        {project.media && project.media.length > 0 && (
          <img
            src={project.media[0]}
            alt={project.title}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags?.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 bg-gray-100/50 dark:bg-gray-700/50 rounded text-[10px] text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">

          {/* Likes */}
          <button
          style={{ backgroundColor: "red" }}
        onClick={handleLikeClick}
        className={`flex items-center gap-1 transition ${
          isLiked ? "text-yellow-500" : "text-gray-500 hover:text-yellow-400"
        }`}
      >
        <Star size={16} fill={isLiked ? "gold" : "none"} />
        <span>{project.likes.length}</span>
      </button>

          {/* Views (you don't have views—keeping zero for now or remove) */}
          <div className="flex items-center gap-1 opacity-50">
            <Eye size={12} />
            0
          </div>

          {/* Comments */}
          <button 
            onClick={handleCommentClick}
            className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <MessageSquare size={12} />
            {project.comments?.length || 0}
          </button>
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${project._id}/edit`);
                }}
                className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 text-xs font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                Edit
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${project._id}/share`);
                }}
                className="px-3 py-1 rounded-full bg-primary-500/90 text-white text-xs font-medium hover:bg-primary-500 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

//update