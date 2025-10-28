import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import InterfaceHome from "./interfaceHome";
import Information from "./Information";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Routes>
          <Route path="/" element={<InterfaceHome onLogout={() => setIsLoggedIn(false)} />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      )}
    </Router>
  );
}
