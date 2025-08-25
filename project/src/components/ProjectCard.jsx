import { Star, Eye, MessageSquare, Pin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { togglePinProject, toggleLikeProject } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePinProject(project.id);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLikeProject(project.id);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    navigate(`/project/${project.id}?tab=comments`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={handleProjectClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePinClick}
              className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                project.isPinned ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Pin size={14} />
            </button>
            <span className={`px-2 py-0.5 text-[10px] rounded-full ${
              project.status === 'Open to Collaborate' ? 'bg-green-100/70 text-green-800 dark:bg-green-900/70 dark:text-green-300' :
              project.status === 'Showcase Only' ? 'bg-blue-100/70 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300' :
              project.status === 'In Progress' ? 'bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-300' :
              'bg-purple-100/70 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 bg-gray-100/50 dark:bg-gray-700/50 rounded text-[10px] text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <button 
            onClick={handleLikeClick}
            className={`flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
              project.isLiked ? 'text-primary-600 dark:text-primary-400' : ''
            }`}
          >
            <Star size={12} />
            {project.upvotes}
          </button>
          <button 
            className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/${project.id}?tab=analytics`);
            }}
          >
            <Eye size={12} />
            {project.views}
          </button>
          <button 
            onClick={handleCommentClick}
            className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <MessageSquare size={12} />
            {project.comments}
          </button>
        </div>

        {/* Quick action overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${project.id}/edit`);
                }}
                className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 text-xs font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${project.id}/share`);
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