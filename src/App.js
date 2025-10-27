import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import InterfaceHome from "./interfaceHome.jsx"; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <InterfaceHome /> 
      )}
    </>
  );
}
