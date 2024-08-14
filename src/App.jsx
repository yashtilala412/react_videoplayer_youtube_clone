// WatchedHistory.js
import React, { useState } from 'react';

const WatchedHistory = ({ history }) => {
  return (
    <div className="watched-history">
      <h4>History</h4>
      <ul>
        {history.map((video, index) => (
          <li key={index}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default WatchedHistory;
