import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

const PagosReportePage = () => {
  const [fechaInicioConvocatoria, setFechaInicioConvocatoria] = useState(null);
  const [fechaFinConvocatoria, setFechaFinConvocatoria] = useState(null);
  const [registroTabla, setRegistroTabla] = useState([]);
  const [numberValue, setNumberValue] = useState(null);
  const [fechaDe, setFechaDe] = useState("");
  const [hastaFecha, setHastaFecha] = useState("");

  useEffect(() => {
    axiosClient
      .get("/convocatoriaActual")
      .then((response) => {
        const convocatoria = JSON.parse(response.data);
        console.log(convocatoria);
        if (convocatoria && convocatoria.fecha_inicio) {
          setFechaInicioConvocatoria(new Date(convocatoria.fecha_inicio));
          setFechaFinConvocatoria(new Date(convocatoria.fecha_fin));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    axiosClient
      .get("/numeroValor")
      .then((response) => {
        const number = response.data;
        console.log(number);
        setNumberValue(number);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generarReporte = () => {
    if (fechaDe && hastaFecha) {
      axiosClient
        .post("/generarReporte", { fecha_de: fechaDe, hasta_fecha: hastaFecha })
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (Array.isArray(data) && data.length >= 2) {
            setRegistroTabla(data[0]);
            setNumberValue(data[1]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Ingrese las fechas de inicio y fin");
    }
  };

  const enviarReporte = () => {
    // Aquí puedes enviar los datos de `registroTabla` y `numberValue` al backend
    // utilizando axiosClient u otra librería de manejo de peticiones HTTP

    // Ejemplo de cómo enviar los datos utilizando axiosClient
    axiosClient
      .post("/enviarReporte", { registroTabla, numberValue })
      .then((response) => {
        console.log("Reporte enviado exitosamente");
        // Realizar cualquier acción adicional después de enviar el reporte
      })
      .catch((error) => {
        console.error("Error al enviar el reporte", error);
      });
  };

  return (
    <div>
      <div className="d-flex-between my-4 p-3">
        <h1 className="tittleContainer">Reporte de pagos</h1>
        <div>
          <button
            className="link-none-styles btn-personal py-2"
            onClick={generarReporte}
          >
            Generar reporte
          </button>
        </div>
      </div>
      <div className="row-reporte">
        <div className="col-reporte1" id="firts">
          <div className="number">{numberValue}</div>
          <div className="text">Ingreso total</div>
        </div>
        <div className="col-reporte1" id="second">
          <div className="number">{numberValue}</div>
          <div className="text">Ingreso de las fechas seleccionadas</div>
        </div>
        <div className="col-reporte">
          <label htmlFor="fecha_de">Fecha de:</label>
          {fechaInicioConvocatoria && (
            <input
              name="fecha_de"
              type="date"
              className="form-control"
              id="fecha_de"
              placeholder="Fecha de"
              min={fechaInicioConvocatoria.toISOString().split("T")[0]}
              max={fechaFinConvocatoria.toISOString().split("T")[0]}
            ></input>
          )}
        </div>
        {fechaInicioConvocatoria && fechaFinConvocatoria && (
          <div className="col-reporte">
            <label htmlFor="hasta_fecha">Hasta fecha:</label>
            <input
              name="hasta_fecha"
              type="date"
              className="form-control"
              id="hasta_fecha"
              placeholder="Fecha fin"
              min={fechaInicioConvocatoria.toISOString().split("T")[0]}
              max={fechaFinConvocatoria.toISOString().split("T")[0]}
            />
          </div>
        )}
      </div>
      <div className="tablePageContainer">
        <table className="mytable w-50">
          <thead className="tableHeader">
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {registroTabla.map((registro, index) => (
              <tr className="misFilas" key={index}>
                <td className="myTd text-center">{registro.fecha}</td>
                <td className="myTd text-center">{registro.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ... */}
      <div className="center-button">
        <button
          className="link-none-styles btn-personal py-2"
          onClick={enviarReporte}
        >
          Enviar Reporte
        </button>
      </div>
    </div>
  );
};

export default PagosReportePage;
