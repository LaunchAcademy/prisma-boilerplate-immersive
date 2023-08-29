import React, { useState } from "react";

import EditSongForm from "./EditSongForm";

const SongTile = ({ songObject, setSongToEdit, songToEdit, patchSong, deleteSong, user }) => {
  const [shouldDelete, setShouldDelete] = useState(false);

  const handleEdit = () => {
    setSongToEdit(songObject);
  };

  const handleDeleteConfirmation = () => {
    setShouldDelete(true);
  };

  const handleDelete = () => {
    deleteSong(songObject.id);
  };

  return (
    <div className="callout">
      <p>{songObject.name}</p>
      <ul>
        <li>{songObject.isCool ? "Super Cool" : "Kinda Lame"}</li>
        <li>Description: {songObject.description}</li>
        <li>Num Plays: {songObject.plays}</li>
      </ul>

      {user ? (
        <>
          <div className="button-group">
            <button onClick={handleEdit} className="button">
              edit
            </button>
            <button onClick={handleDeleteConfirmation} className="button alert">
              delete
            </button>
          </div>

          {shouldDelete ? (
            <>
              <p>Are you sure you want to delete this song?</p>
              <div className="button-group">
                <button onClick={handleDelete} className="button">
                  yes
                </button>
                <button onClick={() => setShouldDelete(false)} className="button alert">
                  no
                </button>
              </div>
            </>
          ) : null}

          {songToEdit.id ? <EditSongForm songToEdit={songToEdit} patchSong={patchSong} /> : null}
        </>
      ) : null}
    </div>
  );
};

export default SongTile;
