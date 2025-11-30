import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/userDetails.js'
import userPostRoutes from './routes/userPostRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import followRoutes from './routes/followRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import connectionRoutes from './routes/connectionRoutes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.DB_PATH)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
});

// Routes
app.use('/api', authRoutes);
app.use('/posts', userPostRoutes);
app.use('/comments', commentRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/connections', connectionRoutes);
app.use("/api/profile", profileRoutes);
//new git added now you check here
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//update