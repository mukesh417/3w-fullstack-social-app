const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user);
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = await Post.create({
      user: req.user._id,
      text,
      image,
    });

    res.status(201).json( { 
         message: "Post created",post });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString(),
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user,
      text,
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
  .populate("comments.user", "name");

res.status(201).json({
  message: "Comment added",
  comments: populatedPost.comments,
});


  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
