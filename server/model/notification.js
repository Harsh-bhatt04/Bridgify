import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['follow', 'like', 'comment'],
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add validation to ensure post and comment are only required for specific types
notificationSchema.pre('validate', function(next) {
    if (this.type === 'follow') {
        this.post = undefined;
        this.comment = undefined;
    } else if (this.type === 'like') {
        this.comment = undefined;
    }
    next();
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification; 
//update