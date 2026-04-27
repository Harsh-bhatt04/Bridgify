import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatSidebar = ({ setSelectedUser }) => {

  const [connections, setConnections] = useState([]);

  useEffect(() => {

    const fetchConnections = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found in localStorage");
          return;
        }

        const res = await axios.get(
          "http://localhost:8000/api/connections",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Connections:", res.data);

        setConnections(res.data);

      } catch (err) {
        console.error("Error loading connections:", err.response?.data || err);
      }

    };

    fetchConnections();

  }, []);

  return (
    <div className="chat-sidebar">

      <h2>Messages</h2>

      {connections.length === 0 ? (
        <p style={{ padding: "10px" }}>No connections yet</p>
      ) : (
        connections.map(user => (
          <div
            key={user._id}
            className="chat-user"
           onClick={() => setSelectedUser({ ...user })}
          >
            <img
              src={user.profileImage || "https://i.pravatar.cc/40"}
              alt=""
            />

            <div>
              <p>{user.username}</p>
              <span>Start chatting...</span>
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default ChatSidebar;