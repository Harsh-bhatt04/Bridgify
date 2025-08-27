import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { // Changed from 'type' to 'username'
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    socialHandleLinks: {
      type: [String],
      default: [],
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true } //  Corrected placement.  It's an options object.
);

const User = mongoose.model("User", userSchema);
export default User;
//update
