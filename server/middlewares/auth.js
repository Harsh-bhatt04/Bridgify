import { getUser } from "../services/auth.js"

export async function restrictToLoggedinUserOnly(req,res,next){
    const userId = req.cookies?.uid
    console.log(req);
    console.log(userId);

    if(!userId) return res.redirect("/login")
    
    const user = getUser(userId)
    console.log(user);
    
    if(!user) return res.redirect("/login")

    req.user = user
    next()

}

export async function checkAuth(req,res,next){
    const userId = req.cookies?.uid

    const user = getUser(userId)  
    req.user = user
    next()
}
//update