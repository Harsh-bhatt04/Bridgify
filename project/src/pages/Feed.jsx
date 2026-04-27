import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp as Trending, Clock, Bell, Search } from 'lucide-react';

import ProjectCard from '../components/project/ProjectCard';
import { useProjects } from '../context/ProjectContext';

const Feed = () => {
  const navigate = useNavigate();
  const notifRef = useRef(null);

  const [activeTab, setActiveTab] = useState('trending');
  const { projects, loading, error } = useProjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [requestedUsers, setRequestedUsers] = useState(new Set());

  const [pendingRequests, setPendingRequests] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [actionLoadingIds, setActionLoadingIds] = useState(new Set());

  const setIdLoading = (id, value) => {
    setActionLoadingIds(prev => {
      const next = new Set(prev);
      value ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const fetchPendingRequests = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
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
    const token = localStorage.getItem('token');
    if (!token) return;

    fetchPendingRequests();
    const interval = setInterval(fetchPendingRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConnectRequest = async userId => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

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

  const handleAcceptRequest = async id => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIdLoading(id, true);
    setPendingRequests(prev => prev.filter(r => r._id !== id));
    try {
      await fetch(`http://localhost:8000/api/connections/accept/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      setIdLoading(id, false);
    }
  };

  const handleRejectRequest = async id => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIdLoading(id, true);
    setPendingRequests(prev => prev.filter(r => r._id !== id));
    try {
      await fetch(`http://localhost:8000/api/connections/reject/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      setIdLoading(id, false);
    }
  };

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
      <div className="relative flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Project Feed</h1>

        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border text-black"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-12 left-0 right-0 bg-white shadow-xl rounded-xl z-[9999]"
              >
                {isSearching ? (
                  <div className="p-3 text-center">Searching...</div>
                ) : (
                  searchResults.map(user => (
                    <div key={user._id} className="flex justify-between items-center p-3 hover:bg-gray-100 text-gray-800">
                      <span onClick={() => navigate(`/profile/${user._id}`)} className="font-medium cursor-pointer">
                        {user.username}
                      </span>

                      {!requestedUsers.has(user._id) && (
                        <button
                          onClick={() => handleConnectRequest(user._id)}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

        {/* 🔔 Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotifOpen(prev => !prev);
            }}
            className="relative"
          >
            <Bell />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl z-[9999] p-3" onClick={e => e.stopPropagation()}>
              <h3 className="font-semibold mb-2">Connection Requests</h3>

              {pendingRequests.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">No new requests</p>
              ) : (
                pendingRequests.map(req => (
                  <div key={req._id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => req?.senderId?._id && navigate(`/profile/${req.senderId._id}`)}
                    >
                      {req?.senderId?.username || 'Unknown User'}
                    </span>

                    <div className="flex gap-2">
                      <button
                        disabled={actionLoadingIds.has(req._id)}
                        onClick={() => handleAcceptRequest(req._id)}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        disabled={actionLoadingIds.has(req._id)}
                        onClick={() => handleRejectRequest(req._id)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setActiveTab('trending')} className="flex items-center gap-1">
          <Trending size={16} /> Trending
        </button>
        <button onClick={() => setActiveTab('recent')} className="flex items-center gap-1">
          <Clock size={16} /> Recent
        </button>
      </div>

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