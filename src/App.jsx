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
 
  const toggleTheme1 = () => {
    if (window.confirm("Are you sure you want to change the theme?")) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };
  const addComment = (videoId, comment) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, comments: [...video.comments, comment] } : video
    );
    setVideos(updatedVideos);
  };
  const handleShare = (videoId) => {
    const video = videos.find((video) => video.id === videoId);
    navigator.share({ title: video.title, url: video.url });
  };
  const selectQuality = (quality) => {
    setVideoQuality(quality); // Assuming setVideoQuality is a state setter
  };
  const savePlaybackPosition = (videoId, position) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, playbackPosition: position } : video
    );
    setVideos(updatedVideos);
  };
  const toggleFullscreen = () => {
    const videoElement = document.getElementById('video-player');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.requestFullscreen();
    }
  };
  const handleVideoEnd = () => {
    const currentIndex = videos.findIndex((video) => video.id === currentVideoId);
    if (currentIndex < videos.length - 1) {
      setCurrentVideoId(videos[currentIndex + 1].id);
    }
  };
  const sortByPopularity = () => {
    const sortedVideos = [...videos].sort((a, b) => b.likes - a.likes);
    setVideos(sortedVideos);
  };
  const addToWatchHistory = (videoId) => {
    setWatchHistory([...watchHistory, videoId]); // Assuming setWatchHistory is a state setter
  };
  const filterRecentUploads = () => {
    const filteredVideos = videos.filter((video) => {
      const uploadDate = new Date(video.uploadDate);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return uploadDate >= sevenDaysAgo;
    });
    setVideos(filteredVideos);
  };
  const createPlaylist = (playlistName) => {
    setPlaylists([...playlists, { name: playlistName, videos: [] }]);
  };
  const addToPlaylist = (playlistName, videoId) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.name === playlistName ? { ...playlist, videos: [...playlist.videos, videoId] } : playlist
    );
    setPlaylists(updatedPlaylists);
  };
  const removeFromPlaylist = (playlistName, videoId) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.name === playlistName ? { ...playlist, videos: playlist.videos.filter((id) => id !== videoId) } : playlist
    );
    setPlaylists(updatedPlaylists);
  };
  const addRecentlyWatchedSection = () => {
    const recentlyWatched = videos.filter((video) => watchHistory.includes(video.id));
    setRecentlyWatchedVideos(recentlyWatched); // Assuming setRecentlyWatchedVideos is a state setter
  };
  const handleSpeedChange = (newSpeed) => {
    videoRef.current.playbackRate = newSpeed; // Assuming videoRef is a ref to the video element
  };
  const toggleDescription = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, isDescriptionExpanded: !video.isDescriptionExpanded } : video
    );
    setVideos(updatedVideos);
  };
  const reportVideo = (videoId, reason) => {
    // Send report to server or handle it locally
    console.log(`Video ${videoId} reported for: ${reason}`);
  };
  const enablePictureInPicture = async () => {
    const videoElement = document.getElementById('video-player');
    const button = document.getElementById('pip-button');

    // Check if the video element exists
    if (!videoElement) {
        console.error('Video element not found!');
        return;
    }

    // Check if Picture-in-Picture is supported
    if (!document.pictureInPictureEnabled) {
        console.error('Picture-in-Picture is not supported in this browser.');
        return;
    }

    try {
        // Toggle Picture-in-Picture mode
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
            button.textContent = 'Enable Picture-in-Picture';
            button.setAttribute('aria-pressed', 'false');
            localStorage.setItem('pipEnabled', 'false'); // Save state
        } else {
            videoElement.focus();
            await videoElement.requestPictureInPicture();
            button.textContent = 'Disable Picture-in-Picture';
            button.setAttribute('aria-pressed', 'true');
            localStorage.setItem('pipEnabled', 'true'); // Save state
        }
    } catch (error) {
        console.error('Error toggling Picture-in-Picture mode:', error);
        sendToMonitoringService(error); // Replace with your monitoring service
    }

    // Listen for Picture-in-Picture events
    videoElement.addEventListener('enterpictureinpicture', () => {
        console.log('Entered Picture-in-Picture mode');
        videoElement.play(); // Resume playback
        videoElement.muted = true; // Mute video in Picture-in-Picture
    });

    videoElement.addEventListener('leavepictureinpicture', () => {
        console.log('Exited Picture-in-Picture mode');
        videoElement.muted = false; // Unmute video
        videoElement.pause(); // Pause playback
    });
};

// Automatically enable Picture-in-Picture if previously enabled
window.addEventListener('load', async () => {
    const pipEnabled = localStorage.getItem('pipEnabled') === 'true';
    const videoElement = document.getElementById('video-player');
    if (pipEnabled && videoElement) {
        try {
            await videoElement.requestPictureInPicture();
            console.log('Automatically entered Picture-in-Picture mode');
        } catch (error) {
            console.error('Error auto-enabling Picture-in-Picture:', error);
        }
    }
});

// Add a keyboard shortcut for toggling Picture-in-Picture
document.addEventListener('keydown', async (event) => {
    if (event.ctrlKey && event.key === 'p') {
        await enablePictureInPicture();
    }
});

// Add a fullscreen toggle in Picture-in-Picture mode
const toggleFullscreen1 = async () => {
    const videoElement = document.getElementById('video-player');
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    } else {
        await videoElement.requestFullscreen();
    }
};

// Add event listener for fullscreen toggle
document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);



  
}


    videoElement.addEventListener('leavepictureinpicture', () => {
        console.log('Exited Picture-in-Picture mode');
        videoElement.pause(); // Pause video when exiting
    });
};




  const toggleSubtitles = () => {
    const videoElement = document.getElementById('video-player');
    const track = videoElement.textTracks[0]; // Assuming the first track is the subtitles track
    track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
  };
  const toggleCommentsVisibility = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, commentsVisible: !video.commentsVisible } : video
    );
    setVideos(updatedVideos);
  };
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted; // Assuming videoRef is a ref to the video element
  };
  const incrementViewCount = (videoId) => {
    const updatedVideos = videos.map((video) =>
      video.id === videoId ? { ...video, views: video.views + 1 } : video
    );
    setVideos(updatedVideos);
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
