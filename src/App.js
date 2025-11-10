import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import LoginScreen from "./interface/LoginScreen";
import InterfaceHome from "./interface/interfaceHome";
import Information from "./interface/InformationSeeker";
import CaregiverProfilePage from "./interface/informationCaregiver";
import ServicePage from "./interface/informationService";
import Header from "./interface/header";
import Footer from "./interface/footer";
import ChatScreen from "./interface/chatScreen";


// Component bọc giao diện chính (với Header/Footer)
function LayoutWithHeaderFooter({ children, onLogout }) {
  const location = useLocation();

  const hideFooterRoutes = ["/profile", "/settings", "/edit-profile"];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header onLogout={onLogout} />
      {children}
      {!hideFooter && <Footer />} 
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (token && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  const handleLoginSuccess = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <LayoutWithHeaderFooter onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<InterfaceHome />} />
          <Route path="/services" element={<ServicePage />} />
          <Route
            path="/profile"
            element={
              role === "seeker" ? <Information /> : <CaregiverProfilePage />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Routes>
      </LayoutWithHeaderFooter>
    </Router>
  );
}
