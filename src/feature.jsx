import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [sortType, setSortType] = useState("title");

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
    <div className="video-list">
        <select onChange={(e) => setSortType(e.target.value)}>
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
        </select>
        {sortedVideos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);











export default VideoList;
