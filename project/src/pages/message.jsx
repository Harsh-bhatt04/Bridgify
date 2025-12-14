import { useState } from "react";
import { Send } from "lucide-react";

export default function Messages() {
  const users = [
    {
      id: 1,
      name: "Riya Sharma",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      messages: [
        { from: "them", text: "Hey! How are you?" },
        { from: "me", text: "I'm good! What's up?" }
      ]
    },
    {
      id: 2,
      name: "Arjun Patel",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      messages: [
        { from: "them", text: "Did you complete your project?" },
        { from: "me", text: "Almost! What about you?" }
      ]
    },
    {
      id: 3,
      name: "Simran Kaur",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      messages: [
        { from: "them", text: "Let's catch up tomorrow!" }
      ]
    }
  ];

  const [activeChat, setActiveChat] = useState(null);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    activeChat.messages.push({ from: "me", text });
    setText("");
  };

  return (
    <div className="flex h-[85vh] border rounded-xl overflow-hidden shadow-lg 
                    bg-white dark:bg-gray-900 dark:border-gray-700">

      {/* LEFT SIDEBAR */}
      <div className="w-1/3 border-r bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700 
                       dark:text-white">
          Messages
        </h2>

        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => setActiveChat(u)}
            className={`flex items-center gap-3 p-3 cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-700
              ${activeChat?.id === u.id ? 
                "bg-gray-200 dark:bg-gray-700" : ""}`}
          >
            <img
              src={u.photo}
              alt={u.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold dark:text-white">{u.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Tap to chat</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="w-2/3 flex flex-col dark:bg-gray-900">

        {/* CHAT HEADER */}
        {activeChat ? (
          <div className="flex items-center gap-3 p-4 border-b 
                          bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
            <img
              src={activeChat.photo}
              alt={activeChat.name}
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-xl font-bold dark:text-white">
              {activeChat.name}
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full 
                          text-gray-500 dark:text-gray-400 text-lg">
            Select a user to start chatting
          </div>
        )}

        {/* CHAT MESSAGES */}
        {activeChat && (
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {activeChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.from === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs 
                    text-white break-words ${
                      msg.from === "me"
                        ? "bg-blue-600 dark:bg-blue-500 rounded-br-none"
                        : "bg-gray-700 dark:bg-gray-600 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MESSAGE INPUT */}
        {activeChat && (
          <div className="p-3 border-t bg-white dark:bg-gray-900 
                          dark:border-gray-700 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border rounded-full px-4 py-2 
                         dark:text-white dark:bg-gray-800 dark:border-gray-700
                         focus:ring-2 focus:ring-blue-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 dark:bg-blue-500 text-white 
                         p-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-400"
            >
              <Send size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
