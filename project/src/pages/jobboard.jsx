import { Briefcase, MapPin, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function JobBoard() {
  const jobs = [
    { title: "Frontend Developer", company: "TechNova", location: "Remote" },
    { title: "Backend Engineer", company: "CodeSphere", location: "Bangalore" },
    { title: "UI/UX Intern", company: "DesignPro", location: "Mumbai" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Job Board
        </h1>

        <div className="space-y-5">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>

              <div className="flex items-center gap-6 mt-2 text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Building2 className="w-5 h-5" /> {job.company}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" /> {job.location}
                </span>
              </div>

              <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
