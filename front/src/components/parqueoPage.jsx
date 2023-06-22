import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/tablePageStyle.css";
import "../styles/parqueoBotones.css";
import axiosClient from "../axios-client.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

/*{
  "idParqueo": 1,
  "nombre_parqueo": "prueba parqueo",
  "administrador_idadministrador": 1,
  "mapa_parqueo": "asdfkhgfdasdfg",
  "numero_de_zonas": 2
}*/

const ParqueoPage = () => {
  const [parqueos, setParqueos] = React.useState([]);

  function descargarPDF() {
    const doc = new jsPDF();
    const tableData = [];

    doc.text("Reporte de parqueos", 10, 20);

    // Agregar encabezados de columna a tableData
    const headers = ["Nombre", "N° de zonas"];
    tableData.push(headers);

    // Agregar filas de datos a tableData
    parqueos.forEach((parqueo) => {
      const rowData = [
        //parqueo.idParqueo,
        parqueo.nombre_parqueo,
        parqueo.numero_de_zonas,
      ];
      tableData.push(rowData);
    });

    // Agregar tabla al documento PDF
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 30,
    });

    // Descargar el archivo PDF
    doc.save("reporte_parqueos.pdf");
  }

  function deleteParqueo(id) {
    //setParqueos(parqueos.filter((parqueo) => parqueo.idParqueo !== id));
    axiosClient
      .delete("/parqueo/" + id, {})
      .then((res) => {
        const message = res.data.message;
        alert(message);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    axiosClient
      .get("/parqueos")
      .then((response) => {
        let result = response.data;
        result = JSON.parse(result);
        console.log(result);
        setParqueos(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Container className="tablePageContainer">
      <div className="titleBottonContainer">
        <h2 className="tittleContainer">Lista Parqueos</h2>
        <Link to={"/admin/formulario-parqueo"}>
          <button className="botones-cs">Agregar Parqueo</button>
        </Link>
      </div>
      <div className="containerDescargarBoton">
        <button className="descargarBoton" onClick={descargarPDF}>
          Descargar reporte
        </button>
      </div>
      <Table responsive className="mytable">
        <thead className="tableHeader">
          <tr>
            <th className="fw-medium">Nombre</th>
            <th className="fw-medium">N° Zonas</th>
            <th className="fw-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parqueos.map((parqueo) => (
            <tr className="misFilas" key={parqueo.idParqueo}>
              <td className="miTd text-center">{parqueo.nombre_parqueo}</td>
              <td className="miTd text-center">{parqueo.numero_de_zonas}</td>
              <td className="miTd text-center">
                <Link to={`/admin/parqueo/${parqueo.idParqueo}/detalle`}>
                  <Button className="celesteBotonP">Ver detalles</Button>
                </Link>
                &nbsp;
                <Link to={`/admin/parqueo/${parqueo.idParqueo}/editar`}>
                  <Button className="naranjaBotonP">Editar</Button>
                </Link>
                &nbsp;
                <Button
                  className="rojoBotonP"
                  onClick={() => deleteParqueo(parqueo.idParqueo)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ParqueoPage;
