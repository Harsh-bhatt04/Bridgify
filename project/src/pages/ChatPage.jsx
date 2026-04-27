import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

import socket from "../socket";

import "../styles/chat.css";

const ChatPage = () => {

  const token = localStorage.getItem("token");

  const decoded = token ? jwtDecode(token) : null;

  const currentUserId = decoded?.id;

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  // Load previous messages when user changes
  useEffect(() => {

    if (!selectedUser) return;

    const loadMessages = async () => {
      try {

        const res = await axios.get(
          `http://localhost:8000/api/messages?user1=${currentUserId}&user2=${selectedUser._id}`
        );

        setMessages(res.data);

      } catch (err) {
        console.error("Error loading messages", err);
      }
    };

    loadMessages();
console.log("Current User:", currentUserId)
console.log("Selected User:", selectedUser)
    // join chat room
    socket.emit("joinChat", {
      userId: currentUserId,
      targetId: selectedUser._id
    });

  }, [selectedUser, currentUserId]);



  // Receive real-time messages
  useEffect(() => {

    const handleReceiveMessage = (msg) => {

      // only append if message belongs to this chat
      if (
        msg.senderId === selectedUser?._id ||
        msg.receiverId === selectedUser?._id
      ) {
        setMessages(prev => [...prev, msg]);
      }

    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => socket.off("receiveMessage", handleReceiveMessage);

  }, [selectedUser]);



  const sendMessage = (text) => {

    if (!text || !selectedUser) return;

    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message: text
    });

  };


  return (
    <div className="chat-layout">

      <ChatSidebar setSelectedUser={setSelectedUser} />

      <div className="chat-main">

        {selectedUser ? (
          <>
            <ChatHeader user={selectedUser} />
            <ChatMessages messages={messages} />
            <ChatInput sendMessage={sendMessage} />
          </>
        ) : (
          <div className="no-chat">
            Select a connection to start chatting
          </div>
        )}

      </div>

    </div>
  );
};

export default ChatPage;