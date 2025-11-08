import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminServiceManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/services", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Thêm dịch vụ thành công");
    fetchServices();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Đã xóa dịch vụ");
    fetchServices();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>🛠 Quản lý Dịch vụ</h2>

      <div>
        <input placeholder="Tên dịch vụ" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Giá" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="URL ảnh" onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input placeholder="Mô tả (phân tách bằng dấu ,)" onChange={(e) => setForm({ ...form, description: e.target.value.split(",") })} />
        <button onClick={handleSubmit}>Thêm dịch vụ</button>
      </div>

      <hr />

      <ul>
        {services.map((s) => (
          <li key={s._id}>
            {s.name} - {s.price}
            <button onClick={() => handleDelete(s._id)}> Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
