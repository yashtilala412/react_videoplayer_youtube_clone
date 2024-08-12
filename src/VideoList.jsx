import React, { useState } from 'react';

const VideoList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    // Sample video URLs, titles, and tags
    const videos = [
        { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", tags: ["Music"] },
        { url: "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln", title: "Video 2", tags: ["Tutorial"] },
        // ... (rest of the videos)
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTag === 'All' || video.tags.includes(selectedTag))
    );

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
            {filteredVideos.map((video, index) => (
                <div key={index} className="video">
                    <iframe width="300" height="200" src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );
};

export default VideoList;
