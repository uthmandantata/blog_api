import express from "express";
import { protect } from "../middleware/protect.js";
import { deleteProfile, getMyPost, myProfile, updateProfile } from "../controllers/Users.controllers.js";

const router = express.Router();

router.get("/profile", protect, myProfile);
router.get("/my-posts", protect, getMyPost);
router.put("/profile/:id", protect, updateProfile);
router.delete("/delete-profile", protect, deleteProfile);

export default router;