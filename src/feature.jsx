import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';

const VideoList = () => {
    const [durations, setDurations] = useState({});

    useEffect(() => {
        videos.forEach((video, index) => {
            fetch(`https://www.googleapis.com/youtube/v3/videos?id=${video.id}&part=contentDetails&key=YOUR_API_KEY`)
                .then(response => response.json())
                .then(data => {
                    const duration = data.items[0].contentDetails.duration;
                    setDurations(prev => ({ ...prev, [index]: duration }));
                });
        });
    }, []);

    return (
        <div className="video-list">
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <p>Duration: {durations[index]}</p>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );
};

);




export default VideoList;
