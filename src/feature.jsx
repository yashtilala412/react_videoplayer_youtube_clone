import React, { useState } from 'react';

const [category, setCategory] = useState("");

const filteredVideos = videos.filter(video => video.category.toLowerCase().includes(category.toLowerCase()));

return (
    <div className="video-list">
        <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            // Add more categories
        </select>
        {filteredVideos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);


export default VideoList;
