import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import "../styles/estilos.css";
import axiosClient from "../axios-client.js";

/*{
  "idParqueo": 1,
  "nombre_parqueo": "prueba parqueo",
  "administrador_idadministrador": 1,
  "mapa_parqueo": "asdfkhgfdasdfg",
  "numero_de_zonas": 2
}*/

const ParqueoPage = () => {
  const [parqueos, setParqueos] = React.useState([]);

  function deleteParqueo(id) {
    setParqueos(parqueos.filter((parqueo) => parqueo.idParqueo !== id));
    axiosClient
      .delete("/parqueo/" + id, {})
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    axiosClient
      .get("/parqueos")
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setParqueos(result);
      })
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
          {parqueos.map((parqueo) => (
            <tr key={parqueo.idParqueo}>
              <td>{parqueo.nombre_parqueo}</td>
              <td>{parqueo.numero_de_zonas}</td>
              <td>
                <Link to={`/admin/parqueo/${parqueo.idParqueo}/detalle`}>
                  <Button variant="primary" className="boton-detalle">
                    Ver detalles
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => deleteParqueo(parqueo.idParqueo)}
                >
                  Eliminar
                </Button>
                <Link to={`/admin/parqueo/${parqueo.idParqueo}/editar`}>
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
