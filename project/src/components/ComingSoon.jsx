import { motion } from 'framer-motion';
import { Clock, Bell, MessageSquare, Rocket } from 'lucide-react';

const ComingSoon = ({ feature, description, icon: Icon = Rocket }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-8 text-center bg-gradient-to-br from-primary-50 to-primary-100/20 dark:from-primary-900/20 dark:to-primary-900/5 border border-primary-100 dark:border-primary-800"
    >
      <div className="relative mx-auto w-16 h-16 mb-6">
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
          <Icon size={32} className="text-primary-500 dark:text-primary-400" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {feature}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full">
            Coming Soon
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {description}
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Stay tuned for updates</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon; 