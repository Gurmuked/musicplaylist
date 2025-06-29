import React from "react";

const SongInfo = ({ title, artist }) => (
  <div className="text-center mb-2">
    <div className="text-xl font-bold text-white">{title}</div>
    <div className=" text-base text-gray-400">{artist}</div>
  </div>
);

export default SongInfo;
