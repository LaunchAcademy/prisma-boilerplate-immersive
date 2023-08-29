import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SongsList = (props) => {
  const [songs, setSongs] = useState([]);

  const getSongs = async () => {
    try {
      const response = await fetch("/api/v1/songs");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      console.log(body);
      setSongs(body.songs);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const songsListItems = songs.map((songsItem) => {
    // <Link to={`/songs/${songsItem.id}`}>
    //     {songsItem.name}
    // </Link>
    return <li key={songsItem.id}>{songsItem.name}</li>;
  });

  return (
    <div>
      <h1>All Songs</h1>
      <ul>{songsListItems}</ul>
    </div>
  );
};

export default SongsList;
