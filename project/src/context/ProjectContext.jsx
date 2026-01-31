import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // ✅ Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      console.log("Fetching current user...");

      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.id;

      } catch (err) {
        console.error('Invalid token', err);
        return;
      }

      const res = await fetch(`http://localhost:8000/api/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data.posts)
        // console.log(data.posts)
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add project (after upload)
  const addProject = (project) => {                                     // ✅ updated
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        ...project,
        id: project._id || Date.now(),
        createdAt: project.createdAt || new Date().toISOString(),
      },
    ]);
  };

  // ✅ Delete project (optional for dashboard buttons)
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, loading, error, addProject, fetchProjects, deleteProject,setProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};