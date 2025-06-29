import React from "react";

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const percent = duration ? (currentTime / duration) * 100 : 0;
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  return (
    <div className="flex items-center w-full gap-2 mb-2">
      <span className="text-xs text-gray-400 min-w-[36px]">{formatTime(currentTime)}</span>
      <div
        className="flex-1 h-1.5 bg-gray-700 rounded cursor-pointer relative"
        onClick={e => {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          onSeek((x / rect.width) * duration);
        }}
      >
        <div className="h-full bg-green-500 rounded" style={{ width: percent + "%" }}></div>
      </div>
      <span className="text-xs text-gray-400 min-w-[36px]">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
