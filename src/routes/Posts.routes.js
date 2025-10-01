import express from "express";
import { protect } from "../middleware/protect.js";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/Posts.controllers.js";

const router = express.Router();


router.post("/create-post", protect, createPost)
router.delete("/delete-post/:id", protect, deletePost)
router.put("/update-post/:id", protect, updatePost)
router.get("/all-posts", protect, getPosts)


export default router;