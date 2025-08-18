import express from 'express'
import {handleUserSignUp,handleUserLogin} from '../controllers/auth.js'

const router = express.Router();

router.post('/register',handleUserSignUp)
router.post('/login',handleUserLogin)




export default router