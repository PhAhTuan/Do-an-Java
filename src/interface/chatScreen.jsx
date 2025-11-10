import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./chatScreen.css";

const socket = io("http://localhost:5000");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const chatWith = JSON.parse(localStorage.getItem("chatWith"));

  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinChat", { userId: user.id, chatWith: chatWith.id });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [user.id, chatWith.id]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = {
      sender: user.id,
      receiver: chatWith.id,
      text: input,
    };
    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Người đang tư vấn</h3>
        <p>{chatWith?.name}</p>
      </div>

      <div className="chat-main">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${m.sender === user.id ? "me" : "them"}`}
            >
              {m.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập tin nhắn..."
          />
          <button onClick={handleSend}>Gửi</button>
        </div>
      </div>
    </div>
  );
}
