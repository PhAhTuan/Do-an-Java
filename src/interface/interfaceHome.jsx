import React from "react";
import "./interfaceHome.css";

export default function InterfaceHome() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Chăm sóc người cao tuổi tận tâm & chuyên nghiệp</h1>
          <p>
            Dịch vụ chăm sóc toàn diện – sức khỏe, tinh thần và thể chất – mang lại sự an tâm cho gia đình bạn.
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

      <section className="services">
        <h2>Dịch vụ nổi bật</h2>
        <div className="service-grid">
          <div className="service-card">
            <img
              src="https://images.unsplash.com/photo-1580281657521-21b3cfa2a6a5?auto=format&fit=crop&w=400&q=80"
              alt="Tư vấn dinh dưỡng"
            />
            <h3>Tư vấn dinh dưỡng</h3>
            <p>Hỗ trợ chế độ ăn uống hợp lý, cân bằng cho người cao tuổi giúp duy trì sức khỏe.</p>
          </div>

          <div className="service-card">
            <img
              src="https://images.unsplash.com/photo-1588776814546-57aee6c11b40?auto=format&fit=crop&w=400&q=80"
              alt="Theo dõi sức khỏe"
            />
            <h3>Theo dõi sức khỏe</h3>
            <p>Kiểm tra định kỳ, theo dõi các chỉ số sức khỏe để phát hiện sớm vấn đề tiềm ẩn.</p>
          </div>

          <div className="service-card">
            <img
              src="https://images.unsplash.com/photo-1618354691661-9064302c61b0?auto=format&fit=crop&w=400&q=80"
              alt="Chăm sóc tại nhà"
            />
            <h3>Chăm sóc tại nhà</h3>
            <p>Đội ngũ điều dưỡng tận tâm, hỗ trợ chăm sóc 24/7 ngay tại nhà bạn.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
