import User from '../models/User.models.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndCookies } from '../utils/generatTokensAndCookies.js';


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User does not exist! Please register" });
        }
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        if (userExists.isBanned) {
            return res.status(403).json({ success: false, message: "Your account is banned. Contact admin." });
        }
        generateTokenAndCookies(res, userExists._id)


        res.status(200).json(userExists);

    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Login Controller", error: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({ username });

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists! Login" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: `User ${username} was created`,
            user: { id: newUser._id, email: newUser.email, name: newUser.username }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Register Controller", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", req.cookies.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/'
        });

        res.status(200).json({ success: true, message: "Logged out successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Error in Logout Controller", error: error.message });
    }
}
