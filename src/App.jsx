import React, { useState } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import SearchBar from './SearchBar';
import VideoUpload from './VideoUpload';

const videoData = [
  {
    url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g",
    title: "Yimmy Yimmy - Tayc | Shreya Ghoshal | Jacqueline Fernandez | Rajat N | Rana Nyadjiko | Anshul Garg",
    artist: "Shreya Ghoshal",
    views: "67M views",
    uploadDate: "3 weeks ago",
  },
  // Add more video data here...
];

const App = () => {
  const [videos, setVideos] = useState(videoData);
  const [theme, setTheme] = useState('light');

  const handleSearch = (searchTerm) => {
    const filteredVideos = videoData.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVideos(filteredVideos);
  };

  const handleUpload = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const filterByDuration = (maxDuration) => {
    const filteredVideos = videos.filter((video) => video.duration <= maxDuration);
    setVideos(filteredVideos);
  };
  const sortByUploadDate = () => {
    const sortedVideos = [...videos].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    setVideos(sortedVideos);
  };
  const handleLike = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, likes: video.likes + 1 } : video
    );
    setVideos(updatedVideos);
  };
  const handleDislike = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, dislikes: video.dislikes + 1 } : video
    );
    setVideos(updatedVideos);
  };
  const setPlaybackSpeed = (speed) => {
    setVideoPlaybackSpeed(speed); // Assuming setVideoPlaybackSpeed is a state setter
  };
  const handleRating = (videoId, rating) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, rating } : video
    );
    setVideos(updatedVideos);
  };
  const handleBookmark = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, bookmarked: !video.bookmarked } : video
    );
    setVideos(updatedVideos);
  };
  const handleSearch = (searchTerm) => {
    const filteredVideos = videoData.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setVideos(filteredVideos);
  };
                
  return (
    <div className={`app ${theme}`}>
      <h1>Video Player</h1>
      <SearchBar onSearch={handleSearch} />
      <VideoUpload onUpload={handleUpload} />
      <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} />
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
              <CommentsSection video={video} />
              <ShareButton video={video} />
              <RatingSystem video={video} />
              <WatchLater video={video} />
              <SubtitleSupport video={video} />
              <PlaybackSpeedControl video={video} />
              <ParentalControls video={video} />
            </div>
          </div>
        ))}
      </div>
      <Playlist videos={videos} />
      <VideoCategories videos={videos} />
      <VideoRecommendations videos={videos} />
      <UserProfile />
      <VideoEditingTools />
    </div>
  );
};

export default App;
