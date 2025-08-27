import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import { createComment, getCommentsByPost } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', checkAuth, createComment); 
router.get('/:postId', getCommentsByPost); 

export default router;
//update