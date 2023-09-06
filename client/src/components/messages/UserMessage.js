import React, { useState, useEffect } from "react";

import MessageForm from "./MessageForm";

const UserMessage = (props) => {
  const [user, setUser] = useState({ messages: [] });
  const { id: userParamsId } = props.computedMatch.params;

  const getMessages = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userParamsId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUser(body.user);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const postMessage = async (newMessageData) => {
    try {
      const response = await fetch(`/api/v1/users/${userParamsId}/messages`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newMessageData),
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
        setUser({ ...user, messages: [...user.messages, responseBody.message] });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const messageTiles = user.messages.map((message) => {
    let messageClass;
    let senderEmail = message.sender.email;
    if (senderEmail === props.user.email) {
      messageClass = "message-right";
      senderEmail = "you";
    }

    return (
      <div key={message.id} className={`callout ${messageClass}`}>
        <p>{message.body}</p>
        <i>
          {senderEmail}, {new Date(message.createdAt).toLocaleString()}
        </i>
      </div>
    );
  });

  return (
    <div className="callout">
      <MessageForm postMessage={postMessage} />
      <div className="callout">
        <p>Your message history with {user.email}</p>
        {messageTiles}
      </div>
    </div>
  );
};

export default UserMessage;
