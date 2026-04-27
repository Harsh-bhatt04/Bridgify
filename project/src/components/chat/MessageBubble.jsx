import React from "react";

const MessageBubble = ({ message }) => {

  return (
    <div className={`message-row ${message.sender}`}>

      <div className="message-bubble">
        {message.text}
      </div>

    </div>
  );
};

export default MessageBubble;