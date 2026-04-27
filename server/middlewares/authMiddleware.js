import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userProfile.js";
dotenv.config();
const secret = "supersecretjwt"
export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded)
    console.log(secret)
    req.user = decoded; // attach decoded payload (id, username, etc.)
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


// export const authMiddleware = (req, res, next) => {
//   try {
//     // Get token from header or cookie
//     let token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

//     if (!token) {
//       console.log("No token provided");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach decoded payload to req.user
//     req.user = decoded;

//     // Pass control to next middleware/route handler
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);
//     return res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// };
export const authMiddleware = async (req, res, next) => {
  try {

    // Check header OR cookie
    let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { id: user._id, username: user.username };

    next();

  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};