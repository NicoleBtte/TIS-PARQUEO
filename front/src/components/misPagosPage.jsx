import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

const MisPagos = () => {
  const idusuario = localStorage.getItem("ID_USER");
  const [estadoPago, setEstadoPago] = useState({
    estado_pago: "",
    fecha_lim_pago: "",
    monto_a_pagar: "",
    montoMensual: "100",
    multa: "",
    saldo: "",
  });
  const [show, setShow] = useState({
    imagen: "",
    show: false,
  });

  function showImage(url) {
    setShow({ ...show, show: true, imagen: url });
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
          <p className="parrafoContainer">
            {estadoPago.estado_pago === 0 ? "Con deuda" : "Al dia"}
          </p>
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
          <p className="text-nowrap fw-medium mb-1">Multa</p>
          <p className="parrafoContainer">{estadoPago.multa}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Saldo</p>
          <p className="parrafoContainer">{estadoPago.saldo}</p>
        </div>
      </div>
      <div className="tablePageContainer">
        <table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Tipo de pago</th>
              <th>Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr className="misFilas" key={pago.id}>
                <td className="myTd text-center">{pago.fechaPago}</td>
                <td className="myTd text-center">{pago.monto}</td>
                <td className="myTd text-center">
                  {pago.tipo_de_pago === 1 ? "Efectivo" : "Electronico"}
                </td>
                <td className="myTd text-center">
                  {" "}
                  {pago.comprobante == null ? (
                    <i class="bx bx-x"></i>
                  ) : (
                    <button
                      className="btn-none-style"
                      onClick={() => showImage(pago.comprobante)}
                    >
                      <i class="bx bx-image"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        size="lg"
        show={show.show}
        onHide={() => setShow({ ...show, show: false })}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            className="w-100"
            src={"http://localhost:8000/storage/uploads/" + show.imagen}
            alt=""
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MisPagos;
