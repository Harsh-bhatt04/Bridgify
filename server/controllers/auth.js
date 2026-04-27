import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userProfile.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

import sendEmail from "../services/sendEmail.js";

// ======================= SIGN UP =======================
export async function handleUserSignUp(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!password || !username || !email) {
      return res.status(400).json({ success: false, message: "Please fill all the required details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 min expiry
    });

    // Send Welcome + OTP email
    const message = `
  <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; background: #f9f9f9; border: 1px solid #e0e0e0;">
    <h2 style="color: #4f46e5; text-align: center;">Welcome, ${username} 🎉</h2>
    <p style="font-size: 16px; color: #333; text-align: center;">
      Thanks for signing up. Please verify your email using the OTP below:
    </p>
    <div style="margin: 30px 0; text-align: center;">
      <span style="display: inline-block; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #fff; background: #4f46e5; padding: 10px 20px; border-radius: 8px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 14px; color: #666; text-align: center;">
      This OTP is valid for <strong>10 minutes</strong>.
    </p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #888; text-align: center;">
      If you didn’t sign up, please ignore this email.
    </p>
  </div>
`;


    await sendEmail(email, "Verify your email", message);

    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ======================= VERIFY OTP =======================
export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    // console.log(req.body)
    const user = await User.findOne({email,otp,otpExpires: { $gt: Date.now() }})
    console.log(user)
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ======================= LOGIN =======================
export async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    const userData = {
  id: user._id,
  username: user.username,
  email: user.email,
  socialHandleLinks: user.socialHandleLinks,
  plan: user.plan,              // 🔥 NEW
  planExpiresAt: user.planExpiresAt, // 🔥 NEW
};

    res.json({ success: true, message: "Login successful", token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ======================= LOGOUT =======================
export async function handleLogout(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default router;
