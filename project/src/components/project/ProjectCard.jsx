import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Github, 
  ExternalLink,
  Users,
  BookmarkPlus
} from 'lucide-react'

const statusColors = {
  'Open': 'bg-success-500',
  'Showcase Only': 'bg-warning-500',
  'Startup Ready': 'bg-secondary-500'
}

const ProjectCard = ({ project, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedProject);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value });
  };

  return (
    <motion.div 
      className="card overflow-visible"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            name="title"
            value={editedProject.title}
            onChange={handleChange}
            className="input w-full mb-2"
          />
          <textarea
            name="description"
            value={editedProject.description}
            onChange={handleChange}
            className="textarea w-full mb-4"
          />
          <button 
            onClick={handleSaveClick} 
            className="btn-save bg-primary-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          {/* Project Header */}
          <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <Link to={`/profile/${project.author.username}`}>
                <img 
                  src={project.author.avatar} 
                  alt={project.author.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              
              <div>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/profile/${project.author.username}`}
                    className="font-medium hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {project.author.name}
                  </Link>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    @{project.author.username}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted {project.posted}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`${statusColors[project.status]} w-2 h-2 rounded-full`}></div>
              <span className="text-xs font-medium">{project.status}</span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="p-4">
            <Link to={`/project/${project.id}`}>
              <h3 className="text-xl font-bold mb-2 hover:text-primary-600 dark:hover:text-primary-400">
                {project.title}
              </h3>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            
            {project.image && (
              <Link to={`/project/${project.id}`} className="block mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </Link>
            )}
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex gap-3 mb-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <Github size={16} />
                  <span>GitHub Repo</span>
                </a>
              )}
              
              {project.demoUrl && (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Project Footer */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <ThumbsUp size={18} />
                <span className="text-sm">{project.likes}</span>
              </button>
              
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <MessageSquare size={18} />
                <span className="text-sm">{project.comments}</span>
              </button>
              
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Share2 size={18} />
              </button>
            </div>
            
            <div className="flex gap-3">
              {project.status === 'Open' && (
                <button className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  <Users size={16} />
                  <span>Collaborate</span>
                </button>
              )}
              
              <button className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <BookmarkPlus size={18} />
              </button>
              
              <button 
                onClick={handleEditClick} 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Edit Project
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ProjectCard
//update