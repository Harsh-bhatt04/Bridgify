import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 
import User from "../model/userProfile.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pics", 
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const upload = multer({ storage });

// Route: update profile picture
router.post("/upload-profile-pic", upload.single("profilePic"), async (req, res) => {
  try {
    const userId = req.body.userId; 
    console.log("Received userId:", userId);
    const imageUrl = req.file.path; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );

    res.json({ success: true, message: "Profile picture updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
