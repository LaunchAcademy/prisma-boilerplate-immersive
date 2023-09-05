import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ user: currentUser }) => {
  const [userConversations, setUserConversations] = useState([]);

  const getConversations = async () => {
    try {
      const response = await fetch(`/api/v1/users/${currentUser?.id}/messages`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUserConversations(body.messages);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  const conversationTiles = userConversations.map((user) => {
    return (
      <li key={user.id}>
        <Link to={`/users/${user.id}/messages`}>{user.email}</Link>
      </li>
    );
  });

  return (
    <div>
      <h1>{currentUser?.email}</h1>

      <div className="callout">
        {conversationTiles.length > 0 ? (
          <>
            <h3>View messages with:</h3>
            <ul>{conversationTiles}</ul>
          </>
        ) : (
          <p>No messages</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
