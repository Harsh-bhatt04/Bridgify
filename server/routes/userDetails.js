import express from 'express'
import {handleUserSignUp,handleUserLogin,verifyOTP} from '../controllers/auth.js'

const router = express.Router();

router.post('/register',handleUserSignUp)
router.post('/login',handleUserLogin)
router.post('/verify-otp',verifyOTP)


export default router
//update