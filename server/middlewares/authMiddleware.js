import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded); //  Inspect this!

    req.body.userId = decoded.id;  //  <---  Use the CORRECT property name
    console.log("userId attached to req.body:", req.body.userId);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
//update