import Notification from '../model/notification.js';
import User from '../model/userProfile.js';
import Post from '../model/post.js';

// Create a new notification
export async function createNotification(recipientId, senderId, type, postId = null, commentId = null) {
    try {
        console.log('Creating notification with:', { recipientId, senderId, type, postId, commentId });
        
        const notificationData = {
            recipient: recipientId,
            sender: senderId,
            type,
            read: false
        };

        // Only add post and comment if they exist
        if (postId) notificationData.post = postId;
        if (commentId) notificationData.comment = commentId;

        const notification = await Notification.create(notificationData);
        console.log('Created notification:', notification);

        // Populate the notification with all necessary data
        const populatedNotification = await Notification.findById(notification._id)
            .populate('sender', 'username profileImage')
            .populate('post')
            .populate('comment');

        console.log('Populated notification:', populatedNotification);
        return populatedNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
}

// Get all notifications for a user
export async function getUserNotifications(req, res) {
    try {
        const userId = req.user.id;
        console.log('Fetching notifications for user:', userId);
        
        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'sender',
                select: 'username profileImage'
            })
            .populate({
                path: 'post',
                select: 'content media'
            })
            .populate({
                path: 'comment',
                select: 'text'
            });

        console.log('Found notifications:', notifications);
        
        res.json({
            success: true,
            notifications
        });
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching notifications"
        });
    }
}

// Mark notification as read
export async function markNotificationAsRead(req, res) {
    try {
        const { notificationId } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, recipient: userId },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.json({
            success: true,
            notification
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({
            success: false,
            message: "Error updating notification"
        });
    }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(req, res) {
    try {
        const userId = req.user.id;

        await Notification.updateMany(
            { recipient: userId, read: false },
            { read: true }
        );

        res.json({
            success: true,
            message: "All notifications marked as read"
        });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({
            success: false,
            message: "Error updating notifications"
        });
    }
}

// Get unread notification count
export async function getUnreadNotificationCount(req, res) {
    try {
        const userId = req.user.id;

        const count = await Notification.countDocuments({
            recipient: userId,
            read: false
        });

        res.json({
            success: true,
            count
        });
    } catch (error) {
        console.error('Error getting unread notification count:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching notification count"
        });
    }
} 