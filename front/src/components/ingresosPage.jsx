import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { Button, Container } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

/*{\"idhistorial\":1,\
"hora_ingreso_hist\":null,\
"hora_salida_hist\":null,\
"fecha_ingreso\":\"2023-05-02\",\
"fecha_salida\":\"2023-05-02\",\
"cliente_idcliente\":1111}*/

function IngresosPage() {
  const [ingresosSalidas, setIngresosSalidas] = useState([]);
  const [registroTabla, setRegistroTabla] = useState([]);

  const [formData, setFormData] = useState({
    cliente_idcliente: "",
  });

  const { cliente_idcliente } = formData;

  const handleSubmit = (id) => {
    console.log(id);
    alert(`datos formularios:::, ${id}`);
    axiosClient
      .post("/salida", {
        idcliente: id,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    axiosClient
      .get("/consultaEntradasSalidas")
      .then((response) => {
        const result = response.data;
        console.log(JSON.parse(result));
        setIngresosSalidas(JSON.parse(result));
        setRegistroTabla(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const title = "Reporte Registro";

    doc.setDocumentProperties({ title: title });
    doc.setFontSize(18);
    doc.text("Reporte entradas y salidas", 10, 20);

    const data = registroTabla.map((registro) => [
      registro.cliente_idcliente,
      registro.fecha_ingreso,
      registro.fecha_salida ? registro.fecha_salida : "No registrada",
    ]);

    doc.autoTable({
      head: [["Cliente", "Entrada", "Salida"]],
      body: data,
      startY: 30,
    });

    const fileName = "reporte_entradas_salidas.pdf";
    doc.save(fileName);
  };

  const enviarReporte = () => {
    axiosClient
      .post("/guardarReportePagos", { registroTabla: ingresosSalidas })
      .then((response) => {
        console.log("desdequiii");
        console.log(ingresosSalidas);
        console.log("hastaaaquiii");
        console.log("Reporte enviado exitosamente");
        // Realizar cualquier acción adicional después de enviar el reporte
      })
      .catch((error) => {
        console.error("Error al enviar el reporte", error);
      });
  };

  return (
    <div className="tablePageContainer">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Ingresos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/guardia/ingresos/registrar"
          >
            Registrar Ingreso
          </Link>
        </div>
      </div>
      <div>
        <table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Entrada</th>
              <th className="fw-medium">Salida</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {ingresosSalidas.map((ingresoSalida) => (
              <tr className="misFilas" key={ingresoSalida.idhistorial}>
                <td className="myTd text-center">
                  {ingresoSalida.cliente_idcliente}
                </td>
                <td className="myTd text-center">
                  {ingresoSalida.fecha_ingreso}
                </td>
                <td className="myTd text-center">
                  {" "}
                  {ingresoSalida.fecha_salida == null ? (
                    <Button
                      onClick={() =>
                        handleSubmit(ingresoSalida.cliente_idcliente)
                      }
                    >
                      Registrar Salida
                    </Button>
                  ) : (
                    ingresoSalida.fecha_salida
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ... */}
      <div className="center-button">
        <button
          className="link-none-styles btn-personal py-2"
          onClick={generarPDF}
        >
          Descargar reporte
        </button>
      </div>
    </div>
  );
}

export default IngresosPage;
