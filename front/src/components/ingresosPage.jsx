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

  const [formData, setFormData] = useState({
    cliente_idcliente: "",
  });

  const { cliente_idcliente } = formData;

  const handleSubmit = (e) => {
    console.log(cliente_idcliente);
    alert(`datos formularios:::, ${cliente_idcliente}`);
    axiosClient
      .post("'/salida", {
        cliente_idcliente,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };

  React.useEffect(() => {
    axiosClient
      .get("/consultaEntradasSalidas")
      .then((response) => {
        const result = response.data;
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
              <th className="fw-medium">Entrada</th>
              <th className="fw-medium">Salida</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {ingresosSalidas.map((ingresoSalida) => (
              <tr key={ingresoSalida.idhistorial}>
                <td>{ingresoSalida.cliente_idcliente}</td>
                <td>{ingresoSalida.fecha_ingreso}</td>
                <td>
                  {" "}
                  {ingresoSalida.fecha_salida == null ? (
                    <Button onClick={handleSubmit}>Registrar Salida</Button>
                  ) : (
                    ingresoSalida.fecha_salida
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngresosPage;
