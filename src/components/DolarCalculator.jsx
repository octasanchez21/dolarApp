import React, { useState, useEffect } from "react";
import { Container, Input, Button, Card, CardText, SideCard } from "../styles";

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

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
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

  const calcularTotal = () => {
    const tasaDolar = manualDolar ? parseFloat(manualDolar) : dolares.blue.venta;
    const cantidad = parseFloat(cantidadDolares);
  
    console.log("Tasa de Dólar:", tasaDolar);
    console.log("Cantidad de Dólares:", cantidad);
  
    if (!isNaN(tasaDolar) && !isNaN(cantidad)) {
      setTotal(tasaDolar * cantidad);
    } else {
      setTotal(null);
    }
  };

  // Función para formatear el número con separadores de miles y dos decimales
const formatearNumero = (numero) => {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
};

  
  const cardStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    padding:"2.8vh",
  };


  const containerStyles = {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-around", // Cambia a "space-around" para reducir el espacio
    alignItems: "stretch",
    padding: "0 2vh", // Reduce el padding lateral
    width: "100%",
  };
  
  const textStyles = {
    marginBottom: "5px",
    padding: "0 1vh",

    fontSize: "18px", // Reduce el tamaño de la fuente si es necesario
  };
  
  const columnStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const lineBlue = {
    fontSize: "18px",
    borderTop: "2px solid #45a049", /* Línea azul brillante */
    minHeight: "100px",
    backgroundColor: "#163300", /* Fondo oscuro */
    color: "#f5f5f5", /* Texto claro */
    padding: "0px", /* Relleno para que se vea mejor */
  };

  const containerCalculator = {
    fontSize: "18px",
    borderTop: "2px solid #45a049", /* Línea azul brillante */
    minHeight: "7vh",
    backgroundColor: "#2A2A2A", /* Fondo oscuro */
    color: "#f5f5f5", /* Texto claro */
    padding: "0px", /* Relleno para que se vea mejor */
  };

  return (
    <Container >

       <h2>Conversor de Dólar</h2>

  <Input 
  style={containerCalculator}
    type="number"
    placeholder="Ingresar valor de dólar en pesos"
    value={manualDolar}
    onChange={(e) => setManualDolar(e.target.value)}
  />
  <Input
    style={containerCalculator}
    type="number"
    placeholder="Cantidad de dólares"
    value={cantidadDolares}
    onChange={(e) => setCantidadDolares(e.target.value)}
  />

  <Button 
    onClick={calcularTotal} 
    disabled={!cantidadDolares} 
    style={{ marginBottom: "20px" }}
  >
    Calcular
  </Button>

  {total !== null && (
        <Card style={{containerCalculator, marginBottom:"20px"}}>
          <CardText style={{ fontSize: "24px", fontWeight: "bold" }}>
            Total en pesos: ${formatearNumero(total)}
          </CardText>
        </Card>
      )}


<Card style={{ ...lineBlue, maxWidth: "none", width: "100%" }}> {/* Ancho completo */}
  <CardText style={{ fontSize: "30px", fontWeight: "bold", paddingTop: "10px" }}>
    DÓLAR BLUE - Compra: ${dolares.blue.compra || "Cargando..."} | Venta: ${dolares.blue.venta || "Cargando..."}
  </CardText>
</Card>

<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Ajusta el ancho mínimo de las Card
  gap: "10px",
  width: "100%",
  marginTop: "20px",
}}>
  {/* Cards de Dólar */}
  <Card className="dolar-card" style={lineBlue}>
    <CardText style={cardStyles}>DÓLAR OFICIAL</CardText>
    <div style={containerStyles}>
      <div style={columnStyles}>
        <CardText style={textStyles}>Compra</CardText>
        <CardText>${dolares.oficial.compra || "Cargando..."}</CardText>
      </div>
      <div style={columnStyles}>
        <CardText style={textStyles}>Venta</CardText>
        <CardText>${dolares.oficial.venta || "Cargando..."}</CardText>
      </div>
    </div>
  </Card>

  <Card className="dolar-card" style={lineBlue}>
    <CardText style={cardStyles}>DÓLAR MEP</CardText>
    <div style={containerStyles}>
      <div style={columnStyles}>
        <CardText style={textStyles}>Compra</CardText>
        <CardText>${dolares.bolsa.compra || "Cargando..."}</CardText>
      </div>
      <div style={columnStyles}>
        <CardText style={textStyles}>Venta</CardText>
        <CardText>${dolares.bolsa.venta || "Cargando..."}</CardText>
      </div>
    </div>
  </Card>

  <Card className="dolar-card" style={lineBlue}>
    <CardText style={cardStyles}>DÓLAR LIQUI</CardText>
    <div style={containerStyles}>
      <div style={columnStyles}>
        <CardText style={textStyles}>Compra</CardText>
        <CardText>${dolares.contadoconliqui.compra || "Cargando..."}</CardText>
      </div>
      <div style={columnStyles}>
        <CardText style={textStyles}>Venta</CardText>
        <CardText>${dolares.contadoconliqui.venta || "Cargando..."}</CardText>
      </div>
    </div>
  </Card>

  <Card className="dolar-card" style={lineBlue}>
    <CardText style={cardStyles}>DÓLAR TARJETA</CardText>
    <div style={containerStyles}>
      <div style={columnStyles}>
        <CardText style={textStyles}>Compra</CardText>
        <CardText>${dolares.tarjeta.compra || "Cargando..."}</CardText>
      </div>
      <div style={columnStyles}>
        <CardText style={textStyles}>Venta</CardText>
        <CardText>${dolares.tarjeta.venta || "Cargando..."}</CardText>
      </div>
    </div>
  </Card>

  <Card className="dolar-card" style={lineBlue}>
    <CardText style={cardStyles}>DÓLAR CRIPTO</CardText>
    <div style={containerStyles}>
      <div style={columnStyles}>
        <CardText style={textStyles}>Compra</CardText>
        <CardText>${dolares.cripto.compra || "Cargando..."}</CardText>
      </div>
      <div style={columnStyles}>
        <CardText style={textStyles}>Venta</CardText>
        <CardText>${dolares.cripto.venta || "Cargando..."}</CardText>
      </div>
    </div>
  </Card>
</div>


      {/* Cotizaciones secundarias */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
        <SideCard>
          <CardText>EUR: ${cotizaciones.eur || "Cargando..."}</CardText>
        </SideCard>
        <SideCard>
          <CardText>BRL: ${cotizaciones.brl || "Cargando..."}</CardText>
        </SideCard>
        <SideCard>
          <CardText>CLP: ${cotizaciones.clp || "Cargando..."}</CardText>
        </SideCard>
        <SideCard>
          <CardText>UYU: ${cotizaciones.uyu || "Cargando..."}</CardText>
        </SideCard>
      </div>


    </Container>
  );
};

export default DolarCalculator;
