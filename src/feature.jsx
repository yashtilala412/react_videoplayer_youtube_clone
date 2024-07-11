import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [recentlyWatched, setRecentlyWatched] = useState([]);

const handleWatch = (index) => {
    setRecentlyWatched([...recentlyWatched, videos[index]]);
};

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen onClick={() => handleWatch(index)}></iframe>
            </div>
        ))}
        <h2>Recently Watched</h2>
        {recentlyWatched.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);

);












export default VideoList;
