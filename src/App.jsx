import React, { useState, useEffect } from 'react';
import style from "./App.module.css";
function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);

    const storedTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
    setCurrentTrackIndex(storedTrackIndex);
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setPlaylist([...playlist, ...files]);
    localStorage.setItem('playlist', JSON.stringify([...playlist, ...files]));
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    const audio = document.getElementById('audioPlayer');
    audio.src = URL.createObjectURL(playlist[index]);
    audio.play();
    localStorage.setItem('currentTrackIndex', index);
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(nextIndex);
  };

  const handleEnded = () => {
    playNextTrack();
  };

  return (
    <div className={style.home}>
        <div className={style.nav}>
        <h1>Music Player</h1>
        </div>
      <input type="file" accept="audio/*" onChange={handleFileUpload} multiple />
      <ul>
        <li>Playlist</li>
        <li>Click to play below playlist:</li>
        {playlist.map((track, index) => (
          <li key={index}>
            <button onClick={() => playTrack(index)}>{track.name}</button>
          </li>
        ))}
      </ul>
      <div className={style.play}>
        Now Playing: {playlist[currentTrackIndex] && playlist[currentTrackIndex].name}
        <audio id="audioPlayer" controls onEnded={handleEnded}></audio>
      </div>
    </div>
  );
}

export default App;
