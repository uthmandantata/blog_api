import express from "express";
import { login, logout, register } from "../controllers/Auth.controllers.js";
import { isGuest } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", isGuest, register);
router.post("/login", isGuest, login);
router.post("/logout", logout);


export default router;
