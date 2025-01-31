import React, { useState } from "react";
import Auth from "./components/Auth";
import DolarCalculator from "./components/DolarCalculator";
import styled from "styled-components";

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
    background-color: #4caf50;
  }
`;

function App() {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLogin = (user) => {
    setUser(user);
    setShowWelcome(true); // Mostrar el mensaje de bienvenida
  };

  const handleLogout = () => {
    setUser(null);
    setShowWelcome(false); // Ocultar el mensaje de bienvenida
  };

  return (
    <AppContainer>
      {user && (
        <>
          <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
          <DolarCalculator />
        </>
      )}
      {!user && <Auth onLogin={handleLogin} />}
    </AppContainer>
  );
}

export default App;