import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/convocatoriaBotones.css";
import "../styles/tablePageStyle.css";
import "../styles/botonesStyle.css";
import { Button, Table } from "react-bootstrap";

const PagosCliente = () => {
  const [clientes, setClientes] = useState([]);

  React.useEffect(() => {
    axiosClient
      .get("/consultaEstadoClientes")
      .then((response) => {
        let result = response.data;
        result = JSON.parse(result);
        console.log(result);
        setClientes(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const calcularDeudas = () => {
    const confirmacion = window.confirm(
      "¿Está seguro de calcular las deudas? Por favor, asegúrese de que no se haya calculado dos veces el mismo mes."
    );

    if (confirmacion) {
      axiosClient
        .get(`/calcularDeudas`)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="container">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Pagos por cliente</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/operador/formulario-pago"
          >
            Agregar Pago
          </Link>
        </div>
      </div>
      <div className="content-rigth">
        <Button className="rojoBotonC autoWidth" onClick={calcularDeudas}>
          Calcular Deudas
        </Button>
      </div>
      <div>
        <Table className="mytablec w-100">
          <thead className="bg-c-primary">
            <tr>
              <th className="fw-medium">Cliente</th>
              <th className="fw-medium">Fecha Pagado</th>
              <th className="fw-medium">Fecha limite</th>
              <th className="fw-medium">Deuda Mensual</th>
              <th className="fw-medium">Multa</th>
              <th className="fw-medium">Meses cancelados</th>
              <th className="fw-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-c-secondary">
            {clientes.map((cliente) => (
              <tr key={cliente.idcliente}>
                <td className="miTd">{cliente.nombre_cliente}</td>
                <td className="miTd">{cliente.fecha_pagado}</td>
                <td className="miTd">{cliente.fecha_lim_pago}</td>
                <td className="miTd">{cliente.monto_a_pagar}</td>
                <td className="miTd">{cliente.multa}</td>
                <td className="miTd">{cliente.meses_cancelados}</td>
                <td className="miTd">
                  {cliente.estado_pago === 0 ? "Deudor" : "Al dia"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PagosCliente;
