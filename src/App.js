import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./interface/LoginScreen";
import InterfaceHome from "./interface/interfaceHome";
import Information from "./interface/InformationSeeker";
import CaregiverProfilePage from "./interface/informationCaregiver"; 

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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
      <Routes>
     
        <Route path="/" element={<InterfaceHome onLogout={handleLogout} role={role} />} />

   
        <Route
          path="/profile"
          element={
            role === "seeker" ? (
              <Information role={role} />
            ) : (
              <CaregiverProfilePage role={role} />
            )
          }
        />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
