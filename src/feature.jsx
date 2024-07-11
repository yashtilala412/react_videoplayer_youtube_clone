import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Video URL copied to clipboard!");
};

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <button onClick={() => handleShare(video.url)}>Share</button>
            </div>
        ))}
    </div>
);









export default VideoList;
