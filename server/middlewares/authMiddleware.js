import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload (id, username, etc.)
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
