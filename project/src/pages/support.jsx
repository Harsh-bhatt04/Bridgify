import { Mail, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function Support() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-100 transition-colors">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">

        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <Headphones className="w-8 h-8 text-blue-500" />
          Support
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Submit any issue, feedback, or request. Our team will respond soon.
        </p>

        <form className="flex flex-col gap-4">
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            type="text"
            placeholder="Your Name"
          />

          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            type="email"
            placeholder="Your Email"
          />

          <textarea
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            rows="4"
            placeholder="Describe your issue..."
          ></textarea>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            <Mail className="w-5 h-5" />
            Submit Ticket
          </motion.button>
        </form>
      </div>
    </div>
  );
}
