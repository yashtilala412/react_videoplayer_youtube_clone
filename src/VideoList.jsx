import React, { useState } from 'react';

const VideoList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('Title');
    const videosPerPage = 5;

    const videos = [
        { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", description: "This is a music video.", tags: ["Music"], date: "2021-01-01" },
        { url: "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln", title: "Video 2", description: "A comprehensive tutorial.", tags: ["Tutorial"], date: "2021-02-15" },
        // ... (add more videos)
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
                    <iframe width="300" height="200" src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <p>{video.description}</p>
                </div>
            ))}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredVideos.length / videosPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
