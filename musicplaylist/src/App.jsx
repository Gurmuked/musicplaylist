import React, { useRef, useState, useEffect } from "react";
import PlayerHeader from "./components/PlayerHeader";
import CoverArt from "./components/CoverArt";
import SongInfo from "./components/SongInfo";
import PlayerControls from "./components/PlayerControls";
import ProgressBar from "./components/ProgressBar";
import VolumeControl from "./components/VolumeControl";
import Playlist from "./components/Playlist";
import PlayerActions from "./components/PlayerActions";

const songs = [
  {
    title: "Arsicha",
    artist: "Jorji Abbu",
    src: "./src/assets/music/Joorji.mp3",
    cover: "./src/assets/images/jj.jpg",
  },
  {
    title: "Bilille",
    artist: "Andualem Gosa",
    src: "./src/assets/music/Bilillee.mp3",
    cover: "./src/assets/images/an.jpg",
  },
  {
    title: "Ketalayayen",
    artist: "Madingo Afework",
    src: "./src/assets/music/Madingo.mp3",
    cover: "./src/assets/images/mm1.jpg",
  },
    {
    title: "Aadaa tiyya lola",
    artist: "Adem Mohammed",
    src: "./src/assets/music/Aadam.mp3",
    cover: "./src/assets/images/aa.jpg",
  },
      {
    title: "Boole Boole",
    artist: "Sona Takele",
    src: "./src/assets/music/sona.mp3",
    cover: "./src/assets/images/ss.jpg",
  },
];

function App() {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => setIsPlaying((p) => !p);
  const handlePrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };
  const handleNext = () => {
    if (isShuffling) {
      let next;
      do {
        next = Math.floor(Math.random() * songs.length);
      } while (next === currentSong && songs.length > 1);
      setCurrentSong(next);
    } else {
      setCurrentSong((prev) => (prev + 1) % songs.length);
    }
    setIsPlaying(true);
  };
  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  const handleVolume = (v) => setVolume(v);
  const handleSelect = (idx) => {
    setCurrentSong(idx);
    setIsPlaying(true);
  };
  const handleAutoplay = () => setIsAutoplay((a) => !a);
  const handleShuffle = () => {
    setIsShuffling((s) => {
      if (!s) setIsRepeating(false);
      return !s;
    });
  };
  const handleRepeat = () => {
    setIsRepeating((r) => {
      if (!r) setIsShuffling(false); 
      return !r;
    });
  };
  const handleFavorite = () => setIsFavorite((f) => !f);
  const handlePlaylist = () => setShowPlaylist((p) => !p);
  const handleVolumeIcon = () => setShowVolume((v) => !v);

  const onTimeUpdate = (e) => setCurrentTime(e.target.currentTime);
  const onLoadedMetadata = (e) => setDuration(e.target.duration);
  const onEnded = () => {
    if (isRepeating) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isAutoplay || isShuffling) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-[50vw] p-6 flex flex-col items-center">
        <PlayerHeader />
        <CoverArt cover={songs[currentSong].cover} title={songs[currentSong].title} />
        <SongInfo title={songs[currentSong].title} artist={songs[currentSong].artist} />
        <PlayerActions
          onVolume={handleVolumeIcon}
          onPlaylist={handlePlaylist}
          onShuffle={handleShuffle}
          onRepeat={handleRepeat}
          onFavorite={handleFavorite}
          isShuffling={isShuffling}
          isRepeating={isRepeating}

        />
        <div className="w-full flex flex-col items-center">
          <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
        </div>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        {showVolume && <VolumeControl volume={volume} onVolumeChange={handleVolume} />}
        {showPlaylist && <Playlist songs={songs} currentSong={currentSong} onSelect={handleSelect} />}
        <audio
          ref={audioRef}
          src={songs[currentSong].src}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

export default App;
