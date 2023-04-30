import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "../styles/estilos.css";

const ConvocatoriaPage = () => {
  const [convocatorias, setConvocatorias] = React.useState([
    {
      titulo: "Convocatoria 1",
      descripcion: "descripcion 1",
      estado: "Activo",
      cupos: "30",
      fechaInicio: "11/11/23",
      fechaFin: "11/11/23",
    },
    {
      titulo: "Convocatoria 1",
      descripcion: "descripcion 1",
      estado: "Activo",
      cupos: "30",
      fechaInicio: "11/11/23",
      fechaFin: "11/11/23",
    },
    {
      titulo: "Convocatoria 1",
      descripcion: "descripcion 1",
      estado: "Activo",
      cupos: "30",
      fechaInicio: "11/11/23",
      fechaFin: "11/11/23",
    },
    {
      titulo: "Convocatoria 1",
      descripcion: "descripcion 1",
      estado: "Activo",
      cupos: "30",
      fechaInicio: "11/11/23",
      fechaFin: "11/11/23",
    },
    {
      titulo: "Convocatoria 1",
      descripcion: "descripcion 1",
      estado: "Activo",
      cupos: "30",
      fechaInicio: "11/11/23",
      fechaFin: "11/11/23",
    },
  ]);

  function deleteConvocatoria(id) {
    setConvocatorias(
      convocatorias.filter((convocatoria) => convocatoria.tit !== id)
    );
    fetch("", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  }

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/convocatorias")
      .then((response) => response.text())
      .then((result) => console.log(result))
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
              <td>{convocatoria.tit}</td>
              <td>{convocatoria.des}</td>
              <td>{convocatoria.est}</td>
              <td>{convocatoria.cupos}</td>
              <td>{convocatoria.finicio}</td>
              <td>{convocatoria.ffin}</td>
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
