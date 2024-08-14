// CommentsSection.js
import React, { useState } from 'react';

const CommentsSection = ({ video }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
    </div>
  );
};

export default CommentsSection;
