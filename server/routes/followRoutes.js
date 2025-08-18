import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../controllers/followController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(verifyToken);

// Follow a user
router.post('/follow/:userId', followUser);

// Unfollow a user
router.post('/unfollow/:userId', unfollowUser);

// Get followers of a user
router.get('/followers/:userId', getFollowers);

// Get users that a user is following
router.get('/following/:userId', getFollowing);

export default router; 