import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Button, Modal, Table } from "react-bootstrap";

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
        console.log(result);
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
        <Table className="mytable w-100">
          <thead className="tableHeader">
            <tr>
              <th className="fw-medium">Fecha</th>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Monto</th>
              <th className="fw-medium">Tipo de pago</th>
              <th className="fw-medium">Meses cancelados</th>
              <th className="fw-medium">Comprobante</th>
              <th className="fw-medium">Operador</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {pagos.map((pago) => (
              <tr className="misFilas" key={pago.idtransaccion}>
                <td className="miTd">{pago.fechaPago}</td>
                <td className="miTd">{pago.cliente_idcliente}</td>
                <td className="miTd">{pago.monto}</td>
                <td className="miTd">
                  {pago.tipo_de_pago === 1 ? "Efectivo" : "Electronico"}
                </td>
                <td className="miTd">{pago.meses_pagados}</td>
                <td className="miTd">
                  {" "}
                  {pago.comprobante == null ? (
                    <i class="bx bx-x"></i>
                  ) : (
                    <Button onClick={() => showImage(pago.comprobante)}>
                      <i class="bx bx-image"></i>
                    </Button>
                  )}
                </td>
                <td className="miTd">{pago.operador}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
