import React, { useState } from "react";
import "./interfaceHome.css";
import { useNavigate } from "react-router-dom";

export default function InterfaceHome({ onLogout }) {
  const navigate = useNavigate();
  const [openAIChat, setOpenAIChat] = useState(false);

  return (
    <div className="home-container">
      {/* ----- HEADER ----- */}
      <header className="header">
        <div className="logo">Elder Care Connect</div>
        <nav className="nav">
          <button className="nav-link">Trang chủ</button>
          <button className="nav-link">Dịch vụ</button>
          <button className="nav-link">Tin tức</button>
          <button className="nav-link">Liên hệ</button>
        </nav>
        <div className="user-actions">
          <button className="btn-primary" onClick={() => navigate("/information")}>
            Cá nhân
          </button>
          <button className="btn-primary" onClick={onLogout}>Đăng xuất</button>
        </div>
      </header>

      {/* ----- HERO ----- */}
      <section className="hero">
        <div className="hero-content">
          <h1>Chăm sóc người cao tuổi tận tâm & chuyên nghiệp</h1>
          <p>
            Dịch vụ chăm sóc toàn diện – sức khỏe, tinh thần và thể chất –
            mang lại sự an tâm cho gia đình bạn.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Đặt lịch ngay</button>
            <button className="btn-outline">Tìm hiểu thêm</button>
          </div>
        </div>
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1581579184684-2cdbef1b1c06?auto=format&fit=crop&w=800&q=80"
          alt="Elder Care"
        />
      </section>

      {/* ----- DỊCH VỤ ----- */}
      <section className="services">
        <h2>Dịch vụ nổi bật</h2>
        <div className="service-grid">
          <div className="service-card">
            <img
              src="https://images.unsplash.com/photo-1580281657521-21b3cfa2a6a5?auto=format&fit=crop&w=400&q=80"
              alt="Tư vấn dinh dưỡng"
            />
            <h3>Tư vấn dinh dưỡng</h3>
            <p>
              Hỗ trợ chế độ ăn uống hợp lý, cân bằng cho người cao tuổi giúp
              duy trì sức khỏe.
            </p>
          </div>
          <div className="service-card">
            <img
              src="https://images.unsplash.com/photo-1588776814546-57aee6c11b40?auto=format&fit=crop&w=400&q=80"
              alt="Theo dõi sức khỏe"
            />
            <h3>Theo dõi sức khỏe</h3>
            <p>
              Kiểm tra định kỳ, theo dõi các chỉ số sức khỏe để phát hiện sớm
              vấn đề tiềm ẩn.
            </p>
          </div>
          <div className="service-card">
            <img
              src="/public/anh1.png"
              alt="Chăm sóc tại nhà"
            />
            <h3>Chăm sóc tại nhà</h3>
            <p>
              Đội ngũ điều dưỡng tận tâm, hỗ trợ chăm sóc 24/7 ngay tại nhà bạn.
            </p>
          </div>
        </div>
      </section>

      {/* ----- TIN TỨC ----- */}
      <section className="articles">
        <h2>Tin tức & Chia sẻ</h2>
        <div className="article-list">
          <div className="article-item">
            <img
              src="https://images.unsplash.com/photo-1576765607924-b7d8e007f3e4?auto=format&fit=crop&w=400&q=80"
              alt="Tin tức 1"
            />
            <div>
              <h3>5 cách chăm sóc người cao tuổi trong mùa lạnh</h3>
              <p>
                Giữ ấm, bổ sung dinh dưỡng và vận động hợp lý để bảo vệ sức khỏe
                người thân.
              </p>
            </div>
          </div>
          <div className="article-item">
            <img
              src="https://images.unsplash.com/photo-1581093458791-9f6c3c92a3d5?auto=format&fit=crop&w=400&q=80"
              alt="Tin tức 2"
            />
            <div>
              <h3>Lợi ích của việc tập thể dục nhẹ mỗi ngày</h3>
              <p>
                Duy trì vận động giúp cải thiện tinh thần, giấc ngủ và sức đề
                kháng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----- FOOTER ----- */}
      <footer className="footer">
        <p>© 2025 ElderCare Connect | Tận tâm – Chu đáo – Chuyên nghiệp</p>
      </footer>

      {/* ----- NÚT AI HỖ TRỢ ----- */}
      <div
        className="ai-button"
        onClick={() => setOpenAIChat(!openAIChat)}
        title="Trợ lý AI"
      >
        🤖
      </div>

      {openAIChat && (
        <div className="ai-chatbox">
          <div className="ai-header">
            <strong>Trợ lý AI</strong>
            <button onClick={() => setOpenAIChat(false)}>✖</button>
          </div>
          <div className="ai-body">
            <p>Xin chào 👋 Mình là AI hỗ trợ. Bạn cần giúp gì nào?</p>
          </div>
          <div className="ai-input">
            <input type="text" placeholder="Nhập tin nhắn..." />
            <button>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}