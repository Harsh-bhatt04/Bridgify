import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/userProfile.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

export async function handleUserSignUp(req, res) {
    try {
        const { username, email, password } = req.body
        console.log(req.body);
        if (!password || !username || !email) {
            return res.status(400).json({ error: "Please fill all the required details" })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            // socialHandleLinks: socialHandleLinks || []
        })

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in the environment variables") })(),
            { expiresIn: '24h' }
        )

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })

        // Return user data without password
        const userData = {
            id: user._id,
            name: user.username,
            email: user.email,
            // socialHandleLinks: user.socialHandleLinks
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: userData
        })
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id,username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        })

        // Return user data without password
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            socialHandleLinks: user.socialHandleLinks
        }

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: userData
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function handleLogout(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        res.json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export default router
//update