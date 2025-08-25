import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  Link,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import GitHubActivity from "../components/GitHubActivity";

// ---- Config: base URL for your backend ----
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

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
  link: Link,
};

const UserProfile = () => {
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(routeUsername);

  // For file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cacheBust, setCacheBust] = useState(0); // force image refresh after upload

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please choose a file");

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      setUploading(true);
      const res = await axios.put(
        `${API_BASE}/api/user/profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setUserData((prev) => ({ ...prev, profileImage: res.data.profileImage }));

        // 🔹 persist to localStorage
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        storedUser.profileImage = res.data.profileImage;
        localStorage.setItem("user", JSON.stringify(storedUser));

        setSelectedFile(null);
        setCacheBust(Date.now());
        alert("Profile picture updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading profile picture");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        let userToFetch = routeUsername;
        if (!userToFetch) {
          try {
            const decoded = jwtDecode(token);
            userToFetch = decoded.username;
            setUsername(decoded.username);
          } catch (error) {
            console.error("Error decoding token:", error);
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Fetch user profile
        const userResponse = await fetch(`${API_BASE}/api/profile/${userToFetch}`, {
          headers,
        });

        if (userResponse.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user profile: ${userResponse.status}`);
        }

        const profileData = await userResponse.json();
        if (!profileData) throw new Error("No profile data received from server");

        setUserData(profileData);
        setUsername(profileData.username);

        // Fetch posts
        const postsResponse = await fetch(`${API_BASE}/posts/user/${userToFetch}`, {
          headers,
        });
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        }

        // Fetch GitHub activity
        try {
          const githubResponse = await fetch(
            `${API_BASE}/api/profile/${userToFetch}/github`,
            { headers }
          );
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
          const achievementsResponse = await fetch(
            `${API_BASE}/api/profile/${userToFetch}/achievements`,
            { headers }
          );
          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json();
            const mappedAchievements = (achievementsData.achievements || []).map(
              (achievement) => ({
                ...achievement,
                Icon: iconMap[achievement.icon] || Star,
              })
            );
            setAchievements(mappedAchievements);
          }
        } catch (e) {
          console.error("Achievements fetch error", e);
          setAchievements([]);
        }
      } catch (err) {
        console.error("Error in fetchProfileData:", err);
        setError(err.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [routeUsername, navigate]);

  // Helper: build absolute URL for stored relative paths like "/uploads/xxxx.jpg"
 const getProfileImgSrc = () => {
  if (!userData?.profileImage) return "/default-avatar.png";

  const src = userData.profileImage.startsWith("http")
    ? userData.profileImage
    : `${API_BASE}${userData.profileImage}`;

  return `${src}?t=${Date.now()}`;
};


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
            src={getProfileImgSrc()}
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
              {userData.website && (
                <a
                  href={userData.website}
                  className="flex items-center text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link className="w-4 h-4 mr-1" />
                  Website
                </a>
              )}
            </div>

            {/* Upload Profile Picture */}
            <div className="mt-4 flex items-center">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className={`ml-2 px-4 py-2 text-white rounded ${
                  uploading || !selectedFile
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`pb-2 ${
              activeTab === "overview" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 ${
              activeTab === "projects" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`pb-2 ${
              activeTab === "activity" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {userData.about || "No information available."}
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.Icon;
                return (
                  <div
                    key={achievement.id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
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

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ProjectCard key={post._id} project={post} />
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <GitHubActivity data={githubData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
