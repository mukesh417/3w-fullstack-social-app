const PostCard = ({ post, onLike, onComment, setPosts }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const isLiked = post.likes.includes(userId);

  return (
    <div className="post-card">
      {/* Username */}
      <div className="post-user">{post.user.name}</div>

      {/* Post text */}
      <div className="post-text">{post.text}</div>

      {/* Stats */}
      <div className="post-stats">
        Likes: {post.likes.length} | Comments: {post.comments.length}
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button
          onClick={() => onLike(post._id)}
          className={isLiked ? "liked" : ""}
        >
          ❤️ {isLiked ? "Liked" : "Like"}
        </button>
      </div>

      {/* Comment Input */}
      <div className="comment-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={post.commentText || ""}
          onChange={(e) =>
            setPosts((prev) =>
              prev.map((p) =>
                p._id === post._id
                  ? { ...p, commentText: e.target.value }
                  : p
              )
            )
          }
        />

        <button onClick={() => onComment(post._id, post.commentText)}>
          💬 Comment
        </button>
      </div>

      {/* Comments List */}
      {post.comments.length > 0 && (
        <div className="comments-list">
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <strong>{comment.user?.name || "User"}:</strong>{" "}
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
