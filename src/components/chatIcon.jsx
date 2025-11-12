import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chatIcon.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "me", text: input }]);
    setInput("");
    // sau này emit socket hoặc gọi API
  };

  const handleOpenChatScreen = () => {
    setOpen(false);
    navigate("/chat");
  };

  return (
    <>
      {/* Nút tròn mở chat */}
      <div className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Hộp chat nhỏ */}
      {open && (
        <div className="chat-popup">
          <div className="chat-header-mini">
            <strong>Hỗ trợ tư vấn</strong>
            <div style={{ display: "flex", gap: "6px" }}>
              <button className="chat-expand-btn" onClick={handleOpenChatScreen}>
                ⬆
              </button>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
          </div>

          <div className="chat-body-mini">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble-mini ${
                  msg.sender === "me" ? "me" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-mini">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
}
