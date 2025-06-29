import React from "react";

const Playlist = ({ songs, currentSong, onSelect }) => (
  <div className="w-full mt-4 rounded-lg py-2 max-h-32 overflow-y-auto">
    {songs.map((song, idx) => (
      <div
        key={idx}
        className={`px-4 py-2 cursor-pointer rounded text-sm ${idx === currentSong ? 'bg-green-500/20 text-white' : 'text-gray-300 hover:bg-green-500/10'}`}
        onClick={() => onSelect(idx)}
      >
        {song.title} - {song.artist}
      </div>
    ))}
  </div>
);

export default Playlist;
