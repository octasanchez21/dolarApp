import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Estilos con styled-components
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  text-align: center;
  background-color: transparent;
  color: #ffffff;
  padding: 5rem;
  border-radius: 10px;
  margin-top: 50px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  background-color: rgba(39, 44, 39, 0.74);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(71, 182, 37, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 10px;

`;


const Input = styled.input`
  width: 60%;
  padding: 12px;
  margin: 10px 0;
  border: 1px ;
  border-radius: 10px;
  font-size: 3vh;
  text-align: center;
  background-color: #2a2a2a;
  color: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

 &:hover {
     border-color:rgb(138, 165, 138);
    box-shadow: 0 0 10px rgb(119, 141, 119);
  }

  &:focus {
     border-color: #163300;
    box-shadow: 0 0 10px rgba(25, 214, 25, 0.39);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const CardText = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;

  /* Estilos para los valores numéricos */
  .price-value {
    color: #4CAF50; /* Verde */
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DolarCalculator = () => {
  const [dolares, setDolares] = useState({
    blue: { compra: null, venta: null },
    oficial: { compra: null, venta: null },
    bolsa: { compra: null, venta: null },
    contadoconliqui: { compra: null, venta: null },
    tarjeta: { compra: null, venta: null },
    mayorista: { compra: null, venta: null },
    cripto: { compra: null, venta: null },
  });

  const [cotizaciones, setCotizaciones] = useState({
    eur: null,
    brl: null,
    clp: null,
    uyu: null,
  });

  const [manualDolar, setManualDolar] = useState("");
  const [cantidadDolares, setCantidadDolares] = useState("");
  const [total, setTotal] = useState(null);

  const [manualVentaBlue, setManualVentaBlue] = useState(null);
  const [manualCompraBlue, setManualCompraBlue] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Para saber si está cargando

  // Cargar valores manuales desde Firestore al iniciar
  useEffect(() => {
    const fetchManualValues = async () => {
      const docRef = doc(db, "dolarBlue", "manualValues");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setManualVentaBlue(docSnap.data().venta);
        setManualCompraBlue(docSnap.data().compra);
        setIsLoading(false); // Ya se cargaron los valores
      }
    };

    fetchManualValues();
  }, []);

  // Guardar valores manuales en Firestore cuando cambien
  useEffect(() => {
    const saveManualValues = async () => {
      if (manualVentaBlue !== null && manualCompraBlue !== null) {
        await setDoc(doc(db, "dolarBlue", "manualValues"), {
          compra: manualCompraBlue,
          venta: manualVentaBlue,
        });
      }
    };

    saveManualValues();
  }, [manualVentaBlue, manualCompraBlue]);

  // Obtener datos de la API al cargar el componente
  useEffect(() => {
    const urls = [
      "https://dolarapi.com/v1/dolares/oficial",
      "https://dolarapi.com/v1/dolares/bolsa",
      "https://dolarapi.com/v1/dolares/contadoconliqui",
      "https://dolarapi.com/v1/dolares/tarjeta",
      "https://dolarapi.com/v1/dolares/mayorista",
      "https://dolarapi.com/v1/dolares/cripto",
      "https://dolarapi.com/v1/cotizaciones/eur",
      "https://dolarapi.com/v1/cotizaciones/brl",
      "https://dolarapi.com/v1/cotizaciones/clp",
      "https://dolarapi.com/v1/cotizaciones/uyu",
    ];

    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((data) => {
        setDolares({
          blue: { compra: data[0].compra, venta: data[0].venta },
          oficial: { compra: data[1].compra, venta: data[1].venta },
          bolsa: { compra: data[2].compra, venta: data[2].venta },
          contadoconliqui: { compra: data[3].compra, venta: data[3].venta },
          tarjeta: { compra: data[4].compra, venta: data[4].venta },
          mayorista: { compra: data[5].compra, venta: data[5].venta },
          cripto: { compra: data[6].compra, venta: data[6].venta },
        });
        setCotizaciones({
          eur: data[7].venta,
          brl: data[8].venta,
          clp: data[9].venta,
          uyu: data[10].venta,
        });
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  // Calcular el total en pesos
  const calcularTotal = () => {
    const tasaDolar = manualDolar ? parseFloat(manualDolar) : dolares.blue.venta;
    const cantidad = parseFloat(cantidadDolares);

    if (!isNaN(tasaDolar) && !isNaN(cantidad)) {
      setTotal(tasaDolar * cantidad);
    } else {
      setTotal(null);
    }
  };

  // Formatear números con separadores de miles y dos decimales
  const formatearNumero = (numero) => {
    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  };



  return (
    <Container>
      {/* Campo para ingresar el valor manual de compra del dólar blue */}
      <Input
        type="number"
        placeholder="Ingresar valor de COMPRA"

        onChange={(e) => setManualCompraBlue(parseFloat(e.target.value))}
      />

      {/* Campo para ingresar el valor manual de venta del dólar blue */}
      <Input
        type="number"
        placeholder="Ingresar valor de VENTA"

        onChange={(e) => setManualVentaBlue(parseFloat(e.target.value))}
      />


      {/* Mostrar el valor manual o el valor de la API */}
      <Card>
      <CardText>
          DÓLAR BLUE - Compra:{" "}
          <span className="price-value">
            {isLoading ? "Cargando..." : manualCompraBlue || dolares.blue.compra || "Cargando..."}
          </span>{" "}
          | Venta:{" "}
          <span className="price-value">
            {isLoading ? "Cargando..." : manualVentaBlue || dolares.blue.venta || "Cargando..."}
          </span>
        </CardText>
      </Card>

      <h2 style={{ marginTop: "4rem" }}>Conversor de Dólar</h2>
      <Input

        type="number"
        placeholder="Ingresar valor de dólar en pesos"
        value={manualVentaBlue}
        onChange={(e) => setManualDolar(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Cantidad de dólares"
        value={cantidadDolares}
        onChange={(e) => setCantidadDolares(e.target.value)}
      />

      <Button onClick={calcularTotal} disabled={!cantidadDolares}>
        Calcular
      </Button>

      {total !== null && (
        <Card>
          <CardText>Total en pesos: ${formatearNumero(total)}</CardText>
        </Card>
      )}

    </Container>
  );
};

export default DolarCalculator;