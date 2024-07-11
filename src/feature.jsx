import React, { useState } from 'react';

const VideoList = () => {
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    const handleLike = (index) => {
        setLikes({ ...likes, [index]: (likes[index] || 0) + 1 });
    };

    const handleDislike = (index) => {
        setDislikes({ ...dislikes, [index]: (dislikes[index] || 0) + 1 });
    };

    return (
        <div className="video-list">
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div>
                        <button onClick={() => handleLike(index)}>Like ({likes[index] || 0})</button>
                        <button onClick={() => handleDislike(index)}>Dislike ({dislikes[index] || 0})</button>
                    </div>
                </div>
            ))}
        </div>
    );
};


    
    


export default VideoList;
