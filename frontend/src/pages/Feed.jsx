import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // ✅ FIX 1

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 📥 FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data || []); // ✅ SAFE
    } catch (err) {
      console.error("Error fetching posts", err);
      setPosts([]); // ✅ prevent crash
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 💬 COMMENT
  const handleComment = async (postId, text) => {
    if (!text || !text.trim()) return;

    try {
      const res = await api.post(`/posts/${postId}/comment`, { text });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: res.data.comments }
            : post
        )
      );
    } catch (err) {
      console.error("Comment error", err);
      alert("Failed to add comment");
    }
  };

  // ❤️ LIKE
  const handleLike = async (postId) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: res.data.likes }
            : post
        )
      );
    } catch (err) {
      console.error("Like error", err);
      alert("Failed to like post");
    }
  };

  return (
    <div className="feed-container">
      {/* 🔝 NAVBAR */}
      <Navbar />

      <h2 className="feed-title">Feed</h2>

      {/* ✍️ CREATE POST */}
      <CreatePost setPosts={setPosts} />

      {/* 🧱 POSTS / EMPTY STATE */}
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#888" }}>
          No posts yet 🚀 Be the first one to create a post.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            setPosts={setPosts}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
