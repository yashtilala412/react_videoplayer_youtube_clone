import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const relatedVideos = [
    // List of related videos
];

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <h4>Related Videos</h4>
                <div className="related-videos">
                    {relatedVideos.map((relatedVideo, i) => (
                        <div key={i} className="video">
                            <h5>{relatedVideo.title}</h5>
                            <iframe width="150" height="100" src={relatedVideo.url} title="Related YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);













export default VideoList;
