
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
      <p>By: {comment.author}</p>
    </div>
  );
};

export default Comment;
