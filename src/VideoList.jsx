import React, { useState } from 'react';

const VideoList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('Title');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const videosPerPage = 5;

    const videos = [
        { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", description: "This is a music video.", tags: ["Music"], thumbnail: "https://img.youtube.com/vi/OzI9M74IfR0/0.jpg", date: "2021-01-01", likes: 0, dislikes: 0, comments: [] },
        { url: "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln", title: "Video 2", description: "A comprehensive tutorial.", tags: ["Tutorial"], thumbnail: "https://img.youtube.com/vi/sLykke8q2ls/0.jpg", date: "2021-02-15", likes: 0, dislikes: 0, comments: [] },
        
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleLike = (video) => {
        video.likes += 1;
        setSelectedVideo({ ...video });
    };

    const handleDislike = (video) => {
        video.dislikes += 1;
        setSelectedVideo({ ...video });
    };

    const handleCommentSubmit = () => {
        const trimmedComment = comment.trim();
        if (!trimmedComment) {
            alert('Comment cannot be empty!');
            return;
        }
        if (trimmedComment.length > 250) {
            alert('Comment is too long! Maximum 250 characters allowed.');
            return;
        }
        const isDuplicate = selectedVideo.comments.some(existingComment => existingComment === trimmedComment);
        if (isDuplicate) {
            alert('Duplicate comment! Please write something different.');
            return;
        }
        
        
        const bannedWords = ['badword1', 'badword2', 'badword3'];
        const containsBannedWord = bannedWords.some(word => trimmedComment.toLowerCase().includes(word));
        if (containsBannedWord) {
            alert('Inappropriate language is not allowed!');
            return;
        }
        const emojiRegex = /[\p{Emoji}]/u;
        const isOnlyEmojis = emojiRegex.test(trimmedComment) && trimmedComment.replace(emojiRegex, '').trim() === '';
        if (isOnlyEmojis) {
            alert('Comment cannot consist solely of emojis or symbols!');
            return;
        }
        const userComments = selectedVideo.comments.filter(c => c.user === currentUser);
    if (userComments.length >= 5) {
        alert('You can only post up to 5 comments per video!');
        return;
    }
    setLoading(true);
    setTimeout(() => {
        // 11. Save the comment with additional metadata (e.g., user, timestamp)
        const newComment = {
            id: Date.now(), // Unique ID
            text: trimmedComment,
            user: currentUser, // Assume currentUser is available in scope
            timestamp,
        };
        const timestamp = new Date().toISOString();    
        if (comment.trim()) {
            
            selectedVideo.comments.push(comment);
            setComment('');
            setSelectedVideo({ ...selectedVideo });
        }
    };

    const handleFavorite = (video) => {
        setFavorites(prevFavorites => [...prevFavorites, video]);
    };

    const sortedVideos = [...videos].sort((a, b) => {
        if (sortOrder === 'Title') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'Date') {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    const filteredVideos = sortedVideos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTag === 'All' || video.tags.includes(selectedTag))
    );

    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const uniqueTags = ['All', ...new Set(videos.flatMap(video => video.tags))];

    return (
        <div className="video-list">
            <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <select onChange={handleTagChange} value={selectedTag}>
                {uniqueTags.map((tag, index) => (
                    <option key={index} value={tag}>{tag}</option>
                ))}
            </select>
            <select onChange={handleSortChange} value={sortOrder}>
                <option value="Title">Sort by Title</option>
                <option value="Date">Sort by Date</option>
            </select>
            {currentVideos.map((video, index) => (
                <div key={index} className="video">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        onClick={() => handleVideoSelect(video)}
                        style={{ cursor: 'pointer' }}
                    />
                    <p>{video.title}</p>
                    <button onClick={() => handleLike(video)}>Like ({video.likes})</button>
                    <button onClick={() => handleDislike(video)}>Dislike ({video.dislikes})</button>
                    <button onClick={() => handleFavorite(video)}>Add to Favorites</button>
                </div>
            ))}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
            {selectedVideo && (
                <div className="video-modal" onClick={() => setSelectedVideo(null)}>
                    <iframe width="560" height="315" src={selectedVideo.url} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <p>{selectedVideo.description}</p>
                    <button onClick={() => handleLike(selectedVideo)}>Like ({selectedVideo.likes})</button>
                    <button onClick={() => handleDislike(selectedVideo)}>Dislike ({selectedVideo.dislikes})</button>
                    <div className="comments">
                        <h3>Comments</h3>
                        {selectedVideo.comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))}
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={handleCommentSubmit}>Submit</button>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoList;
