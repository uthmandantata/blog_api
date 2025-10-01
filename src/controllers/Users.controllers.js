import Post from "../models/Posts.models.js";
import bcrypt from "bcryptjs";
import User from "../models/User.models.js";

export const myProfile = async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user._id
        const myPosts = await Post.find({ user: userId }).sort({ createdAt: -1 });

        // Remove sensitive info
        const safeUser = {
            _id: userId,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            posts: myPosts,
            role: user.role
        };

        return res.status(200).json({
            success: true,
            user: safeUser,

        });
    } catch (error) {
        console.error("Error in myProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error in myProfile controller"
        });
    }
};

export const getMyPost = async (req, res) => {
    try {
        const userId = req.user._id

        const myPosts = await Post.find({ user: userId }).sort({ createdAt: -1 });

        if (!myPosts || myPosts.length === 0) {
            return res.status(404).json({ success: false, message: "You do not have any posts!" })
        }


        return res.status(200).json({
            success: true,
            count: myPosts.length,
            myPosts

        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while getting my posts",
        });
    }
}


export const updateProfile = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userId = req.user._id
        const myProfile = await User.findById(userId);


        if (username) myProfile.username = username;
        if (email) myProfile.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            myProfile.password = hashedPassword;
        }

        await myProfile.save();

        const { password: _, ...safeUser } = myProfile.toObject();

        return res.status(200).json({
            success: true,
            message: "User successfully updated",
            updatedUser: safeUser
        })
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while editing my profile",
        });
    }
}

export const deleteProfile = async (req, res) => {

    try {
        const userId = req.user._id

        await User.findByIdAndDelete(userId);
        res.clearCookie("token", req.cookies.token, {
            httpOnly: true,
            secure: process.env.NODE_EVN === "productions",
            sameSite: "strict",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "Your Account has been deleted"
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while editing my profile",
        });
    }
}