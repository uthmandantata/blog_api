import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import authRoutes from './routes/Auth.routes.js'
import userRoutes from './routes/User.routes.js'
import postRoutes from './routes/Posts.routes.js'
import adminRoutes from './routes/Admin.routes.js'
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser()); // must be before routes

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/admin', adminRoutes)


app.listen(PORT, () => {
    dbConnect();
    console.log(`Server running on port: ${PORT}`)
})