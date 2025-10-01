import Post from '../models/Posts.models.js'

export const createPost = async (req, res) => {
    const { title, desc } = req.body;
    try {
        if (!title || !desc) {
            return res.status(400).json({ success: false, message: "Title and content are required." })
        }
        const postExists = await Post.findOne({ title })
        if (postExists) {
            return res.status(400).json({ success: false, message: "Post already Exists!" })
        }
        const newPost = new Post({
            user: req.user._id, title, desc,
        })
        await newPost.save();
        return res.status(201).json({
            success: true,
            message: "Post created successfully!",
            post: newPost,
        });
    } catch (error) {
        console.error("Error in createPost:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while creating post",
        });
    }
}

export const getPosts = async (req, res) => {
    try {
        const userId = req.user._id

        const allPosts = await Post.find().sort({ createdAt: -1 });


        if (!allPosts || allPosts.length === 0) {
            return res.status(404).json({ success: false, message: "There are NO posts. Create one" })
        }


        return res.status(200).json({
            success: true,
            count: allPosts.length,
            allPosts

        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while getting all posts",
        });
    }
}

export const updatePost = async (req, res) => {
    const { title, desc } = req.body;
    try {

        const postId = req.params.id
        const postExists = await Post.findById(postId)
        if (!postExists) {
            return res.status(404).json({ success: false, message: "Post Does Not Exists!" })
        }

        if (req.user.role !== "admin" && postExists.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to delete this post",
            });
        }

        if (title) postExists.title = title;
        if (desc) postExists.desc = title;

        const updatedPost = await postExists.save();


        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost,

        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating post",
        });
    }
}

export const deletePost = async (req, res) => {

    try {
        const postId = req.params.id
        const postExists = await Post.findById(postId)
        if (!postExists) {
            return res.status(404).json({ success: false, message: "Post Does Not Exists!" })
        }


        if (req.user.role !== "admin" && postExists.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to delete this post",
            });
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",

        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting post",
        });
    }
}



