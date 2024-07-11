import React, { useState } from 'react';

const videos = [
    { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", description: "Description 1", tags: ["tag1", "tag2"] },
    // Add more videos
];

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="tags">
                    {video.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default VideoList;
