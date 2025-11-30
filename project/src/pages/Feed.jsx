// src/pages/Feed.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp as Trending, Clock, Filter, Bell, Search } from 'lucide-react';
import ProjectCard from '../components/project/ProjectCard';
import { useNavigate } from 'react-router-dom';

// Dummy data for now (you can remove once backend search is ready)
const projectsData = [
  {
    id: 1,
    title: 'React Productivity Dashboard',
    description:
      'A fully-featured dashboard for tracking productivity metrics with analytics and goal setting. Built with React and Chart.js.',
    posted: '2 days ago',
    image: 'https://placehold.co/600x400/4f46e5/FFFFFF/png?text=Dashboard',
    status: 'Open',
    techStack: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    githubUrl: '#',
    demoUrl: '#',
    likes: 42,
    comments: 12,
    author: { name: 'Jane Smith', username: 'janesmith', avatar: 'https://i.pravatar.cc/150?img=5' },
  },
];

const Feed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  const [projects, setProjects] = useState(projectsData);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // connection request state
  const [requestedUsers, setRequestedUsers] = useState(new Set());

  // notification state
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  // per-request action loading
  const [actionLoadingIds, setActionLoadingIds] = useState(new Set());

  // helper to toggle loading for a specific request id
  const setIdLoading = (id, value) => {
    setActionLoadingIds(prev => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/connections/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) setPendingRequests(data.requests || []);
      else setPendingRequests([]);
    } catch (err) {
      console.error('Error fetching pending requests:', err);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    const interval = setInterval(fetchPendingRequests, 5000); // optional: auto refresh
    return () => clearInterval(interval);
  }, []);

  // connect request
  const handleConnectRequest = async userId => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first');
        return;
      }

      const res = await fetch(`http://localhost:8000/api/connections/request/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok && data.success) {
        // Create a new Set (do not mutate previous set) so React re-renders
        setRequestedUsers(prev => new Set([...Array.from(prev), userId]));
      } else {
        alert(data.message || data.error || 'Failed to send request');
      }
    } catch (err) {
      console.error('Connection request error:', err);
      alert('Server error — check console.');
    }
  };

  // accept / reject
  const handleAcceptRequest = async requestId => {
    setIdLoading(requestId, true);
    // optimistic update
    setPendingRequests(prev => prev.filter(req => req._id !== requestId));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/connections/accept/${requestId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Accept failed:', data);
        await fetchPendingRequests();
        alert(data.message || 'Failed to accept request');
      }
    } catch (err) {
      console.error('Accept request error:', err);
      await fetchPendingRequests();
      alert('Server error while accepting');
    } finally {
      setIdLoading(requestId, false);
    }
  };

  const handleRejectRequest = async requestId => {
    setIdLoading(requestId, true);
    // optimistic update
    setPendingRequests(prev => prev.filter(req => req._id !== requestId));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/connections/reject/${requestId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Reject failed:', data);
        await fetchPendingRequests();
        alert(data.message || 'Failed to reject request');
      }
    } catch (err) {
      console.error('Reject request error:', err);
      await fetchPendingRequests();
      alert('Server error while rejecting');
    } finally {
      setIdLoading(requestId, false);
    }
  };

  // Search users
  const searchUsers = async query => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:8000/api/profile/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSearchResults(data.users || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchUsers(searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Project Feed</h1>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-auto md:mx-0">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchQuery.trim() && (
              <motion.div
                key="search-dropdown"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-10 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
              >
                {isSearching ? (
                  <div className="py-3 text-center text-gray-500 text-sm">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map(user => {
                    const isRequested = requestedUsers.has(user._id);
                    // hide connect button if user already requested or connected or is self
                    // (you can enhance by adding user.canConnect from backend)
                    const showConnect = !isRequested && user._id !== (localStorage.getItem('userId') || '');
                    return (
                      <div
                        key={user._id}
                        className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        {/* User Info */}
                        <button
                          onClick={() => navigate(`/profile/${user._id}`)}
                          className="flex items-center gap-3 text-left flex-1"
                        >
                          <img
                            src={user.profileImage || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
                            alt={user.name || user.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-100">{user.name || user.username}</p>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                          </div>
                        </button>

                        {/* Connect Button */}
                        {showConnect && (
                          <button
                            onClick={e => {
                              e.stopPropagation(); // Prevent navigation on click
                              handleConnectRequest(user._id);
                            }}
                            disabled={isRequested}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${isRequested
                                ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-default'
                                : 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                              }`}
                          >
                            {isRequested ? 'Requested' : 'Connect'}
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-3 text-center text-gray-500 text-sm">No users found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notification + Filters */}
        <div className="flex items-center gap-3 justify-end">
          <div className="relative">
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              {pendingRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-semibold">Pending requests</div>
                  <div className="text-xs text-gray-500">{pendingRequests.length} pending</div>
                </div>

                <div className="max-h-64 overflow-auto">
                  {pendingRequests.length === 0 && <div className="p-4 text-sm text-gray-500">No pending requests</div>}

                  {pendingRequests.map(req => {
                    const sender = req.senderId || {};
                    const isLoading = actionLoadingIds.has(req._id);

                    return (
                      <div key={req._id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex items-center gap-3">
                          <img src={sender.profileImage || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt={sender.username || 'user'} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <div className="font-medium">{sender.username || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">{sender.email || ''}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAcceptRequest(req._id)}
                            disabled={actionLoadingIds.has(req._id)}
                            className="text-xs px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
                          >
                            {actionLoadingIds.has(req._id) ? '...' : 'Accept'}
                          </button>

                          <button
                            onClick={() => handleRejectRequest(req._id)}
                            disabled={actionLoadingIds.has(req._id)}
                            className="text-xs px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                          >
                            {actionLoadingIds.has(req._id) ? '...' : 'Reject'}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

                <div className="p-3 border-t border-gray-100 dark:border-gray-700 text-right">
                  <button onClick={() => fetchPendingRequests()} className="text-xs text-primary-600 hover:underline">
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters Button */}
          <button className="btn btn-outline text-sm flex items-center gap-1" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Feed Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${activeTab === 'trending' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`} onClick={() => setActiveTab('trending')}>
          <Trending size={16} />
          <span>Trending</span>
        </button>

        <button className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${activeTab === 'recent' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`} onClick={() => setActiveTab('recent')}>
          <Clock size={16} />
          <span>Recent</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
