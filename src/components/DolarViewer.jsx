import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Estilos con styled-components
const Container = styled.div`
  padding: 100px;
  background-color:rgb(255, 252, 252);
  color:rgb(255, 255, 255);
  font-family: Arial, sans-serif;
    flex-direction: column;
  display: flex;
  @media (max-width: 480px) {
  align-items: center; /* Centra el contenido */

    
  }
`;

const ContainerBlue = styled.div`
  padding: 10px;
  background-color:rgb(255, 255, 255);
  color:rgb(255, 253, 253);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra el contenido */
`;

const Card = styled.div`
  background-color: rgba(9, 12, 9, 0.74);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(71, 182, 37, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-15px); /* Efecto de elevación al hacer hover */
    box-shadow: 0px 0px 40px rgb(99, 194, 83); /* Sombra más pronunciada */
  }
`;
const CardText = styled.p`
  margin: 0;
  font-size: ${(props) => (props.large ? "26px" : "24px")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const BlueCard = styled(Card)`
  padding: 1vw; /* Usa un padding flexible basado en el ancho de la pantalla */
  margin: 0 1 10px 0;
  color: #e0e0e0;
  width: 100%; /* La tarjeta ocupa todo el espacio disponible */
  min-width: 320px; /* Establece un ancho mínimo (ajústalo a tu gusto) */
  max-width: 100%; /* Limita el ancho máximo a un 100% del contenedor */
  box-sizing: border-box; /* Asegura que el padding y margin estén dentro del ancho total de la tarjeta */

  h1 {
    font-size: 4vw; /* Ajusta el tamaño basado en el 8% del ancho de la pantalla */
    margin: 0 0 10px 0;
    color: #e0e0e0;
    text-align: center;
    word-wrap: break-word; /* Permite que el texto se ajuste y no sobresalga */
  }

 p {
  display: flex;
  justify-content: center; /* Mantiene los elementos centrados */
  gap: 2vw; /* Reduce la separación entre "Compra" y "Venta" */
  margin: 4px 0;
  flex-wrap: wrap; /* Permite ajuste en pantallas pequeñas */
  word-wrap: break-word;
}

 .price-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Reduce la separación entre "Compra" y el valor */
  white-space: nowrap;
}

  .price-value {
    font-size: 3vw; /* 5% del ancho de la pantalla */
    font-weight: bold;
    color: #72ba66;
  }

  .price-title {
    font-size: 2rem; /* Ajuste fijo */
    font-weight: bold;
    color: #b0b0b0;
  }

  .label {
    font-size: 1.5rem; /* Tamaño para "Compra" y "Venta" */
    font-weight: bold;
    color: #b0b0b0;
  }

  @media (max-width: 768px) {
    padding: 7vw; /* Aumenta el padding proporcionalmente */

    h1 {
      font-size: 6vw; /* Ajuste para pantallas medianas */
    }

    p {
    gap: 1rem; /* Reduce aún más la separación en pantallas medianas */
  }

  .price-group {
    gap: 0.8rem; /* Reduce la separación interna en pantallas pequeñas */
  }

    .price-value {
      font-size: 6vw; /* Aumenta la reducción del texto en pantallas medianas */
    }
  }

  @media (max-width: 480px) {
    padding: 10vw; /* Aumenta el padding para pantallas pequeñas */

    h1 {
      font-size: 10vw; /* Título más pequeño en pantallas pequeñas */
    }

    .price-value {
      font-size: 7vw; /* Texto más grande en pantallas pequeñas */
    }
      

    .price-title {
      font-size: 1.5rem;
    }

    .label {
      font-size: 1.2rem;
    }
  }
`;




const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const SideCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const SideCard = styled(Card)`
  flex: 1 1 calc(10% - 10px);
  min-width: 150px;
  text-align: center;
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 10px);
  }
  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const DolarViewer = () => {
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
  const [manualVentaBlue, setManualVentaBlue] = useState(null);
  const [manualCompraBlue, setManualCompraBlue] = useState(null);

  // Cargar valores manuales desde Firestore al iniciar
  useEffect(() => {
    const fetchManualValues = async () => {
      const docRef = doc(db, "dolarBlue", "manualValues");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setManualVentaBlue(docSnap.data().venta);
        setManualCompraBlue(docSnap.data().compra);
      }
    };
    fetchManualValues();
  }, []);

  // Obtener datos de la API al cargar el componente
  useEffect(() => {
    const urls = [
      "https://dolarapi.com/v1/dolares/blue",
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
          liqui: { compra: data[3].compra, venta: data[3].venta },
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

  const calcularTransferencia = (valor) => {
    return Math.ceil((valor * 1.01).toFixed(2));
  };
  

  return (
    <Container>
      {/* Tarjeta del Dólar Blue */}
      <ContainerBlue>
      <BlueCard>
        <h1>DÓLAR BLUE / CORDOBA</h1>
        <p style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
          {/* Columna izquierda: Efectivo */}
          <div className="price-group">
            <span className="label">(EFECTIVO)</span>

            <span className="price-value">
              <span className="price-title">Compra:</span>
              ${manualCompraBlue || "Cargando..."}
            </span>

            <span className="price-value">
              <span className="price-title">Venta:</span>
              ${manualVentaBlue || "Cargando..."}
            </span>
          </div>

          {/* Columna derecha: Transferencia */}
          <div className="price-group">
            <span className="label">(TRANSFERENCIA)</span>
            <span className="price-value">
              <span className="price-title">Compra:</span>
              $
              {manualCompraBlue
                ? calcularTransferencia(manualCompraBlue)
                : "Cargando..."}
            </span>
            <span className="price-value">
              <span className="price-title">Venta:</span> $
              {manualVentaBlue
                ? calcularTransferencia(manualVentaBlue)
                : "Cargando..."}
            </span>
          </div>
        </p>
      </BlueCard>
      </ContainerBlue>
      {/* Grid de tarjetas de otros dólares */}
      <GridContainer>
        {Object.entries(dolares).map(([key, value]) => {
          if (key === "blue") return null; // Excluir el dólar blue
          return (
            <Card key={key}>
              <CardText large bold>
                DÓLAR {key.toUpperCase()}
              </CardText>
              <CardText>
                <span>Compra:</span> ${value.compra || "Cargando..."}
              </CardText>
              <CardText>
                <span>Venta:</span> ${value.venta || "Cargando..."}
              </CardText>
            </Card>
          );
        })}
      </GridContainer>

      {/* Cotizaciones secundarias */}
      <SideCardContainer>
        {Object.entries(cotizaciones).map(([key, value]) => (
          <SideCard key={key}>
            <CardText>
              {key.toUpperCase()}: ${value || "Cargando..."}
            </CardText>
          </SideCard>
        ))}
      </SideCardContainer>
    </Container>
  );
};

export default DolarViewer;