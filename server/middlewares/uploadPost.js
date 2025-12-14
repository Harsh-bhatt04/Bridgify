import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const postStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req,file)=>{
        const userId = req.user?.id || req.body?.userId;

        return {
            folder: `users/${userId}/posts`,
            allowed_formats: ["jpg","png","jpeg","webp","mp4","mov"],
            resource_type: "auto"
        }
    }
})

export const uploadPost = multer({postStorage})