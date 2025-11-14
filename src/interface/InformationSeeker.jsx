import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Information.css";

export default function ProfilePage() {
  const [tab, setTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [seeker, setSeeker] = useState({
    avatar: "",
    fullName: "",
    phone: "",
    address: "",
    cccd: "",
    healthCondition: "",
    freeTime: [],
    servicesNeeded: [],
  });

  const token = localStorage.getItem("token");

  // Lấy dữ liệu seeker khi mở trang
  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/seeker/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeeker(res.data);
      } catch (err) {
        console.log("Chưa có hồ sơ seeker");
      } finally {
        setLoading(false);
      }
    };

    fetchSeeker();
  }, [token]);

  // Thay đổi input
  const handleChange = (e) => {
    setSeeker({ ...seeker, [e.target.name]: e.target.value });
  };

  // Upload avatar -> gửi file tới Cloudinary -> cập nhật DB
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/seeker/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data.url;

      // Cập nhật URL avatar ngay lập tức
      setSeeker((prev) => ({ ...prev, avatar: imageUrl }));

      // Lưu avatar mới vào DB
      await axios.put(
        "http://localhost:5000/api/seeker",
        { ...seeker, avatar: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ảnh đại diện đã được cập nhật!");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải ảnh!");
    }
  };

  // Lưu hồ sơ (update hoặc tạo mới)
 const handleSave = async () => {
  try {
    if (seeker._id) {
      // Đúng route update
      await axios.put("http://localhost:5000/api/seeker", seeker, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật hồ sơ thành công");
    } else {
      // Đúng route tạo mới
      await axios.post(
        "http://localhost:5000/api/seeker/seeker",
        seeker,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Tạo hồ sơ mới thành công");
    }

    setIsEditing(false);
  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi lưu hồ sơ");
  }
};

  if (loading) return <h2> Đang tải dữ liệu...</h2>;

  return (
    <div className="profile-container">
      <h1> Trang cá nhân</h1>

      
      <div className="profile-tabs">
        <button className={tab === "info" ? "active" : ""} onClick={() => setTab("info")}>
          Thông tin cá nhân
        </button>
        <button className={tab === "booked" ? "active" : ""} onClick={() => setTab("booked")}>
          Dịch vụ đã đặt
        </button>
        <button className={tab === "cart" ? "active" : ""} onClick={() => setTab("cart")}>
          Giỏ hàng
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>
          Lịch sử thanh toán
        </button>
        <button className={tab === "feedback" ? "active" : ""} onClick={() => setTab("feedback")}>
          Đánh giá của tôi
        </button>
      </div>

      
      <div className="profile-content">
        {tab === "info" && (
          <div className="info-section">
            <div className="avatar-wrapper">
              <img
                src={seeker.avatar || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                alt="Avatar"
                className="avatar"
              />
              {isEditing && <input type="file" onChange={handleAvatarUpload} />}
            </div>

            <div className="info-details">
              {isEditing ? (
                <>
                  <label>Họ tên:<input name="fullName" value={seeker.fullName} onChange={handleChange} /></label>
                  <label>SĐT:<input name="phone" value={seeker.phone} onChange={handleChange} /></label>
                  <label>Địa chỉ:<input name="address" value={seeker.address} onChange={handleChange} /></label>
                  <label>CCCD:<input name="cccd" value={seeker.cccd} onChange={handleChange} /></label>
                  <label>Tình trạng sức khoẻ:<input name="healthCondition" value={seeker.healthCondition} onChange={handleChange} /></label>

                  <div className="info-actions">
                    <button className="btn-primary" onClick={handleSave}>Lưu</button>
                    <button className="btn-outline" onClick={() => setIsEditing(false)}>Huỷ</button>
                  </div>
                </>
              ) : (
                <>
                  <p><b>Họ tên:</b> {seeker.fullName}</p>
                  <p><b>SĐT:</b> {seeker.phone}</p>
                  <p><b>Địa chỉ:</b> {seeker.address}</p>
                  <p><b>CCCD:</b> {seeker.cccd}</p>
                  <p><b>Tình trạng sức khoẻ:</b> {seeker.healthCondition}</p>

                  <button className="btn-primary" onClick={() => setIsEditing(true)}>
                    {seeker._id ? " Chỉnh sửa hồ sơ" : " Tạo hồ sơ mới"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        
        {tab === "booked" && <h2>Dịch vụ đã đặt (chưa kết nối API)</h2>}
        {tab === "cart" && <h2>Giỏ hàng (chưa kết nối API)</h2>}
        {tab === "history" && <h2>Lịch sử thanh toán (chưa kết nối API)</h2>}
        {tab === "feedback" && <h2>Đánh giá của tôi (chưa kết nối API)</h2>}
      </div>
    </div>
  );
}
