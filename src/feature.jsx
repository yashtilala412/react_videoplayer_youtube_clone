import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [ratings, setRatings] = useState({});

const handleRating = (index, rating) => {
    setRatings({ ...ratings, [index]: rating });
};

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div>
                    <label>
                        <input type="radio" name={`rating-${index}`} value="1" onClick={() => handleRating(index, 1)} /> 1
                    </label>
                    <label>
                        <input type="radio" name={`rating-${index}`} value="2" onClick={() => handleRating(index, 2)} /> 2
                    </label>
                    <label>
                        <input type="radio" name={`rating-${index}`} value="3" onClick={() => handleRating(index, 3)} /> 3
                    </label>
                    <label>
                        <input type="radio" name={`rating-${index}`} value="4" onClick={() => handleRating(index, 4)} /> 4
                    </label>
                    <label>
                        <input type="radio" name={`rating-${index}`} value="5" onClick={() => handleRating(index, 5)} /> 5
                    </label>
                </div>
            </div>
        ))}
    </div>
);










export default VideoList;
