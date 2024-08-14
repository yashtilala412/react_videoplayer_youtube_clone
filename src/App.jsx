import React, { useState } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import SearchBar from './SearchBar';
import VideoUpload from './VideoUpload';
import LikeButton from './LikeButton';
import CommentsSection from './CommentsSection'; // Import the CommentsSection component

const videoData = [
  {
    url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g",
    title: "Yimmy Yimmy - Tayc | Shreya Ghoshal | Jacqueline Fernandez | Rajat N | Rana Nyadjiko | Anshul Garg",
    artist: "Shreya Ghoshal",
    views: "67M views",
    uploadDate: "3 week ago"
  },
  // Add the rest of the video data here...
];
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

const App = () => {
  const [videos, setVideos] = useState(videoData);

  const handleSearch = (searchTerm) => {
    const filteredVideos = videoData.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVideos(filteredVideos);
  };

  const handleUpload = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };

  return (
    <div className="app">
      <h1>Video Player</h1>
      <SearchBar onSearch={handleSearch} />
      <VideoUpload onUpload={handleUpload} />
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <ReactPlayer
              light={true}
              controls={true}
              height="200px"
              width="300px"
              url={video.url}
              style={{ borderRadius: '20px' }}
            />
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.artist}</p>
              <p>{video.views}</p>
              <p>{video.uploadDate}</p>
              <LikeButton video={video} />
              <CommentsSection video={video} /> {/* Add CommentsSection component */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
