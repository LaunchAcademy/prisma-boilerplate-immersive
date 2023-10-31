import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NewSongForm from "../songs/NewSongForm";
import SongTile from "../songs/SongTile";

const AlbumShow = (props) => {
  const [album, setAlbum] = useState({
    name: "",
    image: "",
    user: {},
    songs: [],
  });
  const [songToEdit, setSongToEdit] = useState({});
  const [errors, setErrors] = useState({});
  const { id: albumId } = props.match.params;

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

  const patchSong = async (editedSong) => {
    try {
      const response = await fetch(`/api/v1/songs/${editedSong.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(editedSong),
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
        const updatedSong = responseBody.song;
        const updatedSongIndex = album.songs.findIndex((song) => song.id === updatedSong.id);
        const songsCopy = [...album.songs];
        songsCopy.splice(updatedSongIndex, 1, updatedSong);

        setErrors([]);
        setSongToEdit({});
        setAlbum({ ...album, songs: songsCopy });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteSong = async (songIdToDelete) => {
    try {
      const response = await fetch(`/api/v1/songs/${songIdToDelete}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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
        // const responseBody = await response.json();
        const remainingSongs = album.songs.filter((song) => song.id != songIdToDelete);
        setAlbum({
          ...album,
          songs: remainingSongs,
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const songVote = async ({ songId, voteValue }) => {
    try {
      const response = await fetch(`/api/v1/songs/${songId}/votes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ voteValue }),
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
        const updatedSong = responseBody.song;
        const updatedSongIndex = album.songs.findIndex((song) => song.id === updatedSong.id);
        const songsCopy = [...album.songs];
        songsCopy.splice(updatedSongIndex, 1, updatedSong);

        setErrors([]);
        setAlbum({ ...album, songs: songsCopy });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const songTiles = album.songs.map((songObject) => {
    return (
      <SongTile
        key={songObject.id}
        songToEdit={songToEdit}
        setSongToEdit={setSongToEdit}
        songObject={songObject}
        patchSong={patchSong}
        deleteSong={deleteSong}
        songVote={songVote}
        user={props.user}
      />
    );
  });

  let submittedBy = album.user.email;
  let submittedByLinkAddress = `/users/${album.user.id}/messages`;
  if (album.user.id === props.user?.id) {
    submittedBy = "You";
    submittedByLinkAddress = `/users/${props.user?.id}`;
  }

  return (
    <div className="callout">
      <h1>Album Name: {album.name}</h1>
      <p>
        submitted by: <Link to={submittedByLinkAddress}>{submittedBy}</Link>
      </p>
      {album.image ? (
        <img src={album.image} alt={album.name} className="album-image" />
      ) : (
        <p>No album artwork</p>
      )}

      <div className="callout primary">
        <NewSongForm postSong={postSong} />
      </div>

      <div className="callout">
        <h4>Songs:</h4>
        {songTiles.length > 0 ? (
          <div className="callout secondary">{songTiles}</div>
        ) : (
          <p>No songs have been added yet</p>
        )}
      </div>
    </div>
  );
};

export default AlbumShow;
