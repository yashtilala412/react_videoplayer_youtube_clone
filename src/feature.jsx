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
        const handleComment = (index, comment) => {
            const maxLength = 200;
            if (comment.length > maxLength) {
                alert(`Comment cannot exceed ${maxLength} characters.`);
                return;
            }
            setComments({
                ...comments,
                [index]: [...(comments[index] || []), { text: comment, replies: [] }],
            });
        };
        const editComment = (videoIndex, commentIndex, newComment) => {
            const newComments = { ...comments };
            newComments[videoIndex][commentIndex].text = newComment;
            setComments(newComments);
        };
        const deleteComment = (videoIndex, commentIndex) => {
            const newComments = { ...comments };
            newComments[videoIndex].splice(commentIndex, 1);
            setComments(newComments);
        };
        const toggleLike = (videoIndex, commentIndex) => {
            const newComments = { ...comments };
            const comment = newComments[videoIndex][commentIndex];
            comment.liked = !comment.liked;
            setComments(newComments);
        };
                                
    };

    const handleReply = (videoIndex, commentIndex, reply) => {
        const newComments = { ...comments };
        newComments[videoIndex][commentIndex].replies.push(reply);
        setComments(newComments);
        const getReplyCount = (videoIndex, commentIndex) => {
            return comments[videoIndex][commentIndex].replies.length;
        };
        
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const sortedVideos = [...videos].sort((a, b) => {
        if (sortType === "title") {
            return a.title.localeCompare(b.title);
        } else if (sortType === "date") {
            return new Date(b.date) - new Date(a.date);
        } else if (sortType === "popularity") {
            return b.views - a.views;
        }
        return 0;
    });

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
