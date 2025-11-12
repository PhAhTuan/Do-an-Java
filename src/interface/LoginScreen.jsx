import React, { useState } from "react";
import SnowEffect from "../SnowEffect";

export default function LoginScreen({ onLoginSuccess }) {
  const [mode, setMode] = useState("careseeker");
  const [showRegister, setShowRegister] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const validateLogin = () => {
    if (!email.trim()) { alert("Vui lòng nhập email."); return false; }
    if (!password) { alert("Vui lòng nhập mật khẩu."); return false; }
    return true;
  };

  const validateRegister = () => {
    if (!email.trim()) { alert("Vui lòng nhập email."); return false; }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) { alert("Email không hợp lệ."); return false; }
    if (!password) { alert("Vui lòng nhập mật khẩu."); return false; }
    if (password !== confirmPassword) { alert("Mật khẩu và xác nhận mật khẩu không khớp."); return false; }
    return true;
  };

  const onLogin = async () => {
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: mode === "careseeker" ?  "seeker" : "caregiver",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        alert(data.message || "Đăng nhập thất bại.");
        return;
      }
      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      onLoginSuccess(data.token, mode === "careseeker" ? "seeker" : "caregiver");
      localStorage.setItem("user", JSON.stringify({
        id: data.user._id || data.user.id,
        name: data.user.name,
        role: data.user.role,
 }));

    } catch (error) {
      console.error(error);
      alert("Không thể kết nối tới server.");
    } finally { setLoading(false); }
  };

  const onRegister = async () => {
  if (!validateRegister()) return;
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        role: mode === "careseeker" ? "seeker" : "caregiver",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Đăng ký thất bại.");
      return;
    }
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    setShowRegister(false); 
    setEmail(""); setPassword(""); setConfirmPassword("");
  } catch (error) {
    console.error(error);
    alert("Không thể kết nối tới server.");
  } finally { setLoading(false); }
};


  const toggleModeForm = () => {
    setShowRegister(!showRegister);
    setEmail(""); setPassword(""); setConfirmPassword("");
  };

  return (
    <div style={styles.container}>
      <SnowEffect />
      <div style={styles.header}>
        <img src="https://placehold.co/120x120?text=Elder" alt="logo" style={styles.logo} />
        <h2 style={styles.title}>ELDER  CARE  CONNECT</h2>
        <p style={styles.subtitle}>Nền tảng kết nối dịch vụ chăm sóc người cao tuổi tại nhà</p>
      </div>

      <div style={styles.modeSwitchRow}>
        <button style={{ ...styles.modeButton, ...(mode === 'careseeker' ? styles.modeButtonActive : {}) }}
                onClick={() => setMode('careseeker')}>Khách hàng</button>
        <button style={{ ...styles.modeButton, ...(mode === 'admin' ? styles.modeButtonActive : {}) }}
                onClick={() => setMode('admin')}>Nhân viên</button>
      </div>

      <div style={styles.form}>
        <label style={styles.label}>Email</label>
        <input type="email" placeholder="name@gmail.com"
               value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />

        <label style={styles.label}>Mật khẩu</label>
        <input type="password" placeholder="Nhập mật khẩu"
               value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        {showRegister && (
          <>
            <label style={styles.label}>Xác nhận mật khẩu</label>
            <input type="password" placeholder="Nhập lại mật khẩu"
                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
          </>
        )}

        {!showRegister && (
          <div style={styles.forgotRow}>
            <button style={styles.linkButton} onClick={() => alert('quên mật khẩu')}>Quên mật khẩu?</button>
          </div>
        )}

        <button style={styles.loginButton} onClick={showRegister ? onRegister : onLogin} disabled={loading}>
          {loading ? "Đang xử lý..." : showRegister ? "Đăng ký" : "Đăng nhập"}
        </button>

        <div style={styles.registerRow}>
          <span>{showRegister ? "Đã có tài khoản?" : "Bạn chưa có tài khoản?"}</span>
          <button style={styles.linkButton} onClick={toggleModeForm}>
            {showRegister ? "Đăng nhập" : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(135deg, #E0F7FA, #FFFFFF)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: { textAlign: 'center', marginBottom: 20 },
  logo: { width: 96, height: 96, borderRadius: 18, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 700 },
  subtitle: { fontSize: 13, color: '#4A5568' },
  modeSwitchRow: { display: 'flex', justifyContent: 'center', marginBottom: 20 },
  modeButton: {
    padding: '8px 20px',
    borderRadius: 20,
    border: '1px solid #CBD5E0',
    margin: '0 8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontWeight: 600,
  },
  modeButtonActive: {
    backgroundColor: '#2B6CB0',
    color: 'white',
  },
  form: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },
  label: { fontSize: 13, color: '#2D3748', fontWeight: 700, marginBottom: 6 },
  input: {
    width: '90%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #E2E8F0',
    marginBottom: 12,
  },
  forgotRow: { textAlign: 'right', marginBottom: 12 },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#2B6CB0',
    cursor: 'pointer',
    fontWeight: 600,
  },
  loginButton: {
    width: '100%',
    padding: '12px 0',
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#2B6CB0',
    color: 'white',
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: 12,
  },
  orRow: { display: 'flex', alignItems: 'center', margin: '10px 0' },
  line: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  orText: { margin: '0 8px', color: '#A0AEC0', fontWeight: 600 },
  socialRow: { display: 'flex', justifyContent: 'space-between' },
  socialButton: {
    flex: 1,
    border: '1px solid #E2E8F0',
    padding: '10px 0',
    borderRadius: 8,
    margin: '0 6px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  registerRow: { textAlign: 'center', marginTop: 14 },
  footer: { marginTop: 20 },
  footerText: { fontSize: 12, color: '#A0AEC0' },
};
