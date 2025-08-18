import Comment from "../model/comments.js";
import Post from "../model/post.js";
import { createNotification } from './notificationController.js';

export const createComment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;
    
        // Validate required fields
        if (!userId || !postId || !text) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Verify that the post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
    
        // Create the new comment
        const newComment = new Comment({
          userId,
          postId,
          text,
        });
    
        const savedComment = await newComment.save();
    
        // Add the comment's ID to the post's comments array
        console.log(savedComment);
        post.comments.push(savedComment._id);
        await post.save();

        // Create notification for the post owner if the commenter is not the post owner
        if (post.userId.toString() !== userId) {
            await createNotification(post.userId, userId, 'comment', postId, savedComment._id);
        }
    
        res.status(201).json(savedComment);
      } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
      }
};

export const getCommentsByPost = async (req, res) => {
    try {
      const { postId } = req.params;
  
      // Verify that the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      // Find all comments for the post, and populate the userId
      const comments = await Comment.find({ postId })
        .populate({
          path: 'userId',
          select: 'username profileImage', //  get username and profileImage
        })
        .sort({ createdAt: -1 }); // Sort by most recent first
  
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
};

export const like = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        console.log(req.body);
        
        // Validate required fields
        if (!postId || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Verify that the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            // If already liked, remove the like
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            // If not liked, add the like
            post.likes.push(userId);
        }

        // Save the updated post
        await post.save();

        res.status(200).json({
            message: alreadyLiked ? "Post unliked successfully" : "Post liked successfully",
            likes: post.likes.length,
        });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Failed to like post" });
    }
};