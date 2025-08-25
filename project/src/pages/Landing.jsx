import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { 
  Code, 
  Github, 
  Sun, 
  Moon, 
  ChevronRight,
  Rocket,
  Share2,
  Users
} from 'lucide-react'

const Landing = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#D9D2FF] via-[#B68EFF] to-[#A26AFF] relative overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(162,106,255,0.1)_0%,transparent_70%)]" />
      
      {/* Main content */}
      <div className="relative z-10">

        
        {/* Navigation */}
        <nav className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mt-6 sm:mt-5 flex items-center justify-between backdrop-blur-sm bg-white/40 border dark:bg-gray-900/10 rounded-full py-2">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 dark:bg-white/10 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm">
              <Code size={20} className="text-gray-900 dark:text-white sm:w-6 sm:h-6" />
            </div>
            <span className="font-bold text-lg sm:text-2xl text-gray-900 dark:text-white">
              Bridgify
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 justify-center">
            <Link to="/projects" className="text-gray-900 dark:text-white hover:text-white dark:hover:text-white/80">Projects</Link>
            <Link to="/community" className="text-gray-900 dark:text-white hover:text-white dark:hover:text-white/80">Community</Link>
            <Link to="/about" className="text-gray-900 dark:text-white hover:text-white dark:hover:text-white/80">About</Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            <a 
              href="https://github.com/brigify"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10"
            >
              <Github size={18} className="text-gray-900 dark:text-white sm:w-5 sm:h-5" />
            </a>
            {/* <button 
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-white sm:w-5 sm:h-5" />
              ) : (
                <Moon size={18} className="text-gray-900 sm:w-5 sm:h-5" />
              )}
            </button> */}
            
            <Link 
              to="/login" 
              className="px-4 py-1.5 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-white/30 dark:hover:bg-white/20 text-xs sm:text-sm"
            >
              Log in
            </Link>
            
            <Link 
              to="/signup" 
              className="px-4 py-1.5 rounded-full  bg-[#7e4ccf]/70 dark:bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 dark:hover:bg-white/30 text-xs sm:text-sm"
            >
              Sign up
            </Link>
          </div>
        </nav>  

        

        {/* Hero Section */}
        <motion.section 
          className="container-custom px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 flex flex-col items-center text-center justify-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 max-w-6xl h-[60vh] pt-2 flex items-center justify-center flex-col mx-auto space-y-4 sm:space-y-8">
            <motion.div
              className="space-y-2 sm:space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight font-[Poppins] text-gray-900 dark:text-white">
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                  <div className="text-gray-900 dark:text-white">
                    Showcase
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    Connect
                  </div>
                </div>
                <div className="text-white pb-4 sm:pb-10 pt-2 sm:pt-4">
                  Unlocking the <span className="font-['Playfair_Display'] italic text-[#7e4ccf] font-black">Growth</span>
                </div>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-base sm:text-xl md:text-xl text-gray-900 dark:text-white/90 max-w-xl sm:max-w-2xl mx-auto mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join the community of developers who build, showcase, and collaborate on innovative projects that matter.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 w-full sm:w-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/signup" 
                className="px-8 py-3 rounded-full bg-white/30 dark:bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-white/40 dark:hover:bg-white/30 text-sm sm:text-lg flex items-center justify-center border"
              >
                Get Started <ChevronRight size={16} className="ml-2 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-[Poppins]">
                Why Developers Choose{' '}
                <span className="text-white">Bridgify</span>
              </h2>
              <p className="text-xl text-gray-900 dark:text-white/80 max-w-3xl mx-auto">
                Join thousands of developers who are building the future of software, one project at a time
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Share2 size={28} className="text-gray-900 dark:text-white" />}
                title="Showcase Your Work"
                description="Create beautiful portfolios for your projects. Get noticed by the right people and build your developer brand."
              />
              <FeatureCard 
                icon={<Users size={28} className="text-gray-900 dark:text-white" />}
                title="Connect & Collaborate"
                description="Find like-minded developers, join exciting projects, and build meaningful connections in the community."
              />
              <FeatureCard 
                icon={<Rocket size={28}  className="text-[#7e4ccf] " />}
                title="Launch & Grow"
                description="Transform your side projects into successful startups. Get feedback, find co-founders, and reach potential investors."
              />
            </div>

            <div className="mt-20 text-center">
              <motion.div
                className="inline-flex gap-4 p-2 backdrop-blur-sm bg-white/10 dark:bg-white/5 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 dark:bg-white/10">
                  <span className="text-gray-900 dark:text-white font-semibold">500+</span>
                  <span className="text-gray-900 dark:text-white/80">Projects Launched</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-2">
                  <span className="text-gray-900 dark:text-white font-semibold">2K+</span>
                  <span className="text-gray-900 dark:text-white/80">Active Developers</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-2">
                  <span className="text-gray-900 dark:text-white font-semibold">100+</span>
                  <span className="text-gray-900 dark:text-white/80">Success Stories</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl hover:from-white/20 hover:to-white/10 transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="bg-gradient-to-br from-white/20 to-transparent p-4 rounded-2xl w-fit mb-6 backdrop-blur-sm border border-white/10 group-hover:from-white/30 group-hover:to-white/5 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">{title}</h3>
      <p className="text-white/90 text-lg leading-relaxed">{description}</p>
    </motion.div>
  )
}

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Landing
//update