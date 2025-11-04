import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./interface/LoginScreen"; 
import InterfaceHome from "./interface/interfaceHome";
import Information from "./interface/Information";

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

  // login 
  const handleLoginSuccess = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<AuthScreen onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route 
            path="/" 
            element={<InterfaceHome onLogout={handleLogout} role={role} />} 
          />
          <Route 
            path="/information" 
            element={<Information role={role} />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}
