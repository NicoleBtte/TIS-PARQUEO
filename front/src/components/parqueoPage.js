import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

function createData(tit, ncupos, acc) {
  return { tit, ncupos, acc };
}

const rows = [
  createData("Parqueo 1", 4),
  createData("Parqueo 2", 3),
  createData("Parqueo 3", 8),
];

export default function ParqueoTable() {
  const [parqueos, setParqueos] = useState(rows);

  function deleteParqueo(id) {
    setParqueos(parqueos.filter((parqueo) => parqueo.tit !== id));
    fetch("", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  }
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>N° Cupos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parqueos.map((parqueo, index) => (
            <tr key={index}>
              <td>{parqueo.tit}</td>
              <td>{parqueo.ncupos}</td>
              <td>
                <Link to={`/parqueo/${index}/detalle`}>
                  <Button variant="primary" className="boton-detalle">
                    Ver detalles
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => deleteParqueo(parqueo.tit)}
                >
                  Eliminar
                </Button>
                <Link to={`/parqueo/${index}/editar`}>
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
        <Link className="botones-cs" to={"/formularioPar"}>
          <Button variant="success" className="botones-cs">
            Agregar Parqueo
          </Button>
        </Link>
      </div>
    </Container>
  );
}
