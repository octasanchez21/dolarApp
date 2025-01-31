import React, { useState } from "react";
import { users } from "../users";
import {
  AuthContainer,
  AuthTitle,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthError,
} from "../styles"; // Importamos los componentes estilizados

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar si el usuario y contraseña son correctos
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
      setError(""); // Limpiar errores
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Iniciar Sesión</AuthTitle>
      <AuthForm onSubmit={handleLogin}>
        <AuthInput
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthButton type="submit">Login</AuthButton>
      </AuthForm>
      {error && <AuthError>{error}</AuthError>}
    </AuthContainer>
  );
};

export default Auth;