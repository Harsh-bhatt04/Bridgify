import User from '../model/userProfile.js';
import { createNotification } from './notificationController.js';

export async function followUser(req, res) {
    try {
        const { userId } = req.params; // ID of the user to follow
        const currentUserId = req.user.id; // ID of the current user (from JWT)

        // Check if user is trying to follow themselves
        if (userId === currentUserId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        // Find both users
        const userToFollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if already following
        if (currentUser.following.includes(userId)) {
            return res.status(400).json({ error: "You are already following this user" });
        }

        // Update both users
        await User.findByIdAndUpdate(currentUserId, {
            $push: { following: userId }
        });

        await User.findByIdAndUpdate(userId, {
            $push: { followers: currentUserId }
        });

        // Create notification for the followed user
        await createNotification(userId, currentUserId, 'follow');

        res.json({ message: "Successfully followed user" });
    } catch (error) {
        console.error('Follow error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function unfollowUser(req, res) {
    try {
        const { userId } = req.params; // ID of the user to unfollow
        const currentUserId = req.user.id; // ID of the current user (from JWT)

        // Check if user is trying to unfollow themselves
        if (userId === currentUserId) {
            return res.status(400).json({ error: "You cannot unfollow yourself" });
        }

        // Find both users
        const userToUnfollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if not following
        if (!currentUser.following.includes(userId)) {
            return res.status(400).json({ error: "You are not following this user" });
        }

        // Update both users
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userId }
        });

        await User.findByIdAndUpdate(userId, {
            $pull: { followers: currentUserId }
        });

        res.json({ message: "Successfully unfollowed user" });
    } catch (error) {
        console.error('Unfollow error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getFollowers(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('followers', 'username profileImage');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ followers: user.followers });
    } catch (error) {
        console.error('Get followers error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getFollowing(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('following', 'username profileImage');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ following: user.following });
    } catch (error) {
        console.error('Get following error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
} 
//update