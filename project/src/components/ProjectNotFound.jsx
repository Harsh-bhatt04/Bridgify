import { motion } from 'framer-motion';
import { FolderOpen, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectNotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-12 text-center"
    >
      <div className="relative mx-auto w-24 h-24 mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FolderOpen size={40} className="text-primary-500 dark:text-primary-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -right-2 -bottom-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
        >
          <Search size={16} className="text-gray-500" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          No Projects Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Get started on your journey by uploading your first project. Share your work with the community and track your progress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/project/upload')}
            className="btn btn-primary flex justify-center items-center"
          >
            <Plus size={20} className="mr-2" />
            <span>Create New Project</span>
          </button>
          <button
            onClick={() => navigate('/explore')}
            className="btn btn-outline flex justify-center items-center"
          >
            <Search size={20} className="mr-2" />
            <span>Explore Projects</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectNotFound; 
//update