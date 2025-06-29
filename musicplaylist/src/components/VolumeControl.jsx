import React from "react";

const VolumeControl = ({ volume, onVolumeChange }) => (
  <div className="flex items-center w-full gap-2 mb-2">
    <span className="text-lg">&#128266;</span>
    <div
      className="flex-1 h-1.5 bg-gray-700 rounded cursor-pointer relative"
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        onVolumeChange(x / rect.width);
      }}
    >
      <div className="h-full bg-green-500 rounded" style={{ width: (volume * 100) + "%" }}></div>
    </div>
  </div>
);

export default VolumeControl;
