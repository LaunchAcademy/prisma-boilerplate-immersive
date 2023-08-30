import React, { useState } from "react";

const NewSongForm = ({ postSong }) => {
  const [newSong, setNewSong] = useState({
    name: "",
    description: "",
    plays: "",
    isCool: "",
  });

  const handleInputChange = (event) => {
    setNewSong({
      ...newSong,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postSong(newSong);
    clearForm();
  };

  const clearForm = () => {
    setNewSong({
      name: "",
      description: "",
      plays: "",
      isCool: "",
    });
  };

  return (
    <div className="callout">
      <h1>Add a Song to this Album</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} value={newSong.name} />
        </label>

        <div>
          <p>This song is cool:</p>
          <input
            type="radio"
            name="isCool"
            value="true"
            checked={newSong.isCool === "true"}
            onChange={handleInputChange}
          />
          <label>True</label>

          <input
            type="radio"
            name="isCool"
            value="false"
            checked={newSong.isCool === "false"}
            onChange={handleInputChange}
          />
          <label>False</label>
        </div>

        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newSong.description}
          />
        </label>

        <label>
          Number of Times Song has been played:
          <input type="text" name="plays" onChange={handleInputChange} value={newSong.plays} />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewSongForm;
