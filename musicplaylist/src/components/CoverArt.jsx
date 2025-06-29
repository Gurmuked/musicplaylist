import React from "react";

const CoverArt = ({ cover, title }) => (
  <div className="w-[80%] h-56 rounded-xl overflow-hidden shadow-lg mb-4">
    <img src={cover} alt={title} className="w-full h-full object-cover" />
  </div>
);

export default CoverArt;
