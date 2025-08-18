import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: {
            type: [String],
            default: [],
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: [],
        }],
        tags: [{
            type: String,
            default: [],
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        collabRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }],
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
