import React from "react";

import EditSongForm from "./EditSongForm";

const SongTile = ({ songObject, setSongToEdit, songToEdit, patchSong }) => {
  const handleClick = () => {
    setSongToEdit(songObject);
  };

  return (
    <div className="callout">
      <p>{songObject.name}</p>
      <ul>
        <li>{songObject.isCool ? "Super Cool" : "Kinda Lame"}</li>
        <li>Description: {songObject.description}</li>
        <li>Num Plays: {songObject.plays}</li>
      </ul>
      <button onClick={handleClick} className="button">
        edit
      </button>

      {songToEdit.id ? <EditSongForm songToEdit={songToEdit} patchSong={patchSong} /> : null}
    </div>
  );
};

export default SongTile;
