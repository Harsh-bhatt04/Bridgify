
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 

//again change in the file
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pics", 
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

export const upload = multer({ storage });