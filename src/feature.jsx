import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const VideoList = () => {
    const [videos, setVideos] = useState([
        // Initial videos
    ]);

    const handleUpload = (event) => {
        const newVideo = URL.createObjectURL(event.target.files[0]);
        setVideos([...videos, { url: newVideo, title: 'New Video', description: 'New Description' }]);
    };

    return (
        <div className="video-list">
            <input type="file" onChange={handleUpload} />
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );
};







export default VideoList;
