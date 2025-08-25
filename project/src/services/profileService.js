const API_URL = 'http://localhost:8000/api/profile';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    const data = await response.json();
    console.log('API Response:', data); // Log the response
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

// Get user profile by username
export const getProfile = async (username) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('Fetching profile for username:', username); // Log the username
        console.log('Using token:', token.substring(0, 10) + '...'); // Log partial token for debugging

        const response = await fetch(`${API_URL}/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getProfile:', error);
        throw new Error(error.message || 'Failed to fetch profile');
    }
};

// Update user profile
export const updateProfile = async (username, updates) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('Updating profile for username:', username);
        console.log('Update data:', updates);

        const response = await fetch(`${API_URL}/${username}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateProfile:', error);
        throw new Error(error.message || 'Failed to update profile');
    }
};

// Get user's GitHub activity
export const getGitHubActivity = async (username) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('Fetching GitHub activity for username:', username);

        const response = await fetch(`${API_URL}/${username}/github-activity`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getGitHubActivity:', error);
        throw new Error(error.message || 'Failed to fetch GitHub activity');
    }
};

// Get user's achievements
export const getAchievements = async (username) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('Fetching achievements for username:', username);

        const response = await fetch(`${API_URL}/${username}/achievements`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getAchievements:', error);
        throw new Error(error.message || 'Failed to fetch achievements');
    }
}; 
//update