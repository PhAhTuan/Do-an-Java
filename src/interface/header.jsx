import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./interfaceHome.css";

export default function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        Elder Care Connect
      </div>

      <nav className="nav">
        <button
          className={`nav-link ${currentPath === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </button>
        <button
          className={`nav-link ${currentPath === "/services" ? "active" : ""}`}
          onClick={() => navigate("/services")}
        >
          Dịch vụ
        </button>
        <button
          className={`nav-link ${currentPath === "/news" ? "active" : ""}`}
          onClick={() => navigate("/news")}
        >
          Tin tức
        </button>
        <button
          className={`nav-link ${currentPath === "/contact" ? "active" : ""}`}
          onClick={() => navigate("/contact")}
        >
          Liên hệ
        </button>
      </nav>

      <div className="user-actions">
        <button className="btn-primary" onClick={() => navigate("/profile")}>
          Cá nhân
        </button>
        <button className="btn-outline" onClick={onLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
