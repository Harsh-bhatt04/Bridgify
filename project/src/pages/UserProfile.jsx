import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
// import { useApp } from '../context/AppContext';
import { 
  Star,
  Clock,
  Heart,
  Pin,
  Eye,
  MessageSquare,
  Trophy,
  Zap,
  GitBranch,
  Users,
  Briefcase,
  MapPin,
  Mail,
  Link
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import GitHubActivity from '../components/GitHubActivity';
// import { getProfile, updateProfile, getGitHubActivity, getAchievements } from '../services/profileService';

// Icon mapping object
const iconMap = {
  star: Star,
  clock: Clock,
  heart: Heart,
  pin: Pin,
  eye: Eye,
  messageSquare: MessageSquare,
  trophy: Trophy,
  zap: Zap,
  gitBranch: GitBranch,
  users: Users,
  briefcase: Briefcase,
  mapPin: MapPin,
  mail: Mail,
  link: Link
};

const UserProfile = () => {
  const { username: routeUsername } = useParams(); // Renamed to routeUsername
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(routeUsername); // Added state for username
// checking the changes
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        // console.log("sdfasf" , token);
        let userToFetch = routeUsername;
        // console.log(userToFetch);
        // If no username in the URL, and the user is logged in, fetch the current user's profile
        if (!userToFetch) {
          try {
            const decoded = jwtDecode(token);
            userToFetch = decoded.username;
            setUsername(decoded.username);
          } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
        }

        // Common headers for all requests
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch user profile data
        const userResponse = await fetch(`http://localhost:8000/api/profile/${userToFetch}`, {
          headers
        });

        if (userResponse.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user profile: ${userResponse.status}`);
        }

        const profileData = await userResponse.json();
        if (!profileData) {
          throw new Error('No profile data received from server');
        }

        setUserData(profileData);
        setUsername(profileData.username);

        // Fetch user posts
        const postsResponse = await fetch(`http://localhost:8000/posts/user/${userToFetch}`, {
          headers
        });
        console.log(postsResponse);
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        }

        // Fetch GitHub activity
        try {
          const githubResponse = await fetch(`http://localhost:8000/api/profile/${userToFetch}/github`, {
            headers
          });

          if (githubResponse.ok) {
            const githubActivity = await githubResponse.json();
            setGithubData(githubActivity.activity || []);
          }
        } catch (e) {
          console.error("Github fetch error", e);
          setGithubData([]);
        }

        // Fetch achievements
        try {
          const achievementsResponse = await fetch(`http://localhost:8000/api/profile/${userToFetch}/achievements`, {
            headers
          });

          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json();
            const mappedAchievements = (achievementsData.achievements || []).map(achievement => ({
              ...achievement,
              Icon: iconMap[achievement.icon] || Star
            }));
            setAchievements(mappedAchievements);
          }
        } catch (e) {
          console.error("Achievements fetch error", e);
          setAchievements([]);
        }

        
      } catch (err) {
        console.error('Error in fetchProfileData:', err);
        setError(err.message || 'Failed to fetch profile data');
        
      }
      finally{
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [routeUsername, navigate]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p className="text-lg font-semibold mb-2">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-6">
          <img 
            src={userData.profileImage || '/default-avatar.png'} // Adjust property name as needed
            alt={username}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{username}</h1>
            <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {userData.location || "N/A"}
              </span>
              <a href={userData.website} className="flex items-center text-blue-500 hover:underline"  target="_blank" rel="noopener noreferrer">
                <Link className="w-4 h-4 mr-1" />
                 Website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`pb-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-2 ${activeTab === 'projects' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`pb-2 ${activeTab === 'activity' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 dark:text-gray-300">{userData.about || "No information available."}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">Achievements</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.Icon;
                return (
                  <div key={achievement.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-6 h-6 text-blue-500" />
                      <h3 className="font-semibold">{achievement.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {achievement.description}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {achievement.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ProjectCard key={post._id} project={post} />
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <GitHubActivity data={githubData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;