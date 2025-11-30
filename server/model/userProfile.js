import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
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
    connections: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile'
    },
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {   // ✅ renamed to match controller
      type: Date,
      default: null,
    },
    isVerified: {   // ✅ added this to handle email verification
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
