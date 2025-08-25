import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

// Get user profile
router.get('/:id', profileController.getUserProfile);

// Update user profile (protected route)
router.put('/:username', verifyToken, profileController.updateUserProfile);

// Get user's GitHub activity
router.get('/:username/github-activity', profileController.getGitHubActivity);

// Get user's achievements
router.get('/:username/achievements', profileController.getUserAchievements);

export default router; 