import React, { useState } from "react";
import "./interfaceChat.css";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  const chatList = [
    { id: 1, name: "Nguyễn Thị Mai (Nhân viên)", lastMessage: "Chào bạn, bạn cần tư vấn gì ạ?" },
    { id: 2, name: "Trần Văn An (Nhân viên)", lastMessage: "Dịch vụ chăm sóc tại nhà bên em rất tốt!" },
  ];

  const messages = [
    { sender: "me", text: "Chào bạn!" },
    { sender: "them", text: "Chào bạn, bạn cần tư vấn gì về dịch vụ ạ?" },
    { sender: "me", text: "Tôi muốn hỏi về chăm sóc tại nhà." },
  ];

  return (
    <div className="home-container">
      <div className="chat-wrapper">
        {/* DANH SÁCH BÊN TRÁI */}
        <div className="chat-sidebar">
          <h3>💬 Danh sách trò chuyện</h3>
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat === chat.id ? "active" : ""}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <p className="chat-name">{chat.name}</p>
              <p className="chat-last">{chat.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* NỘI DUNG CHAT BÊN PHẢI */}
        <div className="chat-main">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <h4>{chatList.find(c => c.id === selectedChat)?.name}</h4>
              </div>

              <div className="chat-body">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-bubble ${msg.sender === "me" ? "me" : "them"}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input type="text" placeholder="Nhập tin nhắn..." />
                <button className="btn-primary">Gửi</button>
              </div>
            </>
          ) : (
            <div className="chat-empty">Chọn một cuộc trò chuyện để bắt đầu</div>
          )}
        </div>
      </div>
    </div>
  );
}
