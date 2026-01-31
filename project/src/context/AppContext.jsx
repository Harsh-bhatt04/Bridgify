import { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from './ProjectContext';
import { jwtDecode } from "jwt-decode"; 
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {projects,setProjects} = useProjects()
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    // const checkAuth = async () => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       // Here you would typically validate the token with your backend
    //       // For now, we'll just check if it exists

    //       setIsAuthenticated(true);
          
    //       // If you have user data in localStorage, use it
    //       const storedUser = localStorage.getItem('user');
    //       if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //       }
    //     } catch (error) {
    //       console.error('Auth check failed:', error);
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('user');
    //       setIsAuthenticated(false);
    //       setUser(null);
    //     }
    //   }
    // };

    // checkAuth();
     const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // decode JWT
        setUser({ _id: decoded.id, username: decoded.username });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('JWT decode failed:', error);
        setUser(null);
        setIsAuthenticated(false);
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

  // const toggleLikeProject = (projectId) => {
  //   setProjects(prev => {
  //     const updatedOverview = prev.overview.map(p => 
  //       p._id === projectId ? { ...p, isLiked: !p.isLiked } : p
  //     );
  //     return {
  //       ...prev,
  //       overview: updatedOverview,
  //       liked: updatedOverview.filter(p => p.isLiked)
  //     };
  //   });

  // };
  const toggleLikeProject = async (projectId) => {
  try {
    const token = localStorage.getItem("token")
    // ✅ Call backend API
    if(!token){
      alert("Please login to like the post")
      return
    }
    const res = await fetch(`http://localhost:8000/api/posts/like/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await res.json();
    console.log("res", data)
    // ✅ Update state using likes array from backend
    // setProjects(prev => ({
    //   ...prev,
    //   overview: prev.overview?.map(project =>
    //     project._id === projectId
    //       ? { ...project, likes: data.likes }
    //       : project
    //   )
    // }));
    setProjects(prev =>
  prev.map(project =>
    project._id === projectId
      ? { ...project, likes: data.likes }
      : project
  )
);

  } catch (error) {
    console.error("Like error:", error);
  }
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
//update