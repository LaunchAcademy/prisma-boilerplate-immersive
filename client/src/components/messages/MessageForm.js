import React, { useState } from "react";

const MessageForm = ({ postMessage }) => {
  const [newMessage, setNewMessage] = useState({
    body: "",
  });

  const handleChange = (event) => {
    setNewMessage({ ...newMessage, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postMessage(newMessage);
    setNewMessage({ body: "" });
  };

  return (
    <form className="callout" onSubmit={handleSubmit}>
      <label htmlFor="body">
        New Message...
        <input type="text" id="body" name="body" value={newMessage.body} onChange={handleChange} />
      </label>

      <input type="submit" value="Send" />
    </form>
  );
};

export default MessageForm;
