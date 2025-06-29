import React from "react";

const PlayerControls = ({ isPlaying, onPlayPause, onPrev, onNext }) => (
  <div className="flex items-center justify-center gap-6 my-3">
    <button onClick={onPrev} className="text-2xl hover:text-green-500"><span>&#9198;</span></button>
    <button onClick={onPlayPause} className="text-3xl hover:text-green-500">
      {isPlaying ? <span className="text-white">&#10073;&#10073;</span> : <span>&#9654;</span>}
    </button>
    <button onClick={onNext} className="text-2xl hover:text-green-500"><span>&#9197;</span></button>
  </div>
);

export default PlayerControls;
