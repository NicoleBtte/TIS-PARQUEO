import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Button, Modal } from "react-bootstrap";

function PagosPage() {
  const [pagos, setPagos] = useState([]);

  const [show, setShow] = useState({
    imagen: "",
    show: false,
  });

  function showImage(url) {
    setShow({ ...show, show: true, imagen: url });
  }

  /*function eliminarPago(id) {
    setPagos(pagos.filter((pago) => pago.id !== id));
  }*/

  React.useEffect(() => {
    axiosClient
      .get("/consultaPagos")
      .then((response) => {
        let result = response.data;
        result = JSON.parse(result);
        console.log("esto es el resultaodo", result);
        setPagos(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="container">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Pagos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/operador/formulario-pago"
          >
            Agregar Pago
          </Link>
        </div>
      </div>
      <div>
        <table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th className="fw-medium">Fecha</th>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Monto</th>
              <th className="fw-medium">Comprobante</th>
              <th className="fw-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {pagos.map((pago) => (
              <tr className="misFilas" key={pago.idtransaccion}>
                <td className="miTd">{pago.fechaPago}</td>
                <td className="miTd">{pago.cliente_idcliente}</td>
                <td className="miTd">{pago.monto}</td>
                <td className="miTd">
                  <Button
                    className="btn-none-style"
                    onClick={() => showImage(pago.comprobante)}
                  >
                    <i className="bx bxs-cloud-download bx-icon"></i>
                  </Button>
                </td>
                <td>
                  <Link
                    to={`/operador/formulario-pago/${pago.idtransaccion}/editar`}
                  >
                    <Button className="naranjaBotonC">Editar</Button>
                  </Link>
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
}

export default PagosPage;
