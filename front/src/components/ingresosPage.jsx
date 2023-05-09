import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { Button, Container } from "react-bootstrap";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";

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

  const handleSubmit = (id) => {
    console.log(id);
    alert(`datos formularios:::, ${id}`);
    axiosClient
      .post("/salida", {
        idcliente: id,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    axiosClient
      .get("/consultaEntradasSalidas")
      .then((response) => {
        const result = response.data;
        console.log(JSON.parse(result));
        setIngresosSalidas(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="tablePageContainer">
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
        <table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Entrada</th>
              <th className="fw-medium">Salida</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {ingresosSalidas.map((ingresoSalida) => (
              <tr className="misFilas" key={ingresoSalida.idhistorial}>
                <td className="myTd text-center">
                  {ingresoSalida.cliente_idcliente}
                </td>
                <td className="myTd text-center">
                  {ingresoSalida.fecha_ingreso}
                </td>
                <td className="myTd text-center">
                  {" "}
                  {ingresoSalida.fecha_salida == null ? (
                    <Button
                      onClick={() =>
                        handleSubmit(ingresoSalida.cliente_idcliente)
                      }
                    >
                      Registrar Salida
                    </Button>
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
