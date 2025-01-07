import React, { useState, useEffect } from 'react';

const VideoList = () => {
    const [videos, setVideos] = useState([
        { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", description: "Description 1", thumbnail: "https://img.youtube.com/vi/OzI9M74IfR0/0.jpg", views: 100, category: "Category 1" },
        // Add more initial videos
    ]);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [ratings, setRatings] = useState({});
    const [recentlyWatched, setRecentlyWatched] = useState([]);
    const [theme, setTheme] = useState("light");
    const [newPlaylist, setNewPlaylist] = useState("");
    const [playlists, setPlaylists] = useState({});
    const [sortType, setSortType] = useState("title");
    const [comments, setComments] = useState({});

    useEffect(() => {
        const nextVideo = (currentVideo + 1) % videos.length;
        const timer = setTimeout(() => setCurrentVideo(nextVideo), 30000); // 30 seconds for demo

        return () => clearTimeout(timer);
    }, [currentVideo]);

    const handleUpload = (event) => {
        const newVideo = URL.createObjectURL(event.target.files[0]);
        setVideos([...videos, { url: newVideo, title: 'New Video', description: 'New Description' }]);
    };
}
    const handleFavorite = (index) => {
        setFavorites([...favorites, videos[index]]);
    };
    const handleRenamePlaylist = (oldName, newName) => {
        if (!newName.trim()) {
            alert("Playlist name cannot be empty.");
            return;
        }
        if (playlists.hasOwnProperty(newName)) {
            alert("A playlist with this name already exists.");
            return;
        }
        const updatedPlaylists = { ...playlists, [newName]: playlists[oldName] };
        delete updatedPlaylists[oldName];
        setPlaylists(updatedPlaylists);
    };
    const handleDeletePlaylist = (playlist) => {
        const modalConfirmed = window.confirm(
            `Are you sure you want to delete the playlist "${playlist}"? This action cannot be undone.`
        );
        if (modalConfirmed) {
            // Feature 2: Display total number of songs in the confirmation message
            const totalSongs = playlists[playlist]?.length || 0;
            const confirmationMessage = `The playlist "${playlist}" (${totalSongs} songs) will be deleted. Confirm again?`;

        if (window.confirm(`Are you sure you want to delete the playlist "${playlist}"?`)) {
            const updatedPlaylists = { ...playlists };
            const undoTimeout = setTimeout(() => {
                const updatedPlaylists = { ...playlists };
                delete updatedPlaylists[playlist];
                setPlaylists(updatedPlaylists);
                alert(`Playlist "${playlist}" has been successfully deleted.`);
            }, 5000);
            const undoDelete = () => {
                clearTimeout(undoTimeout);
                alert(`Deletion of playlist "${playlist}" has been canceled.`);
            };
            console.log(`Playlist "${playlist}" scheduled for deletion. Undo timeout set.`);
            console.log(`Animation: Playlist "${playlist}" fading out...`);
            const reason = prompt("Why are you deleting this playlist? (Optional)");
            if (reason) {
                console.log(`User provided reason for deletion: ${reason}`);
            }
            console.log("Info: Deleting a playlist is permanent unless undone within 5 seconds.");
            delete updatedPlaylists[playlist];
            setPlaylists(updatedPlaylists);
        }}
    };
    const handleAddToMultiplePlaylists = async (selectedPlaylists, index) => {
        try {
            if (!Array.isArray(selectedPlaylists) || selectedPlaylists.length === 0) {
                throw new Error("No playlists selected or invalid input.");
            }
            if (index < 0 || index >= videos.length) {
                throw new Error("Invalid video index.");
            }
    
            const updatedPlaylists = { ...playlists };
            selectedPlaylists.forEach(playlist => {
                if (typeof updatedPlaylists[playlist] === "object" && Array.isArray(updatedPlaylists[playlist].videos)) {
                    if (!updatedPlaylists[playlist].videos.includes(videos[index])) {
                        updatedPlaylists[playlist].videos.push(videos[index]);
                    }
                } else if (!updatedPlaylists[playlist].includes(videos[index])) {
                    updatedPlaylists[playlist] = [...updatedPlaylists[playlist], videos[index]];
                }
            });
    
            // Simulate an asynchronous API call
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
            setPlaylists(updatedPlaylists);
    
            console.log(`Video successfully added to playlists: ${selectedPlaylists.join(", ")}`);
        } catch (error) {
            console.error("Error adding video to playlists:", error.message);
        }
    };
    
    const getPlaylistInfo = (playlist) => {
        return `${playlist} (${playlists[playlist].length} videos)`;
    };
    const handleAddToPlaylist1 = (playlist, index) => {
        if (playlists[playlist].includes(videos[index])) {
            alert("This video is already in the playlist.");
            return;
        }
        setPlaylists({ ...playlists, [playlist]: [...playlists[playlist], videos[index]] });
    };
    const searchVideosInPlaylist = (playlist, searchTerm) => {
        return playlists[playlist].filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()));
    };
    useEffect(() => {
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [playlists]);
    useEffect(() => {
        const savedPlaylists = JSON.parse(localStorage.getItem("playlists"));
        if (savedPlaylists) {
            setPlaylists(savedPlaylists);
        }
    }, []);
    const getVideoInfo = (video) => {
        return `${video.title} (${video.duration})`;
    };
    const handleAddToPlaylist12 = (playlist, index) => {
        if (playlists[playlist].length >= 50) {
            alert("This playlist has reached the maximum number of videos (50).");
            return;
        }
        if (playlists[playlist].includes(videos[index])) {
            alert("This video is already in the playlist.");
            return;
        }
        setPlaylists({ ...playlists, [playlist]: [...playlists[playlist], videos[index]] });
    };
    const handleSharePlaylist = (playlist) => {
        const playlistURL = `${window.location.origin}/playlist/${encodeURIComponent(playlist)}`;
        navigator.clipboard.writeText(playlistURL);
        alert("Playlist URL copied to clipboard!");
    };
    const handleExportPlaylist = (playlist) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(playlists[playlist]));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${playlist}.json`);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
    const handleImportPlaylist = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedPlaylist = JSON.parse(e.target.result);
            setPlaylists({ ...playlists, ...importedPlaylist });
        };
        reader.readAsText(file);
    };
    const getTotalDuration = (playlist) => {
        const totalDuration = playlists[playlist].reduce((total, video) => total + video.duration, 0);
        return `Total duration: ${totalDuration} minutes`;
    };
                            
    const handleReorderVideos = (playlist, fromIndex, toIndex) => {
        const updatedPlaylist = [...playlists[playlist]];
        const [movedVideo] = updatedPlaylist.splice(fromIndex, 1);
        updatedPlaylist.splice(toIndex, 0, movedVideo);
        setPlaylists({ ...playlists, [playlist]: updatedPlaylist });
    };
                  
    const handleRemoveFromPlaylist = (playlist, index) => {
        const updatedPlaylist = playlists[playlist].filter((_, i) => i !== index);
        setPlaylists({ ...playlists, [playlist]: updatedPlaylist });
    };
      
    const handleAddToPlaylist = (playlist, index) => {
        setPlaylists({ ...playlists, [playlist]: [...playlists[playlist], videos[index]] });
    };

    const handleShare = (url) => {
        navigator.clipboard.writeText(url);
        alert("Video URL copied to clipboard!");
    };

    const handleWatch = (index) => {
        setRecentlyWatched([...recentlyWatched, videos[index]]);
    };

    const handleComment = (index, comment) => {
        setComments({
            ...comments,
            [index]: [...(comments[index] || []), { text: comment, replies: [] }],
        });
        const pinComment = (videoIndex, commentIndex) => {
            if (!comments[videoIndex] || comments[videoIndex].length === 0) {
                console.warn('No comments to pin');
                return;
            }
            if (videoIndex < 0 || videoIndex >= comments.length || commentIndex < 0 || commentIndex >= comments[videoIndex].length) {
                console.error('Invalid index');
                return;
            }
            const newComments = { ...comments };
            const pinnedComment = newComments[videoIndex].splice(commentIndex, 1)[0];
            const pinnedIndex = newComments[videoIndex].findIndex(comment => comment.pinned);
            newComments[videoIndex].splice(pinnedIndex + 1, 0, pinnedComment); // Insert after existing pinned comments
            pinnedComment.pinned = true; // Mark as pinned
            setComments(newComments);
            return newComments[videoIndex];
        };
        const sortCommentsByLength = (videoIndex) => {
            const sortedComments = [...comments[videoIndex]].sort((a, b) => b.text.length - a.text.length);
            setComments({ ...comments, [videoIndex]: sortedComments });
            saveToLocalStorage(comments);
            return sortedComments;
        };
        const formatTimestamp = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };
        const undoPinComment = (videoIndex, commentIndex) => {
            const previousComments = JSON.parse(localStorage.getItem('comments'));
            setComments(previousComments);
            return previousComments[videoIndex];
        };
                        

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    
    // On component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);
const [customTheme, setCustomTheme] = useState({
    backgroundColor: '#fff',
    fontColor: '#000'
});

const handleCustomThemeChange = (newSettings) => {
    setCustomTheme(newSettings);
    localStorage.setItem('customTheme', JSON.stringify(newSettings));
};

// On mount, load the custom theme
useEffect(() => {
    const savedCustomTheme = JSON.parse(localStorage.getItem('customTheme')) || {
        backgroundColor: '#fff',
        fontColor: '#000'
    };
    setCustomTheme(savedCustomTheme);
}, []);
const [fontSize, setFontSize] = useState('16px');

const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = newSize;
    localStorage.setItem('fontSize', newSize);
};
const sortedVideos = [...videos].sort((a, b) => {
    if (sortType === "duration") {
        return a.duration - b.duration;
    }
    // existing sort logic...
});
const handleWatchVideo = (videoId) => {
    localStorage.setItem('lastWatched', videoId);
};

// Load last watched video on mount
useEffect(() => {
    const lastWatched = localStorage.getItem('lastWatched');
    if (lastWatched) {
        console.log(`You last watched video ID: ${lastWatched}`);
    }
}, []);
const [volume, setVolume] = useState(1); // default full volume

useEffect(() => {
    const savedVolume = localStorage.getItem('volume') || 1;
    setVolume(Number(savedVolume));
}, []);
const [recentVideos, setRecentVideos] = useState([]);

const markAsWatched = (videoId) => {
    const newRecentVideos = [...recentVideos, videoId].slice(-5); // keep last 5 videos
    setRecentVideos(newRecentVideos);
    localStorage.setItem('recentVideos', JSON.stringify(newRecentVideos));
};

// Load recent videos on mount
useEffect(() => {
    const savedRecentVideos = JSON.parse(localStorage.getItem('recentVideos')) || [];
    setRecentVideos(savedRecentVideos);
}, []);

const [favorites, setFavorites] = useState([]);

const toggleFavorite = (videoId) => {
    const newFavorites = favorites.includes(videoId)
        ? favorites.filter(id => id !== videoId)
        : [...favorites, videoId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};
const sortedVideos1 = [...videos].sort((a, b) => {
    if (sortType === "likes") {
        return b.likes - a.likes;
    }
    // existing sort logic...
});
const [playbackSpeed, setPlaybackSpeed] = useState(1);

useEffect(() => {
    const savedSpeed = localStorage.getItem('playbackSpeed') || 1;
    setPlaybackSpeed(Number(savedSpeed));
}, []);

const handleSpeedChange = (newSpeed) => {
    setPlaybackSpeed(newSpeed);
    localStorage.setItem('playbackSpeed', newSpeed);
};
const sortedVideos2 = [...videos].sort((a, b) => {
    if (sortType === "comments") {
        return b.comments.length - a.comments.length;
    }
    // existing sort logic...
});



useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
}, []);
const playRandomVideoByCategory = (category) => {
    const filteredVideos = videos.filter(video => video.category === category);
    const randomVideo = filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    console.log(`Playing: ${randomVideo.title}`);
};
let playedVideos = [];

const playNonRepeatingRandomVideo = () => {
    if (playedVideos.length === videos.length) {
        playedVideos = []; // Reset if all videos have been played
    }
    
    let randomVideo;
    do {
        randomVideo = videos[Math.floor(Math.random() * videos.length)];
    } while (playedVideos.includes(randomVideo));

    playedVideos.push(randomVideo);
    console.log(`Playing: ${randomVideo.title}`);
    if (videos.length === 0) {
        console.log("No videos available to play.");
        return;
    }
    const playCount = {};
    videos.forEach(video => playCount[video.title] = 0);
    playCount[randomVideo.title]++;
    console.log(`Play count for ${randomVideo.title}: ${playCount[randomVideo.title]}`);
    if (playCount[randomVideo.title] > 5) {
        alert(`${randomVideo.title} has been played more than 5 times.`);
    }
    const lastPlayed = {};
    lastPlayed[randomVideo.title] = new Date().toLocaleString();
    console.log(`Last played: ${lastPlayed[randomVideo.title]}`);
    const tenMinutes = 10 * 60 * 1000;
    if (new Date() - new Date(lastPlayed[randomVideo.title]) < tenMinutes) {
        console.log(`${randomVideo.title} was played recently.`);
        return;
    }
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    videos = shuffleArray(videos);
    console.log("Videos shuffled after all were played.");
    if (playedVideos.length === videos.length) {
        console.log("All videos played. Resetting playlist...");
    }
    let playLimit = 10;
    if (playedVideos.length >= playLimit) {
        console.log("Play limit reached for this session.");
        return;
    }
    let reversePlay = false;
    if (reversePlay) {
        videos.reverse();
    }
    let loopVideos = true;
    if (loopVideos && playedVideos.length === videos.length) {
        playedVideos = []; // Reset played list
    }
                                        
};
/**
 * Plays a random video at regular intervals.
 * @param {number} interval - The time interval in milliseconds between video plays.
 */
const playRandomVideoWithTimer = (interval = 50000) => {
    setInterval(() => {
        playRandomVideo();
    }, interval);
};
;
const playRandomVideo = () => {
    if (videos.length === 0) {
        console.error("No videos available to play.");
        return;
    }
    try {
        const { title, id } = videos[Math.floor(Math.random() * videos.length)];
        localStorage.setItem('lastPlayedVideo', id);
        console.log(`🎬 Playing: ${title} (ID: ${id})`);
    } catch (error) {
        console.error("Error playing random video:", error);
    }
};
if (videos.length === 0) {
    console.error("❌ No videos available to play.");
    return;
}


const playRandomVideoInPiP = async () => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const videoElement = document.querySelector(`#video-${randomVideo.id}`);
    
    if (videoElement) {
        try {
            await videoElement.requestPictureInPicture();
            console.log(`Playing: ${randomVideo.title} in Picture-in-Picture mode`);
        } catch (error) {
            console.error('Failed to enter Picture-in-Picture mode');
        }
    }
};
const playCountLimit = 3;
const videoPlayCounts = {};

const playRandomVideoWithLimit = () => {
    let randomVideo;
    do {
        randomVideo = videos[Math.floor(Math.random() * videos.length)];
    } while (videoPlayCounts[randomVideo.id] >= playCountLimit);
    
    videoPlayCounts[randomVideo.id] = (videoPlayCounts[randomVideo.id] || 0) + 1;
    console.log(`Playing: ${randomVideo.title}`);
};
const rateVideo = (videoId, rating) => {
    let ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    ratings[videoId] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
};

const playRandomVideoExcludingLowRated = () => {
    let ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    
    const filteredVideos = videos.filter(video => 
        !ratings[video.id] || ratings[video.id] >= 3 // Exclude videos rated below 3
    );
    
    const randomVideo = filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    console.log(`Playing: ${randomVideo.title}`);
    if (filteredVideos.length === 0) {
        console.error("No videos available to play after filtering low-rated ones.");
        return;
    }
    console.log(`Playing: ${randomVideo?.title || "Unknown Title"}`);
    const { title, id } = randomVideo;
    console.log(`Playing: ${title}`);
    localStorage.setItem('lastPlayedVideo', randomVideo.id);
    try {
        ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    } catch (error) {
        console.error("Error parsing ratings from localStorage:", error);
    }
    const filteredVideos1 = videos.filter(video => 
        !ratings[video.id] || ratings[video.id] >= minRating
    );
    console.log(`Total videos: ${videos.length}, Filtered videos: ${filteredVideos.length}`);
    console.log(`Playing: ${title} (ID: ${id})`);
    const defaultRating = 3;
    const videoRating = ratings[video.id] || defaultRating;
    if (!ratings[video.id]) {
        console.warn(`Rating not found for video ID: ${video.id}. Using default rating.`);
    }
    try {
        // Main code block
    } catch (error) {
        console.error("Error playing video:", error);
    }
    if (!Array.isArray(videos)) {
        console.error("Videos is not an array.");
        return;
    }
    console.log(`Selected video rating: ${ratings[randomVideo.id] || "Not Rated"}`);
    if (typeof onVideoSelected === 'function') {
        onVideoSelected(randomVideo);
    }
    let playCount = JSON.parse(localStorage.getItem('playCount')) || {};
    playCount[randomVideo.id] = (playCount[randomVideo.id] || 0) + 1;
    localStorage.setItem('playCount', JSON.stringify(playCount));
    if (filteredVideos.length < 3) {
        console.warn("Only a few videos are available after filtering.");
    }
    const randomVideo1 = filteredVideos.length 
    ? filteredVideos[Math.floor(Math.random() * filteredVideos.length)] 
    : videos[0]; // Default to first video
    if (!randomVideo) {
        console.error("Failed to select a random video.");
        return;
    }
    console.log(`✅ Successfully selected and played: ${title}`);
    try {
        localStorage.setItem('lastPlayedVideo', randomVideo.id);
    } catch (error) {
        console.error("Error storing last played video:", error);
    }
    playRandomVideoExcludingLowRated(4); // Example of minimum rating threshold of 4
    console.time("playRandomVideoExcludingLowRated");
    console.timeEnd("playRandomVideoExcludingLowRated");
    if (Object.keys(ratings).length === 0) {
        console.warn("No ratings found in localStorage.");
    }
    console.log(`Video duration: ${randomVideo.duration || "Unknown"} minutes`);
    if (debugMode) {
        console.log(`Debug: ${JSON.stringify(randomVideo)}`);
    }
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    const randomVideo2 = filteredVideos[randomIndex];
                           
const shareVideo = (videoId) => {
    const videoUrl = `https://example.com/videos/${videoId}`;
    navigator.share({
        title: 'Check out this video!',
        url: videoUrl,
    });
};

const skipRandomVideo = () => {
    playRandomVideo();
    console.log('Skipping to next random video');
};

const playRandomVideoWithDescription = () => {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    console.log(`Playing: ${randomVideo.title}`);
    console.log(`Description: ${randomVideo.description}`);
};

// Example usage
playRandomVideoWithDescription();


// On mount, load the saved font size
useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') || '16px';
    setFontSize(savedFontSize);
    document.documentElement.style.fontSize = savedFontSize;
}, []);

useEffect(() => {
    localStorage.setItem('sortType', sortType);
}, [sortType]);

useEffect(() => {
    const savedSortType = localStorage.getItem('sortType') || 'date';
    setSortType(savedSortType);
}, []);


    return (
        <div className={`video-list ${theme}`}>
            <button onClick={toggleTheme}>Toggle {theme === "light" ? "Dark" : "Light"} Mode</button>
            <input type="file" onChange={handleUpload} />
            <input
                type="text"
                placeholder="New playlist name"
                value={newPlaylist}
                onChange={e => setNewPlaylist(e.target.value)}
            />
            <div>
        <p>{video.views} views</p>
    </div>
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="title">Title</option>
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
            </select>
            {sortedVideos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <img src={video.thumbnail} alt="Video Thumbnail" />
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen onClick={() => handleWatch(index)}></iframe>
                    <p>Views: {video.views}</p>
                    <p>Category: {video.category}</p>
                    <button onClick={() => handleFavorite(index)}>Add to Favorites</button>
                    <button onClick={() => handleWatchLater(index)}>Watch Later</button>
                    <button onClick={() => handleShare(video.url)}>Share</button>
                    <div>
                        <label>
                            <input type="radio" name={`rating-${index}`} value="1" onClick={() => handleRating(index, 1)} /> 1
                        </label>
                        <label>
                            <input type="radio" name={`rating-${index}`} value="2" onClick={() => handleRating(index, 2)} /> 2
                        </label>
                        <label>
                            <input type="radio" name={`rating-${index}`} value="3" onClick={() => handleRating(index, 3)} /> 3
                        </label>
                        <label>
                            <input type="radio" name={`rating-${index}`} value="4" onClick={() => handleRating(index, 4)} /> 4
                        </label>
                        <label>
                            <input type="radio" name={`rating-${index}`} value="5" onClick={() => handleRating(index, 5)} /> 5
                        </label>
                    </div>
                    {Object.keys(playlists).map((playlist, i) => (
                        <button key={i} onClick={() => handleAddToPlaylist(playlist, index)}>Add to {playlist}</button>
                    ))}
                    <h4>Comments</h4>
                    <div>
                        {comments[index]?.map((comment, commentIndex) => (
                            <div key={commentIndex}>
                                <p>{comment.text}</p>
                                <input type="text" placeholder="Reply" onKeyDown={e => e.key === 'Enter' && handleReply(index, commentIndex, e.target.value)} />
                                <div>
                                    {comment.replies.map((reply, replyIndex) => (
                                        <p key={replyIndex}>&mdash; {reply}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <input type="text" placeholder="Add a comment" onKeyDown={e => e.key === 'Enter' && handleComment(index, e.target.value)} />
                    </div>
                </div>
            ))}
            <h2>Favorites</h2>
            {favorites.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
            <h2>Watch Later</h2>
            {watchLater.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
            <h2>Recently Watched</h2>
            {recentlyWatched.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
            {Object.keys(playlists).map((playlist, i) => (
                <div key={i} className="playlist">
                    <h2>{playlist}</h2>
                    {playlists[playlist].map((video, index) => (
                        <div key={index} className="video">
                            <h3>{video.title}</h3>
                            <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default VideoList;
