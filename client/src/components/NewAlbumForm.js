import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const NewAlbumForm = (props) => {
  const [newAlbum, setNewAlbum] = useState({
    name: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = (event) => {
    setNewAlbum({ ...newAlbum, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/v1/albums", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newAlbum),
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
        console.log(responseBody);
        setShouldRedirect(true);
      }
    } catch (error) {}
  };

  if (shouldRedirect) {
    return <Redirect to="/albums" />;
  }

  return (
    <div className="callout">
      <h1>Add a new Album to the Collection</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Title
          <input type="text" id="name" name="name" value={newAlbum.name} onChange={handleChange} />
        </label>
        <div className="button-group">
          <input type="submit" value="Add" className="button" />
        </div>
      </form>
    </div>
  );
};

export default NewAlbumForm;
