import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import "../styles/estilos.css";

const ParqueoPage = () => {
  const [parqueos, setParqueos] = React.useState([
    { nombreParqueo: "parqueo1" },
  ]);

  function deleteParqueo(id) {
    setParqueos(parqueos.filter((parqueo) => parqueo.nombre !== id));
    fetch("", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  }

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/parqueos")
      .then((response) => response.json()) //loconvierto un json el json
      .then((result) => setParqueos(result)) //aqui uso json
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>N° Zonas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parqueos.map((parqueo, index) => (
            <tr key={index}>
              <td>{parqueo.nombreParqueo}</td>
              <td>{parqueo.numero_de_zonas}</td>
              <td>
                <Link to={`/admin/parqueo/${index}/detalle`}>
                  <Button variant="primary" className="boton-detalle">
                    Ver detalles
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => deleteParqueo(parqueo.nombre)}
                >
                  Eliminar
                </Button>
                <Link to={`/admin/parqueo/${index}/editar`}>
                  <Button variant="warning" className="boton-editar">
                    Editar
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="content-rigth">
        <Link className="botones-cs" to={"/admin/formulario-parqueo"}>
          <Button variant="success" className="botones-cs">
            Agregar Parqueo
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ParqueoPage;
