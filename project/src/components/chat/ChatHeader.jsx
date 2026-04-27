import React from "react";

const ChatHeader = ({ user }) => {

  if (!user) {
    return (
      <div className="chat-header">
        <p>Select a chat</p>
      </div>
    );
  }

  return (
    <div className="chat-header">

      <img
        src={user.profileImage || "https://i.pravatar.cc/40"}
        alt=""
      />

      <div>
        <h3>{user.username}</h3>
        <span className="online">Online</span>
      </div>

    </div>
  );
};

export default ChatHeader;