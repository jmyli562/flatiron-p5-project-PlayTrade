import React from "react";

function CommentList({ comments }) {
  return (
    <div>
      {comments.map((comment, commentIndex) => (
        <div key={commentIndex} className="comment">
          <p>Comment left by: {comment.user.username}</p>
          <p>Date: {comment.posted_at}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
