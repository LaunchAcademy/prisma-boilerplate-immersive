import React, { useState } from "react";

const EditSongForm = ({ songToEdit, patchSong }) => {
  const defaultForm = {
    name: songToEdit.name,
    description: songToEdit.description || "",
    plays: songToEdit.plays || 0,
    isCool: songToEdit.isCool,
  };
  const [song, setSong] = useState(defaultForm);

  const handleInputChange = (event) => {
    setSong({
      ...song,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchSong({ ...song, id: songToEdit.id });
    clearForm();
  };

  const clearForm = () => {
    setSong(defaultForm);
  };

  return (
    <div className="callout">
      <h1>Edit this Song</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} value={song.name} />
        </label>

        <div>
          <p>This song is cool:</p>
          <input
            type="radio"
            name="isCool"
            value="true"
            checked={song.isCool === "true" || song.isCool === true}
            onChange={handleInputChange}
          />
          <label>True</label>

          <input
            type="radio"
            name="isCool"
            value="false"
            checked={song.isCool === "false" || song.isCool === false}
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
            value={song.description}
          />
        </label>

        <label>
          Number of Times Song has been played:
          <input type="number" name="plays" onChange={handleInputChange} value={song.plays} />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Edit" />
        </div>
      </form>
    </div>
  );
};

export default EditSongForm;
