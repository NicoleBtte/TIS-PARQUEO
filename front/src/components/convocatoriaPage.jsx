import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/convocatoriaBotones.css";
import "../styles/tablePageStyle.css";
import axiosClient from "../axios-client.js";

const ConvocatoriaPage = () => {
  /*{
            "idConvocatoria": 1,
            "titulo": "convocatoria prueba",
            "fecha_inicio": "2023-05-01",
            "fecha_fin": "2023-05-02",
            "descripcion_convocatoria": "puerbassssssssss",
            "fecha_pago": "2023-06-01",
            "numero_cupos": 20,
            "estado_convocatoria": 1
        }*/
  const [convocatorias, setConvocatorias] = React.useState([]);

  function downloadPDF(idConvocatoria) {
    axiosClient
      .post(
        "/descargarConvocatoria",
        { idConvocatoria },
        { responseType: "blob" }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", idConvocatoria);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /*function downloadPDF(idConvocatoria) {
    axiosClient({
      url: "/descargarConvocatoria",
      method: "POST",
      responseType: "blob",
      data: {
        idConvocatoria: id,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download");
      document.body.appendChild(link);
      link.click();
    });
  }*/

  function deleteConvocatoria(id) {
    setConvocatorias(
      convocatorias.filter((convocatoria) => convocatoria.idConvocatoria !== id)
    );
    axiosClient
      .delete("/convocatoria/" + id, {})
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }

  function cambiarEstadoConvocatoria(id) {
    const convocatoria = convocatorias.find(
      (convocatoria) => convocatoria.idConvocatoria === id
    );
    const nuevoEstado = convocatoria.estado_convocatoria === 0 ? 1 : 0;
    axiosClient
      .put("/convocatoria/" + id, {
        ...convocatoria,
        estado_convocatoria: nuevoEstado,
      })
      .then((res) => {
        const nuevasConvocatorias = convocatorias.map((c) =>
          c.idConvocatoria === id
            ? { ...c, estado_convocatoria: nuevoEstado }
            : c
        );
        setConvocatorias(nuevasConvocatorias);
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    axiosClient
      .get("/convocatorias")
      .then((response) => {
        let result = response.data;
        console.log(result[0]);
        setConvocatorias(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Container className="tablePageContainer">
      <h1 className="tittleContainer">Lista convocatorias</h1>
      <Table responsive className="mytable">
        <thead className="tableHeader">
          <tr>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Cupos</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {convocatorias.map((convocatoria) => (
            <tr className="misFilas" key={convocatoria.idConvocatoria}>
              <td className="miTd">{convocatoria.titulo}</td>
              <td className="miTd">{convocatoria.descripcion_convocatoria}</td>
              <td className="miTd">
                {convocatoria.estado_convocatoria === 0 ? "Inactivo" : "Activo"}
              </td>
              <td className="miTd">{convocatoria.numero_cupos}</td>
              <td className="miTd">{convocatoria.fecha_inicio}</td>
              <td className="miTd">{convocatoria.fecha_fin}</td>
              <td className="miTd">
                <Button
                  className="celesteBotonC"
                  onClick={() => downloadPDF(convocatoria.idConvocatoria)}
                >
                  Ver Convocatoria
                </Button>
                <Link
                  to={`/admin/formulario-convocatoria/${convocatoria.idConvocatoria}/editar`}
                >
                  <Button className="naranjaBotonC">Editar</Button>
                </Link>

                <Button
                  className="rojoBotonC"
                  onClick={() =>
                    deleteConvocatoria(convocatoria.idConvocatoria)
                  }
                >
                  Eliminar
                </Button>
                <Button
                  className="grisBoton"
                  onClick={() =>
                    cambiarEstadoConvocatoria(convocatoria.idConvocatoria)
                  }
                >
                  {convocatoria.estado_convocatoria === 0
                    ? "Activar"
                    : "Desactivar"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="content-rigth">
        <Link to={"/admin/formulario-convocatoria"}>
          <Button className="botones-cs" variant="success">
            Crear Convocatoria{" "}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ConvocatoriaPage;
