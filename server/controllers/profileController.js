import User from '../model/userProfile.js';
import Post from '../model/post.js';
import jwt from 'jsonwebtoken';

// Helper function to verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Get user profile by username
export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        console.log(username);
        console.log('Looking for user with username:', username);
        
        // Find user profile
        const userProfile = await User.findOne({ username })
            .populate('followers', 'username profileImage')
            .populate('following', 'username profileImage');
        
        if (!userProfile) {
            console.log('User profile not found for username:', username);
            return res.status(404).json({ 
                success: false,
                message: 'User profile not found' 
            });
        }

        console.log('Found user profile:', userProfile);
        // Get user's posts
        const posts = await Post.find({ userId: userProfile._id })
            .sort({ createdAt: -1 })
            .populate('userId', 'username profileImage');

        res.status(200).json({
            success: true,
            profile: {
                ...userProfile.toObject(),
                profilePicture: userProfile.profileImage,
                about: userProfile.bio
            },
            posts
        });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const updates = req.body;
        console.log('Update request for username:', username);
        console.log('Update data:', updates);
        
        const authHeader = req.headers.authorization;
        console.log('Auth header:', authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Check if user is authorized to update this profile
        const profile = await User.findOne({ username });
        console.log('Found profile:', profile);
        
        if (!profile) {
            console.log('Profile not found for username:', username);
            return res.status(404).json({ 
                success: false,
                message: 'Profile not found' 
            });
        }

        console.log('Profile ID:', profile._id.toString());
        console.log('Decoded user ID:', decoded.id);
        
        if (profile._id.toString() !== decoded.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to update this profile' 
            });
        }

        // Map frontend fields to backend fields
        const mappedUpdates = {
            ...updates,
            profileImage: updates.profilePicture,
            bio: updates.about
        };
        delete mappedUpdates.profilePicture;
        delete mappedUpdates.about;

        console.log('Mapped updates:', mappedUpdates);

        // Update profile
        const updatedProfile = await User.findByIdAndUpdate(
            profile._id,
            { $set: mappedUpdates },
            { new: true, runValidators: true }
        );

        console.log('Updated profile:', updatedProfile);

        res.status(200).json({
            success: true,
            profile: {
                ...updatedProfile.toObject(),
                profilePicture: updatedProfile.profileImage,
                about: updatedProfile.bio
            }
        });
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get user's GitHub activity
export const getGitHubActivity = async (req, res) => {
    try {
        const { username } = req.params;
        console.log('Looking for GitHub activity for username:', username);
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const userProfile = await User.findOne({ username });
        console.log('Found user profile for GitHub activity:', userProfile);
        
        if (!userProfile) {
            console.log('User profile not found for GitHub activity:', username);
            return res.status(404).json({ 
                success: false,
                message: 'User profile not found' 
            });
        }

        // In a real implementation, this would make an API call to GitHub
        // For now, returning mock data
        const mockActivity = [
            {
                type: 'PushEvent',
                repo: 'my-project',
                date: new Date(),
                message: 'Updated README.md'
            }
        ];

        res.status(200).json({
            success: true,
            activity: mockActivity
        });
    } catch (error) {
        console.error('Error in getGitHubActivity:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get user's achievements
export const getUserAchievements = async (req, res) => {
    try {
        const { username } = req.params;
        console.log('Looking for achievements for username:', username);
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const userProfile = await User.findOne({ username });
        console.log('Found user profile for achievements:', userProfile);
        
        if (!userProfile) {
            console.log('User profile not found for achievements:', username);
            return res.status(404).json({ 
                success: false,
                message: 'User profile not found' 
            });
        }

        // Mock achievements since they're not in the schema
        const mockAchievements = [
            {
                id: 1,
                title: "Early Adopter",
                description: "Joined in the first month",
                date: "Mar 2022",
                icon: "star"
            }
        ];

        res.status(200).json({
            success: true,
            achievements: mockAchievements
        });
    } catch (error) {
        console.error('Error in getUserAchievements:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default {
    getUserProfile,
    updateUserProfile,
    getGitHubActivity,
    getUserAchievements
}; 
//update