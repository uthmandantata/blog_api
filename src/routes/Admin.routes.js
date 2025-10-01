import express from "express";
import { isAdmin, protect } from "../middleware/protect.js";
import { adminDashboard, banUser, createAdmin, deleteUser, getUsers } from "../controllers/Admin.controllers.js";


const router = express.Router();

router.get("/users", protect, isAdmin, getUsers);
router.get("/admin-dashboard", protect, isAdmin, adminDashboard);
router.post("/create-admin", protect, isAdmin, createAdmin);
router.delete("/delete-user/:id", protect, isAdmin, deleteUser);
router.put("/user-banned/:id", protect, isAdmin, banUser);


export default router;