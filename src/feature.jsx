import React, { useState } from 'react';

const VideoList = () => {
    const [comments, setComments] = useState({});

    const handleComment = (index, comment) => {
        setComments({
            ...comments,
            [index]: [...(comments[index] || []), comment],
        });
    };

    return (
        <div className="video-list">
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div>
                        <input type="text" placeholder="Add a comment" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleComment(index, e.target.value);
                                e.target.value = '';
                            }
                        }} />
                        <ul>
                            {(comments[index] || []).map((comment, i) => (
                                <li key={i}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

};


    
    


export default VideoList;
