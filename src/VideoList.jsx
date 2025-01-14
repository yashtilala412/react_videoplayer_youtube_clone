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
        let duplicateAlertShown = false;

        if (isDuplicate) {
          if (!duplicateAlertShown) {
            alert('Duplicate comment! Please write something different.');
            duplicateAlertShown = true;
          }
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
        setComment('');
        setSelectedVideo({ ...selectedVideo });
        alert('Comment added successfully!');
        setLoading(false);
    }, 1000);
    console.log('Comment submitted:', trimmedComment);
    sendCommentToServer(newComment);
    setCommentCount(selectedVideo.comments.length);
    localStorage.setItem('latestComment', JSON.stringify(newComment));
    setPreviewComment(newComment);
    if (Date.now() - lastCommentTime < 5000) {
        alert('Please wait 5 seconds before posting another comment.');
        return;
    }
    setLastCommentTime(Date.now());
    const isSuspicious = trimmedComment.includes('http') || trimmedComment.includes('www');
    if (isSuspicious) {
        alert('Comments containing links will be reviewed by a moderator.');
        newComment.isPending = true;
    }
    newComment.text = newComment.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    sendEmailNotification(videoOwnerEmail, `New comment: ${trimmedComment}`);
    trackEvent('commentSubmitted', { videoId: selectedVideo.id, user: currentUser });
    if (bannedWords.some(word => currentUser.toLowerCase().includes(word))) {
        alert('Your username contains inappropriate content!');
        return;
    }
    scrollToComment(newComment.id);

    // 29. Sort comments by timestamp (newest first)
    selectedVideo.comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // 30. Add a feature to upvote/downvote comments
    newComment.upvotes = 0;
    newComment.downvotes = 0;

    setHighlightedCommentId(newComment.id);
    saveCommentToDatabase(newComment);
    newComment.likes = 0;
    sendPushNotification(videoOwnerId, `${currentUser} commented: ${trimmedComment}`);
    alert('Thank you for your comment!');

    // 36. Automatically translate the comment to the video's language
    if (videoLanguage !== userLanguage) {
        newComment.translatedText = translateComment(trimmedComment, videoLanguage);
    }
    const mentionedUsers = getMentionedUsers(trimmedComment);
    if (mentionedUsers.length > 0) {
        alert(`You mentioned: ${mentionedUsers.join(', ')}`);
        notifyMentionedUsers(mentionedUsers, newComment);
    }
    newComment.sentimentScore = analyzeSentiment(trimmedComment);
    newComment.hashtags = extractHashtags(trimmedComment);
    logCommentToServer(newComment);
    if (selectedVideo.comments.length > 1000) {
        alert('This video has reached the maximum number of comments!');
        return;
    }
    newComment.text = trimmedComment.replace(/\n/g, '<br>');

    // 43. Show the user's profile picture next to their comment
    newComment.userProfilePic = currentUserProfilePic;

    // 44. Allow editing comments within 5 minutes of submission
    setTimeout(() => (newComment.canEdit = false), 300000);
    newComment.reactions = { like: 0, laugh: 0, angry: 0 };
    const isSpam = detectSpam(trimmedComment);
    if (isSpam) {
        alert('Your comment was flagged as spam!');
        return;
    }
    newComment.text = parseMarkdown(trimmedComment);

    // 48. Add comment filtering based on user preferences (e.g., hide negative comments)
    const userPreferences = getUserPreferences();
    if (userPreferences.hideNegativeComments && newComment.sentimentScore < 0) {
        alert('Your comment will be hidden due to negative sentiment.');
    }
    saveCommentToDatabase(newComment)
        .then(() => alert('Comment saved successfully!'))
        .catch(() => alert('Failed to save comment. Please try again later.'));

    // 50. Refresh the comment section to show the new comment
    refreshCommentSection();
};
        selectedVideo.comments.push(newComment);
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
