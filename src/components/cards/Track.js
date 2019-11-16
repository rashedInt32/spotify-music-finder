import React from "react";

const Track = ({ name, album, artists, onClickTrack }) => {
  return (
    <div className="track-card" onClick={onClickTrack}>
      <h6>{name}</h6>
      <div className="meta">
        <span>Album: {album}</span>
        <span>
          Artist:
          {artists &&
            artists.map((artist, i) => <span key={i}>{artist.name}</span>)}
        </span>
      </div>
    </div>
  );
};

export default Track;
