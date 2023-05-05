import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "../styles/estilos.css";
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
        const result = response.data.data;
        console.log(result);
        setConvocatorias(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Container>
      <Table striped bordered hover className="table-container-cs">
        <thead>
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
          {convocatorias.map((convocatoria, index) => (
            <tr key={convocatoria.idConvocatoria}>
              <td>{convocatoria.titulo}</td>
              <td>{convocatoria.descripcion_convocatoria}</td>
              <td>
                {convocatoria.estado_convocatoria === 0 ? "Inactivo" : "Activo"}
              </td>
              <td>{convocatoria.numero_cupos}</td>
              <td>{convocatoria.fecha_inicio}</td>
              <td>{convocatoria.fecha_fin}</td>
              <td>
                <Link to={`/pdf`}>
                  <Button className="boton-detalle" variant="primary">
                    Ver Convocatoria
                  </Button>
                </Link>

                <Link
                  to={`/admin/formulario-convocatoria/${convocatoria.idConvocatoria}/editar`}
                >
                  <Button variant="secondary">Editar</Button>
                </Link>

                <Button
                  variant="danger"
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
