import { useState } from "react";
import api from "../api/axios";

const CreatePost = ({ setPosts }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await api.post("/posts", { text });

      // 🔥 MAGIC LINE (real-time update)
      setPosts((prev) => [res.data.post, ...prev]);

      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post" >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        style={{ width: "100%", padding: "10px" }}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
