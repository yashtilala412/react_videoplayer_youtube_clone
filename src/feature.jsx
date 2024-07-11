import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [favorites, setFavorites] = useState([]);

const handleFavorite = (index) => {
    setFavorites([...favorites, videos[index]]);
};

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <button onClick={() => handleFavorite(index)}>Add to Favorites</button>
            </div>
        ))}
        <h2>Favorites</h2>
        {favorites.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);








export default VideoList;
