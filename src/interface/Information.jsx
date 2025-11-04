import React, { useState } from "react";
import "./Information.css";

export default function ProfilePage() {
  const [tab, setTab] = useState("info"); // info | booked | cart | history | feedback
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901 234 567",
    gender: "Nam",
    dob: "12/03/1970",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="profile-container">
      <h1>👤 Trang cá nhân</h1>

      {/* Thanh điều hướng tab */}
      <div className="profile-tabs">
        <button
          className={tab === "info" ? "active" : ""}
          onClick={() => setTab("info")}
        >
          Thông tin cá nhân
        </button>
        <button
          className={tab === "booked" ? "active" : ""}
          onClick={() => setTab("booked")}
        >
          Dịch vụ đã đặt
        </button>
        <button
          className={tab === "cart" ? "active" : ""}
          onClick={() => setTab("cart")}
        >
          Giỏ hàng
        </button>
        <button
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          Lịch sử thanh toán
        </button>
        <button
          className={tab === "feedback" ? "active" : ""}
          onClick={() => setTab("feedback")}
        >
          Đánh giá của tôi
        </button>
      </div>

      {/* Nội dung tab */}
      <div className="profile-content">
        {/* TAB 1: Thông tin cá nhân */}
        {tab === "info" && (
          <div className="info-section">
            <img src={user.avatar} alt="Avatar" className="avatar" />

            <div className="info-details">
              {isEditing ? (
                <>
                  <label>
                    Họ tên:
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Số điện thoại:
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Giới tính:
                    <select name="gender" value={user.gender} onChange={handleChange}>
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </label>
                  <label>
                    Ngày sinh:
                    <input
                      type="date"
                      name="dob"
                      value={user.dob}
                      onChange={handleChange}
                    />
                  </label>
                  <div className="info-actions">
                    <button className="btn-primary" onClick={handleSave}>
                      Lưu thay đổi
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Hủy
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Họ tên:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Số điện thoại:</strong> {user.phone}</p>
                  <p><strong>Giới tính:</strong> {user.gender}</p>
                  <p><strong>Ngày sinh:</strong> {user.dob}</p>
                  <button
                    className="btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Chỉnh sửa thông tin
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Dịch vụ đã đặt */}
        {tab === "booked" && (
          <div className="booked-section">
            <h2>Dịch vụ đã đặt</h2>
            <div className="service-card">
              <img
                src="https://images.unsplash.com/photo-1599058917212-d750089bc07b"
                alt="Chăm sóc tại nhà"
              />
              <div>
                <h3>Chăm sóc tại nhà</h3>
                <p>Trạng thái: Đang thực hiện</p>
                <button className="btn-outline">Xem chi tiết</button>
              </div>
            </div>
            <div className="service-card">
              <img
                src="https://images.unsplash.com/photo-1580281657521-21b3cfa2a6a5"
                alt="Tư vấn dinh dưỡng"
              />
              <div>
                <h3>Tư vấn dinh dưỡng</h3>
                <p>Trạng thái: Đã hoàn thành</p>
                <button className="btn-outline">Đánh giá</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Giỏ hàng */}
        {tab === "cart" && (
          <div className="cart-section">
            <h2>Giỏ hàng</h2>
            <div className="cart-item">
              <img
                src="https://images.unsplash.com/photo-1588776814546-57aee6c11b40"
                alt="Theo dõi sức khỏe"
              />
              <div>
                <h3>Theo dõi sức khỏe định kỳ</h3>
                <p>Giá: 500.000đ</p>
                <div className="cart-actions">
                  <button className="btn-primary">Đặt ngay</button>
                  <button className="btn-outline">Xoá</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Lịch sử thanh toán */}
        {tab === "history" && (
          <div className="history-section">
            <h2>Lịch sử thanh toán</h2>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Dịch vụ</th>
                  <th>Ngày thanh toán</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chăm sóc tại nhà</td>
                  <td>12/10/2025</td>
                  <td>1.000.000đ</td>
                  <td>Thành công</td>
                </tr>
                <tr>
                  <td>Tư vấn dinh dưỡng</td>
                  <td>05/10/2025</td>
                  <td>300.000đ</td>
                  <td>Thành công</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: Đánh giá của tôi */}
        {tab === "feedback" && (
          <div className="feedback-section">
            <h2>Đánh giá của tôi</h2>
            <div className="feedback-card">
              <h3>Chăm sóc tại nhà</h3>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Nhân viên tận tâm, chu đáo. Rất hài lòng!</p>
            </div>
            <div className="feedback-card">
              <h3>Tư vấn dinh dưỡng</h3>
              <p>⭐⭐⭐⭐</p>
              <p>Giải thích dễ hiểu, hữu ích cho người lớn tuổi.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
