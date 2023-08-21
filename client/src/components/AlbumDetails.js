import React, { useState, useEffect } from "react";

import NewSongForm from "./NewSongForm";
import SongTile from "./SongTile";

const AlbumShow = (props) => {
  const [album, setAlbum] = useState({
    name: "",
    songs: [],
  });
  const [errors, setErrors] = useState({});

  const albumId = props.match.params.id;

  const getAlbum = async () => {
    try {
      const response = await fetch(`/api/v1/albums/${albumId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();

      setAlbum(body.album);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  const postSong = async (newSongData) => {
    try {
      const response = await fetch(`/api/v1/albums/${albumId}/songs`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newSongData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          console.log(errorBody);
          // const serverErrors = translateServerErrors(errorBody.errors);
          // console.log(serverErrors);
        }
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      } else {
        const responseBody = await response.json();
        const updatedSongs = album.songs.concat(responseBody.song);
        setErrors([]);
        setAlbum({ ...album, songs: updatedSongs });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const songTiles = album.songs.map((songObject) => {
    return <SongTile key={songObject.id} {...songObject} />;
  });

  return (
    <div>
      <h1>Album Name: {album.name}</h1>
      <h4>Songs:</h4>
      {songTiles}
      <div>
        <NewSongForm postSong={postSong} />
      </div>
    </div>
  );
};

export default AlbumShow;
