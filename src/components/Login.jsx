import React, { useState } from "react";
import styled from "styled-components";
import { users } from "../users";
import backgroundVideo from "../assets/dolar.mp4"; // Asegúrate de tener el video en esta ruta

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const LoginBox = styled.div`
  background-color: rgba(42, 42, 42, 0.8); /* Semi-transparente */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: #e0e0e0;
  margin-bottom: 20px;
  font-size: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #e0e0e0;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color:rgb(138, 165, 138);
    box-shadow: 0 0 10px rgb(119, 141, 119);
  }

  &:focus {
    border-color: #163300;
    box-shadow: 0 0 10px rgb(25, 214, 25);
    outline: none;
  }

  &::placeholder {
    color: #888;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  margin-top: 20px;
  background-color:rgb(48, 95, 13);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: rgb(36, 172, 36);;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  margin-top: 15px;
  font-size: 14px;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setError("");
      onLogin(user.username);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <LoginContainer>
      <VideoBackground autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Tu navegador no soporta videos.
      </VideoBackground>
      <LoginBox>
        <Title>Iniciar Sesión</Title>
        <InputContainer>
          <InputField
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton onClick={handleLogin}>Iniciar Sesión</LoginButton>
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
