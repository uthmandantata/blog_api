import User from "../models/User.models.js"
import Post from "../models/Posts.models.js"
import bcrypt from 'bcryptjs'



export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({ succes: false, message: "There are no Users" })
        }
        return res.status(200).json({
            success: true,
            count: allUsers.length,
            users: allUsers
        })
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({
            success: false,
            messgae: "Error in getUsers Controller"
        })
    }
}
export const adminDashboard = async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        const allPosts = await Post.find();
        const postCount = allPosts.length
        const bannedUsers = await User.find({ isBanned: true });
        const bannedUsersCount = bannedUsers.length;

        return res.status(200).json({
            success: true,
            allUsers,
            allPosts,
            bannedUsersCount,
            postCount

        })
    } catch (error) {
        console.error("Error in adminDashboard:", error);
        return res.status(500).json({
            success: false,
            messgae: "Error in adminDashboard Controller"
        })
    }
}

export const banUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User Does Not Exists!" })
        }

        // prevent banning other admins (optional safeguard)
        if (user.role === "admin") {
            return res.status(403).json({ success: false, message: "Cannot ban another admin" });
        }

        user.isBanned = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User successfully banned",
            userBanned: {
                id: user._id,
                username: user.username,
                email: user.email,
                isBanned: user.isBanned
            }
        });
    } catch (error) {
        console.error("Error in banUser:", error);
        return res.status(500).json({
            success: false,
            messgae: "Error in banUser Controller"
        })
    }
}

export const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Go to 'Delete Profile' to delete your own account"
            });
        }
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: `User ${user.username} Deleted!`
        });
    } catch (error) {
        console.log("Error in deleteUser: ", error)
        return res.status(500).json({
            success: false,
            message: `Error in deleteUser Controller`
        });
    }
}

export const createAdmin = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const userExisits = await User.findOne({ username });
        if (userExisits) {
            return res.status(401).json({
                success: false,
                message: "User already exisits"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            createdBy: req.user._id,
            role: "admin"
        })

        await newUser.save();



        return res.status(200).json({
            success: true,
            message: `New admin ${username} created`,
            newUser
        })
    } catch (error) {
        console.error("Error in createAdmin:", error);
        return res.status(500).json({
            success: false,
            messgae: "Error in createAdmin Controller"
        })
    }
}
