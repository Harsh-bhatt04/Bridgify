import Post from '../model/post.js';
import User from '../model/userProfile.js'; 
// import Comment from '../model/comments.js'
import mongoose from 'mongoose';
import { createNotification } from './notificationController.js';

export const createPost = async (req, res) => {
    try {
        const { content, media, tags, userId } = req.body; 
        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Create new post
        const newPost = new Post({
            userId: userId, 
            content,
            media: media || [],
            tags: tags || [],
        });
        console.log(newPost);
        const savedPost = await newPost.save();
        if (!user.posts) {
            user.posts = []; // Initialize user.posts if it's undefined
          }
        user.posts.push(savedPost._id);
        await user.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};

export const getPosts = async (req, res) => {
  try {
      const posts = await Post.find()
          .sort({ createdAt: -1 })
          .populate({
              path: 'userId',
              select: 'username profileImage',
          })
          .populate({  //  Populate the comments, and then the userId within each comment
              path: 'comments',
              populate: {
                  path: 'userId',
                  select: 'username profileImage'
              }
          });
      res.json(posts);
  } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
      const postId = req.params.id;
      const { content, media, tags } = req.body;
      const userId = req.body.userId; //  Get userId from req.body, which should be populated by verifyToken

      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: "Post not found" });
      }
      console.log(postId);
      console.log(userId);

      // Check if the user is authorized to update the post
      if (post.userId.toString() !== userId) {
          return res.status(403).json({ error: "Unauthorized: You can only update your own posts" });
      }

      // Update post
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { content, media, tags },
          { new: true } // Return the updated post
      );
      res.json(updatedPost);
  } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
  }
};

  export const getPostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId)
        .populate({
          path: 'userId',
          select: 'username profileImage'
        })
         .populate({
          path: 'comments',  // Populate the comments field in Post
          populate: {       //  and populate the userId field in Comment
            path: 'userId',
            select: 'username profileImage'
          }
        });
        console.log(post);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  };
  
  export const likePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const  userId  = req.user?.id || req.body?.userId; // Get userId from req.user if available, else from req.body
  
      console.log("postId:", postId);  // Debug: Check the value of postId
  
      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Convert userId to Mongoose ObjectId
      const userIdObj =  userId instanceof mongoose.Types.ObjectId ? userId : new mongoose.Types.ObjectId(userId);
  
  
      // Check if the user has already liked the post
      const hasLiked = post.likes.some(likeId => likeId.toString() === userIdObj.toString());
  
      if (hasLiked) {
        // Unlike the post: Remove the user's ID from the likes array
        post.likes = post.likes.filter(likeId => likeId.toString() !== userIdObj.toString());
        await post.save();
        return res.status(200).json({ message: 'Post unliked', likes: post.likes.length });
      } else {
        // Like the post: Add the user's ID to the likes array
        post.likes.push(userIdObj);
        await post.save();
        
        // Create notification for the post owner
        if (post.userId.toString() !== userIdObj.toString()) {
          await createNotification(post.userId, userIdObj, 'like', postId);
        }
        
        return res.status(200).json({ message: 'Post liked', likes: post.likes.length });
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  //update