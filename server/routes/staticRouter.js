import express from 'express'
import { URL } from '../models/url.js';
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render("signup")
})
router.get('/login',(req,res)=>{
    res.render("login")
})
export default router
//update