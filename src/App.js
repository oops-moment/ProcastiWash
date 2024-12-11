import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./pages/landing.jsx";
import { MachineDashboard } from "./pages/washing_machine.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Landing onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Machine Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <MachineDashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;