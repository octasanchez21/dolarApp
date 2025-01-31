import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  background-color: transparent; /* Fondo transparente para heredar el de AppContainer */
  color: #ffffff; /* Texto blanco */
  padding: 2rem;
  border-radius: 10px;
`;

export const Card = styled.div`
  background: #2a2a2a; /* Fondo gris oscuro moderno */
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid #4caf50; /* Borde verde vibrante */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Sombra suave */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  max-width: 400px; /* Ancho máximo para las Card */
  width: 100%; /* Ocupa el 100% del contenedor padre */
  margin: 0 auto; /* Centra las Card horizontalmente */

  &:hover {
    transform: translateY(-5px); /* Efecto de elevación al hacer hover */
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4); /* Sombra más pronunciada */
  }
`;

export const SideCard = styled.div`
  font-size: 14px;
  background: #4caf50; /* Verde vibrante para las cotizaciones secundarias */
  color: #ffffff; /* Texto blanco */
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid #2a2a2a; /* Borde gris oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Sombra suave */
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px); /* Efecto de elevación al hacer hover */
  }
`;

export const CardText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff; /* Texto blanco */
  margin: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #4caf50; /* Borde verde vibrante */
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  background-color: #2a2a2a; /* Fondo gris oscuro */
  color: #ffffff; /* Texto blanco */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #45a049; /* Borde verde más oscuro al enfocar */
    box-shadow: 0px 0px 8px rgba(76, 175, 80, 0.5); /* Sombra suave al enfocar */
  }
`;

export const Button = styled.button`
  background-color: #4caf50; /* Verde vibrante */
  color: #ffffff; /* Texto blanco */
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049; /* Verde más oscuro al hacer hover */
    transform: translateY(-2px); /* Efecto de elevación al hacer hover */
  }

  &:disabled {
    background-color: #666; /* Gris para estado deshabilitado */
    cursor: not-allowed;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: transparent; /* Fondo transparente para heredar el de AppContainer */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Sombra suave */
`;

export const AuthTitle = styled.h2`
  color: #4caf50; /* Verde vibrante */
  margin-bottom: 20px;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

export const AuthInput = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #4caf50; /* Borde verde vibrante */
  border-radius: 8px;
  background-color: #2a2a2a; /* Fondo gris oscuro */
  color: #ffffff; /* Texto blanco */
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #45a049; /* Borde verde más oscuro al enfocar */
    box-shadow: 0px 0px 8px rgba(76, 175, 80, 0.5); /* Sombra suave al enfocar */
  }
`;

export const AuthButton = styled.button`
  padding: 12px;
  background-color: #4caf50; /* Verde vibrante */
  color: #ffffff; /* Texto blanco */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049; /* Verde más oscuro al hacer hover */
    transform: translateY(-2px); /* Efecto de elevación al hacer hover */
  }
`;

export const AuthError = styled.p`
  color: #ff6b6b; /* Rojo para errores */
  margin-top: 10px;
`;