import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [currentVideo, setCurrentVideo] = useState(0);

useEffect(() => {
    const nextVideo = (currentVideo + 1) % videos.length;
    const timer = setTimeout(() => setCurrentVideo(nextVideo), 30000); // 30 seconds for demo

    return () => clearTimeout(timer);
}, [currentVideo]);

return (
    <div className="video-list">
        <h3>{videos[currentVideo].title}</h3>
        <iframe width="300" height="200" src={videos[currentVideo].url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
);












export default VideoList;
