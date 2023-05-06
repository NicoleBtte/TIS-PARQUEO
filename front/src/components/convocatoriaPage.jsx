import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
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

  function deleteConvocatoria(id) {
    setConvocatorias(
      convocatorias.filter((convocatoria) => convocatoria.idConvocatoria !== id)
    );
    axiosClient
      .delete("/convocatoria/" + id, {})
      .then((res) => console.log(res.data))
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
      <Table striped bordered hover className="mytable">
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
              <td className="myTd">{convocatoria.titulo}</td>
              <td className="myTd">{convocatoria.descripcion_convocatoria}</td>
              <td className="myTd">
                {convocatoria.estado_convocatoria === 0 ? "Inactivo" : "Activo"}
              </td>
              <td className="myTd">{convocatoria.numero_cupos}</td>
              <td className="myTd">{convocatoria.fecha_inicio}</td>
              <td className="myTd">{convocatoria.fecha_fin}</td>
              <td className="myTd">
                <Link to={`/pdf`}>
                  <Button className="celesteBoton">Ver Convocatoria</Button>
                </Link>

                <Link
                  to={`/admin/formulario-convocatoria/${convocatoria.idConvocatoria}/editar`}
                >
                  <Button className="naranjaBoton">Editar</Button>
                </Link>

                <Button
                  className="rojoBoton"
                  onClick={() =>
                    deleteConvocatoria(convocatoria.idConvocatoria)
                  }
                >
                  Eliminar
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
