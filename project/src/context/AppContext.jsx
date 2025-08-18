import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Demo projects data
const demoProjects = {
  overview: [
    {
      id: 1,
      title: "SmartHub",
      description: "A social platform for developers to showcase their projects and collaborate with others",
      techStack: ["React", "Node.js", "MongoDB"],
      status: "Open to Collaborate",
      upvotes: 42,
      views: 1200,
      comments: 15,
      isPinned: true,
      isLiked: false
    },
    {
      id: 2,
      title: "AI Assistant",
      description: "An AI-powered personal assistant using natural language processing",
      techStack: ["Python", "TensorFlow", "React"],
      status: "Showcase Only",
      upvotes: 28,
      views: 850,
      comments: 8,
      isPinned: true,
      isLiked: true
    },
    {
      id: 3,
      title: "DevConnect",
      description: "Real-time developer networking platform with video chat",
      techStack: ["Vue.js", "Firebase", "WebRTC"],
      status: "In Progress",
      upvotes: 12,
      views: 320,
      comments: 5,
      isPinned: false,
      isLiked: false
    },
    {
      id: 4,
      title: "CodeCollab",
      description: "Real-time collaborative code editor with syntax highlighting",
      techStack: ["React", "Socket.io", "PostgreSQL"],
      status: "Open Source",
      upvotes: 156,
      views: 2400,
      comments: 32,
      isPinned: false,
      isLiked: true
    },
    {
      id: 5,
      title: "BlockchainVote",
      description: "Secure voting system built on blockchain technology",
      techStack: ["Solidity", "Ethereum", "Web3.js", "React"],
      status: "Open to Collaborate",
      upvotes: 89,
      views: 1500,
      comments: 23,
      isPinned: true,
      isLiked: false
    },
    {
      id: 6,
      title: "EcoTrack",
      description: "IoT-based environmental monitoring system with real-time analytics",
      techStack: ["Arduino", "Python", "MQTT", "React Native"],
      status: "In Progress",
      upvotes: 67,
      views: 980,
      comments: 19,
      isPinned: false,
      isLiked: true
    },
    {
      id: 7,
      title: "HealthAI",
      description: "AI-powered health diagnosis and recommendation system",
      techStack: ["Python", "scikit-learn", "FastAPI", "React"],
      status: "Showcase Only",
      upvotes: 134,
      views: 2100,
      comments: 45,
      isPinned: false,
      isLiked: true
    },
    {
      id: 8,
      title: "CryptoTrader",
      description: "Automated cryptocurrency trading bot with ML predictions",
      techStack: ["Python", "TensorFlow", "Node.js", "MongoDB"],
      status: "Open Source",
      upvotes: 245,
      views: 3400,
      comments: 67,
      isPinned: true,
      isLiked: true
    },
    {
      id: 9,
      title: "ARLearn",
      description: "Augmented reality educational platform for interactive learning",
      techStack: ["Unity", "C#", "ARKit", "Firebase"],
      status: "In Progress",
      upvotes: 78,
      views: 1100,
      comments: 25,
      isPinned: false,
      isLiked: false
    },
    {
      id: 10,
      title: "SmartHome Hub",
      description: "IoT home automation system with voice control",
      techStack: ["Raspberry Pi", "Python", "Node.js", "React"],
      status: "Open to Collaborate",
      upvotes: 112,
      views: 1800,
      comments: 34,
      isPinned: false,
      isLiked: true
    },
    {
      id: 11,
      title: "CloudDeploy",
      description: "Automated cloud deployment and scaling platform",
      techStack: ["Docker", "Kubernetes", "Go", "Vue.js"],
      status: "Showcase Only",
      upvotes: 167,
      views: 2900,
      comments: 41,
      isPinned: true,
      isLiked: false
    },
    {
      id: 12,
      title: "SecureChat",
      description: "End-to-end encrypted messaging app with self-destructing messages",
      techStack: ["Flutter", "Firebase", "Node.js"],
      status: "Open Source",
      upvotes: 198,
      views: 3200,
      comments: 56,
      isPinned: false,
      isLiked: true
    }
  ]
};

// Initialize pinned and liked arrays based on the overview array
demoProjects.pinned = demoProjects.overview.filter(p => p.isPinned);
demoProjects.liked = demoProjects.overview.filter(p => p.isLiked);
demoProjects.recent = demoProjects.overview.slice(0, 6); // Last 6 projects as recent

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState(demoProjects);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Here you would typically validate the token with your backend
          // For now, we'll just check if it exists
          setIsAuthenticated(true);
          
          // If you have user data in localStorage, use it
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  // Project actions
  const addProject = (project) => {
    setProjects(prev => ({
      ...prev,
      overview: [project, ...prev.overview]
    }));
  };

  const togglePinProject = (projectId) => {
    setProjects(prev => {
      const updatedOverview = prev.overview.map(p => 
        p.id === projectId ? { ...p, isPinned: !p.isPinned } : p
      );
      return {
        ...prev,
        overview: updatedOverview,
        pinned: updatedOverview.filter(p => p.isPinned)
      };
    });
  };

  const toggleLikeProject = (projectId) => {
    setProjects(prev => {
      const updatedOverview = prev.overview.map(p => 
        p.id === projectId ? { ...p, isLiked: !p.isLiked } : p
      );
      return {
        ...prev,
        overview: updatedOverview,
        liked: updatedOverview.filter(p => p.isLiked)
      };
    });
  };

  // User actions
  const login = async (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const followUser = async (userId) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Following user:', userId);
      // Update local state
      setUser(prev => ({
        ...prev,
        following: [...prev.following, userId]
      }));
      addNotification('Successfully followed user');
    } catch (error) {
      addNotification('Failed to follow user', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (userId, message) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Sending message to user:', userId, message);
      addNotification('Message sent successfully');
    } catch (error) {
      addNotification('Failed to send message', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Connection requests
  const handleConnectionRequest = async (requestId, action) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Handling connection request:', requestId, action);
      // Update local state
      setUser(prev => ({
        ...prev,
        pendingRequests: {
          ...prev.pendingRequests,
          connections: prev.pendingRequests.connections.filter(r => r.id !== requestId)
        }
      }));
      addNotification(`Connection request ${action}d successfully`);
    } catch (error) {
      addNotification(`Failed to ${action} connection request`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Collaboration requests
  const handleCollaborationRequest = async (requestId, action) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Handling collaboration request:', requestId, action);
      // Update local state
      setUser(prev => ({
        ...prev,
        pendingRequests: {
          ...prev.pendingRequests,
          collaborations: prev.pendingRequests.collaborations.filter(r => r.id !== requestId)
        }
      }));
      addNotification(`Collaboration request ${action}d successfully`);
    } catch (error) {
      addNotification(`Failed to ${action} collaboration request`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Notification system
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      login,
      logout,
      projects,
      setProjects,
      notifications,
      isLoading,
      addProject,
      togglePinProject,
      toggleLikeProject,
      followUser,
      sendMessage,
      handleConnectionRequest,
      handleCollaborationRequest,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 