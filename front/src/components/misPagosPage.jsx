import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Container } from "react-bootstrap";

const MisPagos = () => {
  const idusuario = localStorage.getItem('ID_USER');
  const [estadoPago, setEstadoPago] = useState({
    estado_pago: "",
    fecha_lim_pago: "",
    monto_a_pagar: "",
    montoMensual: "100",
    multa: "Descripcion de Multa",
  });

  function descargarComprobante(id) {
    console.log("Downloading image", id);
  }
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    axiosClient
      .post("/showcliente", {
        carnet: idusuario,
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setEstadoPago(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    axiosClient
      .post("/consultaPagosCliente", {
        idcliente: idusuario,
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setPagos(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <div className="d-flex-between my-4 p-3">
        <h1 className="tittleContainer">Mis Pagos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/cliente/pagos-qr"
          >
            Pagar
          </Link>
        </div>
      </div>
      <div className="row p-5">
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Estado</p>
          <p className="parrafoContainer">{estadoPago.estado_pago}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Fecha limite de pago</p>
          <p className="parrafoContainer">{estadoPago.fecha_lim_pago}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Deuda</p>
          <p className="parrafoContainer">{estadoPago.monto_a_pagar}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Monto mensual</p>
          <p className="parrafoContainer">{estadoPago.montoMensual}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Multa</p>
          <p className="parrafoContainer">{estadoPago.multa}</p>
        </div>
      </div>
      <div className="tablePageContainer">
        <table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr className="misFilas" key={pago.id}>
                <td className="myTd text-center">{pago.fechaPago}</td>
                <td className="myTd text-center">{pago.monto}</td>
                <td className="myTd text-center">
                  <button
                    className="btn-none-style"
                    onClick={() => descargarComprobante(pago.id)}
                  >
                    <i className="bx bxs-cloud-download bx-icon"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisPagos;
