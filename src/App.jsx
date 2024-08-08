import React, { useState } from 'react';

const VideoUpload = ({ onUpload }) => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleUpload = () => {
    const newVideo = {
      url: URL.createObjectURL(video),
      title,
      artist,
      views: '0 views',
      uploadDate: new Date().toLocaleDateString(),
    };
    onUpload(newVideo);
  };

  return (
    <div className="video-upload">
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUpload;
