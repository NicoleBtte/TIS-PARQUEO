import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { Button } from "react-bootstrap";

/*{\"idhistorial\":1,\
"hora_ingreso_hist\":null,\
"hora_salida_hist\":null,\
"fecha_ingreso\":\"2023-05-02\",\
"fecha_salida\":\"2023-05-02\",\
"cliente_idcliente\":1111}*/

function IngresosPage() {
  const [ingresosSalidas, setIngresosSalidas] = useState([]);

  React.useEffect(() => {
    axiosClient
      .get("/consultaEntradasSalidas")
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setIngresosSalidas(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="container">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Ingresos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/guardia/ingresos/registrar"
          >
            Registrar Ingreso
          </Link>
        </div>
      </div>
      <div>
        <table className="table">
          <thead className="bg-c-primary">
            <tr>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Placa</th>
              <th className="fw-medium">Entrada</th>
              <th className="fw-medium">Salida</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {/*{ingresosSalidas.map((ingresosSalidas) => (
              <tr key={ingresosSalidas.idhistorial}>
                <td>{ingresosSalidas.cliente_idcliente}</td>
                <td>{ingresosSalidas.placa}</td>
                <td>{ingresosSalidas.fecha_ingreso}</td>
                <td> {ingresosSalidas.fecha_salida == null? <Button>Registrar Salida</Button> : ingresosSalidas.fecha_salida}</td>
              </tr>
            ))}*/}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngresosPage;
