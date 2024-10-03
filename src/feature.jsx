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

    const handleFavorite = (index) => {
        setFavorites([...favorites, videos[index]]);
    };

    const handleWatchLater = (index) => {
        setWatchLater([...watchLater, videos[index]]);
    };

    const handleRating = (index, rating) => {
        setRatings({ ...ratings, [index]: rating });
    };

    const handleCreatePlaylist = () => {
        setPlaylists({ ...playlists, [newPlaylist]: [] });
        setNewPlaylist("");
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
