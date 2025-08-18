import { motion } from 'framer-motion';
import { Github, Calendar, ExternalLink, Tag, Plus, MessageSquare, Bell, Users, Edit, Trash } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import ProjectNotFound from '../components/ProjectNotFound';
import ComingSoon from '../components/ComingSoon';

const Dashboard = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your project portfolio
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/project/upload')}
          className="btn btn-primary flex justify-center items-center"
        >
          <Plus size={20} className="mr-2" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Project Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="card p-6 bg-gradient-to-br from-primary-500/10 to-primary-500/5">
          <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {projects.length}
          </p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {projects.filter(p => p.status === 'In Progress').length}
          </p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {projects.filter(p => p.status === 'Completed').length}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
          {projects.length === 0 ? (
            <ProjectNotFound />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="flex flex-col md:flex-row">
                    {project.imagePreview && (
                      <div className="md:w-64 h-48 md:h-auto">
                        <img
                          src={project.imagePreview}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {project.description}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          >
                            <Tag size={12} className="mr-1" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline btn-sm"
                            >
                              <Github size={16} className="mr-2" />
                              <span>View Code</span>
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit logic here
                            }}
                            className="btn btn-sm btn-warning"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete logic here
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <ComingSoon
            feature="Project Messages"
            description="Chat with collaborators and discuss project details in real-time."
            icon={MessageSquare}
          />
          <ComingSoon
            feature="Notifications"
            description="Stay updated with project activities and team communications."
            icon={Bell}
          />
          <ComingSoon
            feature="Team Management"
            description="Invite team members and manage project collaborators."
            icon={Users}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;