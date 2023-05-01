import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "../styles/estilos.css";

const ConvocatoriaPage = () => {
  const [convocatorias, setConvocatorias] = React.useState([
    { titulo: "Convocatoria1" },
  ]);

  function deleteConvocatoria(id) {
    setConvocatorias(
      convocatorias.filter((convocatoria) => convocatoria.titulo !== id)
    );
    fetch("", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  }

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/convocatorias")
      .then((response) => response.json()) //loconvierto un json el json
      .then((result) => setConvocatorias(result)) //aqui uso json
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
            <tr key={index}>
              <td>{convocatoria.titulo}</td>
              <td>{convocatoria.descripcionConv}</td>
              <td>{convocatoria.estado}</td>
              <td>{convocatoria.numeroDeZonas}</td>
              <td>{convocatoria.fecha_actual}</td>
              <td>{convocatoria.fecha_fin}</td>
              <td>
                <Link to={`/pdf`}>
                  <Button className="boton-detalle" variant="primary">
                    Ver Convocatoria
                  </Button>
                </Link>

                <Link to={`/convocatoria/${index}/editar`}>
                  <Button variant="secondary">Editar</Button>
                </Link>

                <Button
                  variant="danger"
                  onClick={() => deleteConvocatoria(convocatoria.tit)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="content-rigth">
        <Link to={"/formularioConv"}>
          <Button className="botones-cs" variant="success">
            Crear Convocatoria{" "}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ConvocatoriaPage;
