import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";

const NewAlbumForm = (props) => {
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    image: {},
  });
  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
    name: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = (event) => {
    setNewAlbum({ ...newAlbum, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleImageUpload = (acceptedImage) => {
    setNewAlbum({
      ...newAlbum,
      image: acceptedImage[0],
    });

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
      name: acceptedImage[0].name,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("name", newAlbum.name);
    body.append("image", newAlbum.image);

    try {
      const response = await fetch("/api/v1/albums", {
        method: "POST",
        headers: new Headers({
          Accept: "image/jpeg",
        }),
        body: body,
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
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Your Image - drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <img src={uploadedImage.preview} alt={uploadedImage.name} className="album-image" />

        <div className="button-group">
          <input type="submit" value="Add" className="button" />
        </div>
      </form>
    </div>
  );
};

export default NewAlbumForm;
