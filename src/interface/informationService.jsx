import React, { useEffect, useState } from "react";
import axios from "axios";
import "./informationService.css";
import { useNavigate } from "react-router-dom";

export default function ServicePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center" }}> Đang tải dịch vụ...</h3>;

  return (
    <div className="home-container-service">
      <main className="main-content">
        <section className="services">
          <h2>Dịch vụ của chúng tôi</h2>

          {services.length === 0 ? (
            <p>Hiện chưa có dịch vụ nào.</p>
          ) : (
            <div className="service-grid">
              {services.map((service) => (
                <div className="service-card" key={service._id}>
                  <img src={service.image} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p
                    style={{
                      color: "#818691ff",
                      fontStyle: "italic",
                      fontSize: "14px",
                      marginTop: "-8px",
                    }}
                  >
                    {service.subtitle}
                  </p>

                  <p
                    style={{
                      color: "#4a5568",
                      fontSize: "14px",
                      textAlign: "left",
                      padding: "0 16px",
                      minHeight: "60px",
                    }}
                  >
                    {service.description}
                  </p>

                  <p style={{ fontWeight: "bold", color: "#2b6cb0" }}>
                    {service.price}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "12px",
                      paddingBottom: "20px",
                      marginTop: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      className="btn-outline"
                      onClick={() => navigate(`/service/${service._id}`)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/chat")}
                    >
                      Tư vấn
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/booking")}
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
