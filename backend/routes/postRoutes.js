const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");

// Create post (protected)
router.post("/", protect, createPost);

// Public feed
router.get("/", getAllPosts);

// Like / Unlike post (protected)
router.post("/:id/like", protect, likePost);

// Comment on post (protected)
router.post("/:id/comment", protect, commentPost);

module.exports = router;
