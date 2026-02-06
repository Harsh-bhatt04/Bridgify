import express from 'express';
import { createPost, getPosts,updatePost, getPostById,likePost } from '../controllers/controllersPost.js';
import { checkAuth } from '../middlewares/auth.js'; // Import the middleware
import { verifyToken } from '../middlewares/authMiddleware.js';
import { uploadPost } from '../middlewares/uploadPost.js';

const router = express.Router();

router.post("/", verifyToken, uploadPost.single("media"), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', verifyToken, updatePost); // Protect this route
//router.delete('/:id', checkAuth, deletePost); // Protect this route
router.post('/like/:postId', checkAuth, likePost);
export default router;
//update