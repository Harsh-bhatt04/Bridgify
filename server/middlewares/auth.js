import { getUser } from "../services/auth.js"
import jwt from 'jsonwebtoken'
export async function restrictToLoggedinUserOnly(req,res,next){
    const userId = req.cookies?.uid
    // console.log(req);
    console.log(userId);

    if(!userId) return res.redirect("/login")
    
    const user = getUser(userId)
    console.log(user);
    
    if(!user) return res.redirect("/login")

    req.user = user
    next()

}

// export async function checkAuth(req,res,next){
//     const userId = req.cookies?.id
//     console.log(userId)
//     const user = getUser(userId)  
//     req.user = user
//     next()
// }
export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // console.log(authHeader)
    try {
   // Or wherever you have your token
   const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, "supersecretjwt");
  console.log("Decoded JWT:", decoded);
  req.user = {
      id: decoded.id || decoded._id,
      username: decoded.username
    };
    
    next();
} catch (error) {
  console.error("JWT verification failed:", error.message);
}
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
//update