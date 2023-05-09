import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/tablePageStyle.css";
import "../styles/parqueoBotones.css";
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
          <Button className="botones-cs">Agregar Parqueo</Button>
        </Link>
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
      <img
        src={
          "http://localhost:8000/storage/app/public/mapasparqueo/1683568705_Ingresosa.png"
        }
        alt=""
      />
    </Container>
  );
};

export default ParqueoPage;
