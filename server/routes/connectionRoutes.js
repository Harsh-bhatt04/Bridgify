import express from 'express';
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getPendingRequests,
  getConnections
} from '../controllers/connectionController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/request/:receiverId', authMiddleware, sendConnectionRequest);
router.post('/accept/:requestId', authMiddleware, acceptConnectionRequest);
router.post('/reject/:requestId', authMiddleware, rejectConnectionRequest);
router.get('/pending', authMiddleware, getPendingRequests);
router.get("/", authMiddleware, getConnections);

export default router;
