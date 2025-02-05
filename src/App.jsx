import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Login from "../src/components/Login";
import DolarCalculator from "../src/components/DolarCalculator";
import DolarViewer from "../src/components/DolarViewer";

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #1e1e1e;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
`;

const AdminButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #72ba66;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #479C4A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
   <AppContainer>
      <DolarViewer />
      
      {user === "admin" ? (
        <>
          <DolarCalculator />
          <LogoutButton onClick={onLogout}>Cerrar sesión</LogoutButton>
        </>
      ) : (
        <AdminButton onClick={() => navigate("/login")}>Administrador</AdminButton>
      )}
    </AppContainer>
  );
};

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    // Redirigir a la vista de DolarViewer
    navigate("/viewer");
  };

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={user ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<DolarCalculator user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;

