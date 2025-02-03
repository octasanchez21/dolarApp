import React, { useState } from "react";
import styled from "styled-components";
import Login from "../src/components/Login";
import DolarCalculator from "../src/components/DolarCalculator";
import DolarViewer from "../src/components/DolarViewer";

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%; /* Ocupa el 100% del ancho */
  background-color: #1e1e1e; /* Fondo oscuro para toda la página */
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  overflow-x: hidden; /* Evita el desbordamiento horizontal */
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
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

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AppContainer>
      {user && (
        <>
          <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
          {user === "julieta" || user === "lucho" ? (
            <DolarCalculator />
          ) : user === "cliente" ? (
            <DolarViewer />
          ) : null}
        </>
      )}
      {!user && <Login onLogin={handleLogin} />}
    </AppContainer>
  );
}

export default App;