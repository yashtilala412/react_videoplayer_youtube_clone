import React, { useState } from 'react';

const VideoList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const videos = [
        // video URLs and titles
    ];

    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="video-list">
            <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {filteredVideos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );
};

export default VideoList;
