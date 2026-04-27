import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from "http"
import { Server } from "socket.io"

import authRoutes from './routes/userDetails.js'
import userPostRoutes from './routes/userPostRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import followRoutes from './routes/followRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import connectionRoutes from './routes/connectionRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js"
import messageRoutes from "./routes/messageRoutes.js";

import { chatSocket } from "./socket/chatSocket.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Create HTTP server (needed for Socket.IO)
const server = http.createServer(app)

// ================= SOCKET.IO =================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})

// Initialize chat socket logic
chatSocket(io)

// ================= MIDDLEWARE =================

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(cookieParser())

// ================= DATABASE =================

mongoose.connect(process.env.DB_PATH)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => {
  console.error("MongoDB Connection Error:", err)
  process.exit(1)
})

// ================= ROUTES =================

app.use('/api', authRoutes)
app.use('/api/posts', userPostRoutes)
app.use('/comments', commentRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/connections', connectionRoutes)
app.use('/api/payment', paymentRoutes)
app.use("/api", messageRoutes);


// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// ================= 404 HANDLER =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// ================= START SERVER =================

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})