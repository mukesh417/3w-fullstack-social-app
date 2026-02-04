import { useEffect, useState } from "react";
import api from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // 💬 COMMENT
  const handleComment = async (postId, text) => {
    if (!text || !text.trim()) return;

    try {
      const res = await api.post(`/posts/${postId}/comment`, { text });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: res.data.comments, commentText: "" }
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
            ? { ...post, likes: Array(res.data.likes).fill("x") }
            : post
        )
      );
    } catch (err) {
      console.error("Like error", err);
      alert("Failed to like post");
    }
  };

  // 📥 FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      {/* 🔝 NAVBAR (Logout handled here) */}
      <Navbar />

      <h2 className="feed-title" >Feed</h2>

      {/* ✍️ CREATE POST */}
      <CreatePost setPosts={setPosts} />

      {posts.length === 0 && <p>No posts yet</p>}

      {/* 🧱 POSTS */}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
};

export default Feed;
