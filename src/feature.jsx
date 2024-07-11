import React, { useState } from 'react';

const [currentPage, setCurrentPage] = useState(1);
const videosPerPage = 5;
const indexOfLastVideo = currentPage * videosPerPage;
const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

return (
    <div className="video-list">
        {currentVideos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
        <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastVideo >= videos.length}>Next</button>
        </div>
        .video-list {
    display: flex;
    flex-wrap: wrap;
}

.video {
    flex: 1 1 calc(33.333% - 10px);
    margin: 5px;
}

@media (max-width: 768px) {
    .video {
        flex: 1 1 calc(50% - 10px);
    }
}

@media (max-width: 480px) {
    .video {
        flex: 1 1 100%;
    }
}
    </div>
);




export default VideoList;
