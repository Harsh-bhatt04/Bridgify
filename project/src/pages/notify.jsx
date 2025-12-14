import { Bell } from "lucide-react";
import { motion } from "framer-motion";

// Dummy notifications data
const notifications = [
  {
    id: 1,
    type: "project",
    title: "New collaboration request",
    description: "John Doe wants to collaborate on your 'SmartHub' project.",
    time: "2h ago",
  },
  {
    id: 2,
    type: "message",
    title: "New message received",
    description: "Riya sent you a message in the community chat.",
    time: "5h ago",
  },
  {
    id: 3,
    type: "system",
    title: "Subscription upgrade",
    description: "Your Bridgify Pro plan is now active. Enjoy premium features!",
    time: "1d ago",
  },
  {
    id: 4,
    type: "project",
    title: "Project approved",
    description: "'AI Assistant' project has been approved for showcase.",
    time: "2d ago",
  },
];

export default function Notify() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          Notifications
        </h1>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{notif.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{notif.description}</p>
                </div>
              </div>
              <span className="mt-2 md:mt-0 text-gray-400 dark:text-gray-500 text-sm">{notif.time}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
          <p>No more notifications</p>
        </div>
      </div>
    </div>
  );
}
