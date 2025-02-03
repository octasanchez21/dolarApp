import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Estilos con styled-components
const Container = styled.div`
  padding: 100px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  background-color:rgba(39, 44, 39, 0.74);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(71, 182, 37, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-15px); /* Efecto de elevación al hacer hover */
    box-shadow: 0px 8px 20px rgba(54, 163, 32, 0.81); /* Sombra más pronunciada */
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
  }


  span:not(.value) {
    font-size: .8em;
    color: #b0b0b0;
  }
`;

const BlueCard = styled(Card)`
  padding: 30px;
  text-align: center;

  h1 {
    font-size: 60px;
    margin: 0 0 20px 0;
    color: #e0e0e0;
  }

  p {
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 34px;
    margin: 5px 0;
    flex-wrap: wrap; /* Permite que los elementos se ajusten en pantallas pequeñas */
  }

  .price-group {
    display: flex;
    align-items: baseline;
    gap: 8px;
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  }

  /* Estilo para los valores numéricos */
/* Estilo para los valores numéricos */
.price-value {
  font-size: 34px; /* Aumenta el tamaño de los valores */
  font-weight: bold; /* Hace que se vean más resaltados */
  transition: color 0.3s ease;
  color: #4CAF50 !important; /* Color verde al hacer hover */
}


  span:not(.price-value) { /* Estilo solo para las etiquetas (Compra/Venta) */
    font-size: 18px;
    color: #b0b0b0;
  }

  /* Ajustes para pantallas pequeñas */
  @media (max-width: 768px) {
    h1 {
      font-size: 40px; /* Reduce el tamaño del título en pantallas pequeñas */
    }

    p {
      font-size: 24px; /* Reduce el tamaño de la fuente en pantallas pequeñas */
      gap: 5px; /* Reduce el espacio entre compra y venta */
    }

    .price-group {
      gap: 5px; /* Reduce el espacio entre el label y el valor */
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

  return (
    <Container>
      {/* Tarjeta del Dólar Blue */}
      <BlueCard>
  <h1>DÓLAR BLUE</h1>
  <p>
    <span className="price-group">
      <span>Compra:</span>
      <span className="price-value">
        ${manualCompraBlue || dolares.blue.compra || "Cargando..."}
      </span>
    </span>
    
    <span className="price-group">
      <span>Venta:</span>
      <span className="price-value">
        ${manualVentaBlue || dolares.blue.venta || "Cargando..."}
      </span>
    </span>
  </p>
</BlueCard>

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