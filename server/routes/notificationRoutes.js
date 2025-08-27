import express from 'express';
import { 
    getUserNotifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    getUnreadNotificationCount 
} from '../controllers/notificationController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all notifications for the current user
router.get('/', getUserNotifications);

// Get unread notification count
router.get('/unread/count', getUnreadNotificationCount);

// Mark a specific notification as read
router.patch('/:notificationId/read', markNotificationAsRead);

// Mark all notifications as read
router.patch('/read-all', markAllNotificationsAsRead);

export default router; 
//update