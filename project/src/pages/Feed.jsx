// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { TrendingUp as Trending, Clock, Filter } from 'lucide-react'
// import ProjectCard from '../components/project/ProjectCard'
// import { useProjects } from '../context/ProjectContext'

// // Dummy data for projects

// const Feed = () => {
//   const [activeTab, setActiveTab] = useState('trending')
//   const [showFilters, setShowFilters] = useState(false)

//   const {projects,loading,error} = useProjects()
//   console.log(projects)

  
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Project Feed</h1>
        
//         <button 
//           className="btn btn-outline text-sm flex items-center gap-1"
//           onClick={() => setShowFilters(!showFilters)}
//         >
//           <Filter size={16} />
//           <span>Filters</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <AnimatePresence>
//         {showFilters && (
//           <motion.div 
//             className="card p-4 mb-6"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Status</label>
//                 <select className="input">
//                   <option value="">All Statuses</option>
//                   <option value="open">Open to Collaborate</option>
//                   <option value="showcase">Showcase Only</option>
//                   <option value="startup">Startup Ready</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Tech Stack</label>
//                 <select className="input">
//                   <option value="">All Technologies</option>
//                   <option value="react">React</option>
//                   <option value="nodejs">Node.js</option>
//                   <option value="python">Python</option>
//                   <option value="flutter">Flutter</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Time Period</label>
//                 <select className="input">
//                   <option value="">All Time</option>
//                   <option value="today">Today</option>
//                   <option value="week">This Week</option>
//                   <option value="month">This Month</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Feed Tabs */}
//       <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//         <button
//           className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
//             activeTab === 'trending'
//               ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
//               : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
//           }`}
//           onClick={() => setActiveTab('trending')}
//         >
//           <Trending size={16} />
//           <span>Trending</span>
//         </button>
        
//         <button
//           className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
//             activeTab === 'recent'
//               ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
//               : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
//           }`}
//           onClick={() => setActiveTab('recent')}
//         >
//           <Clock size={16} />
//           <span>Recent</span>
//         </button>
//       </div>

//       {/* Projects Grid */}
//       <div className="space-y-6">
//         {projects.map(project => (
//           <ProjectCard key={project._id} project={project} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Feed


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp as Trending, Clock, Filter, Bell, Search } from 'lucide-react';

import ProjectCard from '../components/project/ProjectCard';
import { useProjects } from '../context/ProjectContext';

const Feed = () => {
  const navigate = useNavigate();

  // tabs & UI
  const [activeTab, setActiveTab] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  // projects (Mohak)
  const { projects, loading, error } = useProjects();

  // search users
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // connection requests
  const [requestedUsers, setRequestedUsers] = useState(new Set());

  // notifications
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [actionLoadingIds, setActionLoadingIds] = useState(new Set());

  // helper
  const setIdLoading = (id, value) => {
    setActionLoadingIds(prev => {
      const next = new Set(prev);
      value ? next.add(id) : next.delete(id);
      return next;
    });
  };

  // fetch pending requests
  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/connections/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPendingRequests(res.ok && data.success ? data.requests || [] : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    const interval = setInterval(fetchPendingRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  // connect request
  const handleConnectRequest = async userId => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/connections/request/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRequestedUsers(prev => new Set([...prev, userId]));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // accept / reject
  const handleAcceptRequest = async id => {
    setIdLoading(id, true);
    setPendingRequests(prev => prev.filter(r => r._id !== id));
    try {
      await fetch(`http://localhost:8000/api/connections/accept/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } finally {
      setIdLoading(id, false);
    }
  };

  const handleRejectRequest = async id => {
    setIdLoading(id, true);
    setPendingRequests(prev => prev.filter(r => r._id !== id));
    try {
      await fetch(`http://localhost:8000/api/connections/reject/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } finally {
      setIdLoading(id, false);
    }
  };

  // search users
  const searchUsers = async query => {
    if (!query.trim()) return setSearchResults([]);
    setIsSearching(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/profile/search?q=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const data = await res.json();
      setSearchResults(res.ok && data.success ? data.users || [] : []);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => searchUsers(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Project Feed</h1>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-10 left-0 right-0 bg-white shadow rounded-xl z-50"
              >
                {isSearching ? (
                  <div className="p-3 text-center">Searching...</div>
                ) : (
                  searchResults.map(user => (
                    <div
                      key={user._id}
                      className="flex justify-between items-center p-3 hover:bg-gray-100"
                    >
                      <span onClick={() => navigate(`/profile/${user._id}`)}>
                        {user.username}
                      </span>
                      {!requestedUsers.has(user._id) && (
                        <button
                          onClick={() => handleConnectRequest(user._id)}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button onClick={() => setNotifOpen(!notifOpen)}>
          <Bell />
          {pendingRequests.length > 0 && <span>{pendingRequests.length}</span>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setActiveTab('trending')}>
          <Trending size={16} /> Trending
        </button>
        <button onClick={() => setActiveTab('recent')}>
          <Clock size={16} /> Recent
        </button>
      </div>

      {/* Projects */}
      {loading && <p>Loading...</p>}
      {error && <p>Error loading projects</p>}

      <div className="space-y-6">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
