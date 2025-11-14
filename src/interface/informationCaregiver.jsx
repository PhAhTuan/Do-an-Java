import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Information.css"; 

export default function CaregiverProfilePage() {
  const [tab, setTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [caregiver, setCaregiver] = useState({
    avatar: "",
    fullName: "",
    phone: "",
    address: "",
    cccd: "",
    experience: "",
    position: "",
    skills: "",
  });

  const token = localStorage.getItem("token");

  // Lấy thông tin caregiver
  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/caregiver/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaregiver(res.data);
      } catch (err) {
        console.log("Chưa có hồ sơ caregiver");
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [token]);

  // Thay đổi input
  const handleChange = (e) => {
    setCaregiver({ ...caregiver, [e.target.name]: e.target.value });
  };

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/caregiver/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data.avatar;
      setCaregiver((prev) => ({ ...prev, avatar: imageUrl }));

      await axios.put(
        "http://localhost:5000/api/caregiver",
        { ...caregiver, avatar: imageUrl },
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
      if (caregiver._id) {
        await axios.put("http://localhost:5000/api/caregiver", caregiver, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cập nhật hồ sơ thành công");
      } else {
        await axios.post("http://localhost:5000/api/caregiver", caregiver, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Tạo hồ sơ thành công");
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
      <h1> Hồ sơ nhân viên chăm sóc</h1>


      <div className="profile-tabs">
        <button className={tab === "info" ? "active" : ""} onClick={() => setTab("info")}>
          Thông tin cá nhân
        </button>
        <button className={tab === "wait-customers" ? "active" : ""} onClick={() => setTab("wait-customers")}>
          Chờ xác nhận
        </button>
        <button className={tab === "customers" ? "active" : ""} onClick={() => setTab("customers")}>
          Khách hàng đã xác nhận
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>
          Lịch sử hoàn thành
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
                src={caregiver.avatar || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                alt="Avatar"
                className="avatar"
              />
              {isEditing && <input type="file" onChange={handleAvatarUpload} />}
            </div>

            <div className="info-details">
              {isEditing ? (
                <>
                  <label>Họ tên:<input name="fullName" value={caregiver.fullName} onChange={handleChange} /></label>
                  <label>SĐT:<input name="phone" value={caregiver.phone} onChange={handleChange} /></label>
                  <label>Địa chỉ:<input name="address" value={caregiver.address} onChange={handleChange} /></label>
                  <label>CCCD:<input name="cccd" value={caregiver.cccd} onChange={handleChange} /></label>
                  <label>Kinh nghiệm:<input name="experience" value={caregiver.experience} onChange={handleChange} /></label>
                  <label>Vị trí công việc:<input name="position" value={caregiver.position} onChange={handleChange} /></label>
                  <label>Kỹ năng:<input name="skills" value={caregiver.skills} onChange={handleChange} /></label>

                  <div className="info-actions">
                    <button className="btn-primary" onClick={handleSave}>Lưu</button>
                    <button className="btn-outline" onClick={() => setIsEditing(false)}>Huỷ</button>
                  </div>
                </>
              ) : (
                <>
                  <p><b>Họ tên:</b> {caregiver.fullName}</p>
                  <p><b>SĐT:</b> {caregiver.phone}</p>
                  <p><b>Địa chỉ:</b> {caregiver.address}</p>
                  <p><b>CCCD:</b> {caregiver.cccd}</p>
                  <p><b>Kinh nghiệm:</b> {caregiver.experience}</p>
                  <p><b>Vị trí công việc:</b> {caregiver.position}</p>
                  <p><b>Kỹ năng:</b> {caregiver.skills}</p>

                  <button className="btn-primary" onClick={() => setIsEditing(true)}>
                    {caregiver._id ? " Chỉnh sửa hồ sơ" : " Tạo hồ sơ mới"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {tab === "wait-customers" && (
          <div className="wait-customer-section">
            <h2>Chờ xác nhận</h2>
            <p>(chưa hoàn thành )</p>
          </div>
        )}

      
        {tab === "customers" && (
          <div className="customer-section">
            <h2>Khách hàng đã xác nhận</h2>
            <p>(chưa hoàn thành )</p>
          </div>
        )}

  
        {tab === "history" && (
          <div className="history-section">
            <h2>Lịch sử công việc đã hoàn thành</h2>
            <p>(Sẽ hiển thị các ca chăm sóc đã xong )</p>
          </div>
        )}

       
        {tab === "feedback" && (
          <div className="feedback-section">
            <h2>Đánh giá của tôi</h2>
            <p>(Hiển thị các phản hồi từ khách hàng )</p>
          </div>
        )}
      </div>
    </div>
  );
}
