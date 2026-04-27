import React from "react";

const ChatMessages = ({ messages }) => {

  return (
    <div className="chat-messages">

      {messages.map((msg,i)=>(
        <div key={i} className="chat-message">
          <b>{msg.senderId}</b>: {msg.message}
        </div>
      ))}

    </div>
  );

};

export default ChatMessages;