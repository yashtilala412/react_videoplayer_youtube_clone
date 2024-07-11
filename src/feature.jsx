import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [theme, setTheme] = useState("light");

const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
};

return (
    <div className={`video-list ${theme}`}>
        <button onClick={toggleTheme}>Toggle {theme === "light" ? "Dark" : "Light"} Mode</button>
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);












export default VideoList;
