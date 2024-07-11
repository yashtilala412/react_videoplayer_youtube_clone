import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const videos = [
    { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", category: "Category 1" },
    // Add more videos
];

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <p>Category: {video.category}</p>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);















export default VideoList;
