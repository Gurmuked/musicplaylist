import React from "react";

const PlayerActions = ({ onVolume, onPlaylist, onShuffle, onRepeat, isShuffling, isRepeating }) => (
  <div className="flex items-center justify-between w-full mb-2 px-1 text-white text-xl">
    <button onClick={onVolume} title="Volume" className="hover:text-green-400">
      <span>&#128266;</span>
    </button>
    <button onClick={onPlaylist} title="Playlist" className="hover:text-green-400">
      <span>&#9776;</span>
    </button>
    <button onClick={onShuffle} title="Shuffle" className={isShuffling ? "border-2 border-red-900" : "hover:text-green-400"}>
      <span>&#128256;</span>
    </button>
    <button onClick={onRepeat} title="Repeat" className={isRepeating ? "border-2 border-red-900" : "hover:text-green-400"}>
      <span >&#128257;</span>
    </button>
  </div>
);

export default PlayerActions;
