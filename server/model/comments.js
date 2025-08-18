import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  }, { timestamps: true });  // Corrected: timestamps should be in an options object
  
  const Comment = mongoose.model('Comment', commentSchema);
  export default Comment;