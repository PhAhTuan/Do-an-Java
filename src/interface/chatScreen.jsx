import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./chatScreen.css";

const socket = io("http://localhost:5000");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const chatWith = JSON.parse(localStorage.getItem("chatWith"));
  const chatEndRef = useRef(null);

  // Lấy lịch sử tin nhắn từ backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/messages/${user.id}/${chatWith.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(" Lỗi khi tải lịch sử chat:", err);
      }
    };

    fetchMessages();
  }, [user.id, chatWith.id]);

  //  Kết nối socket và nhận tin nhắn realtime
  useEffect(() => {
    socket.emit("joinChat", { userId: user.id, chatWith: chatWith.id });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [user.id, chatWith.id]);

  //  Gửi tin nhắn mới
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

  //  Cuộn xuống cuối khi có tin nhắn mới
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
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
               Chưa có tin nhắn nào
            </p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`chat-bubble ${m.sender === user.id ? "me" : "them"}`}
              >
                {m.text}
              </div>
            ))
          )}
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
