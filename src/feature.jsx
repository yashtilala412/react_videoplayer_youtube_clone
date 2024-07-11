import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
const [watchLater, setWatchLater] = useState([]);

const handleWatchLater = (index) => {
    setWatchLater([...watchLater, videos[index]]);
};

return (
    <div className="video-list">
        {videos.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <button onClick={() => handleWatchLater(index)}>Watch Later</button>
            </div>
        ))}
        <h2>Watch Later</h2>
        {watchLater.map((video, index) => (
            <div key={index} className="video">
                <h3>{video.title}</h3>
                <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        ))}
    </div>
);const [playlists, setPlaylists] = useState({ "Playlist 1": [], "Playlist 2": [] });

const handleAddToPlaylist = (playlist, index) => {
    setPlaylists({ ...playlists, [playlist]: [...playlists[playlist], videos[index]] });
};

return (
    const [playlists, setPlaylists] = useState({});
    const [newPlaylist, setNewPlaylist] = useState("");
    
    const handleCreatePlaylist = () => {
        setPlaylists({ ...playlists, [newPlaylist]: [] });
        setNewPlaylist("");
    };
    
    const handleAddToPlaylist = (playlist, index) => {
        setPlaylists({ ...playlists, [playlist]: [...playlists[playlist], videos[index]] });
    };
    
    return (
        <div className="video-list">
            <input
                type="text"
                placeholder="New playlist name"
                value={newPlaylist}
                onChange={e => setNewPlaylist(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
            {videos.map((video, index) => (
                <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    {Object.keys(playlists).map((playlist, i) => (
                        <button key={i} onClick={() => handleAddToPlaylist(playlist, index)}>Add to {playlist}</button>
                    ))}
                </div>
            ))}
            {Object.keys(playlists).map((playlist, i) => (
                <div key={i} className="playlist">
                    <h2>{playlist}</h2>
                    {playlists[playlist].map((video, index) => (
                        <div key={index} className="video">
                            <h3>{video.title}</h3>
                            <iframe width="300" height="200" src={video.url} title="YouTube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
    











export default VideoList;
