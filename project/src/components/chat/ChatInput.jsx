import React, { useState } from "react";

const ChatInput = ({ sendMessage }) => {

  const [text,setText] = useState("");

  const handleSend = () => {

    if(!text) return;

    sendMessage(text);

    setText("");
  };

  return (
    <div className="chat-input">

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>
  );
};

export default ChatInput;