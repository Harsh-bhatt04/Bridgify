import { motion } from 'framer-motion';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Star, 
  GitFork,
  Eye,
  Activity,
  Box
} from 'lucide-react';

const ContributionDay = ({ count, date, intensity }) => {
  const getBackgroundColor = () => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (intensity < 0.25) return 'bg-green-100 dark:bg-green-900/30';
    if (intensity < 0.5) return 'bg-green-200 dark:bg-green-800/40';
    if (intensity < 0.75) return 'bg-green-300 dark:bg-green-700/50';
    return 'bg-green-400 dark:bg-green-600/60';
  };

  return (
    <div
      title={`${count} contributions on ${date}`}
      className={`w-3 h-3 rounded-sm ${getBackgroundColor()} transition-colors hover:ring-2 ring-gray-300 dark:ring-gray-600 cursor-pointer`}
    />
  );
};

const GitHubActivity = ({ data }) => {
  // Mock contribution data - in a real app, this would come from GitHub's API
  const contributionData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 10),
  }));

  const maxContributions = Math.max(...contributionData.map(d => d.count));

  return (
    <div className="space-y-6">
      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <GitCommit className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.totalCommits}
            </div>
            <div className="text-sm text-gray-500">Total Commits</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <GitPullRequest className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.pullRequests}
            </div>
            <div className="text-sm text-gray-500">Pull Requests</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
            <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.totalStars}
            </div>
            <div className="text-sm text-gray-500">Repository Stars</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <GitFork className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.totalForks}
            </div>
            <div className="text-sm text-gray-500">Total Forks</div>
          </div>
        </motion.div>
      </div>

      {/* Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contribution Activity
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
              <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900/30" />
              <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-800/40" />
              <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700/50" />
              <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600/60" />
            </div>
            <span>More</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[3px]">
          {Array.from({ length: 7 }, (_, row) => (
            <div key={row} className="flex flex-col gap-[3px]">
              {contributionData
                .filter((_, index) => index % 7 === row)
                .map((day) => (
                  <ContributionDay
                    key={day.date}
                    count={day.count}
                    date={day.date}
                    intensity={day.count / maxContributions}
                  />
                ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Popular Repositories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.popularRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {repo.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {repo.description}
                  </p>
                </div>
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Box className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  {repo.language}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Star className="w-4 h-4" />
                  {repo.stars}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <GitFork className="w-4 h-4" />
                  {repo.forks}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                activity.type === 'commit' ? 'bg-green-100 dark:bg-green-900/30' :
                activity.type === 'pr' ? 'bg-blue-100 dark:bg-blue-900/30' :
                activity.type === 'issue' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                'bg-purple-100 dark:bg-purple-900/30'
              }`}>
                {activity.type === 'commit' && <GitCommit className="w-4 h-4 text-green-600 dark:text-green-400" />}
                {activity.type === 'pr' && <GitPullRequest className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                {activity.type === 'issue' && <Activity className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
                {activity.type === 'fork' && <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-primary-500">
                    {activity.repository}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubActivity; 
//update