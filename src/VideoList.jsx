import React, { useState } from 'react';

const VideoList = () => {
    // ...previous code...
    // Sample video URLs, titles, descriptions, and tags
    const videos = [
        { url: "https://youtu.be/OzI9M74IfR0?si=N9Pjj_C0k4ZLi_5g", title: "Video 1", description: "This is a music video.", tags: ["Music"] },
        { url: "https://youtu.be/sLykke8q2ls?si=k3s9G7qwYjmZO6ln", title: "Video 2", description: "A comprehensive tutorial.", tags: ["Tutorial"] },
        // ... (add more videos)
    ];
    // ...rest of the code...

    return (
        <div className="video-list">
            {/* ...previous JSX... */}
            {currentVideos.map((video, index) => (
                <div key={index} className="video">
                    <iframe width="300" height="200" src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <p>{video.description}</p>
                </div>
            ))}
            {/* ...rest of the JSX... */}
        </div>
    );
};

export default VideoList;
