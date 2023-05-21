import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";

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
    axiosClient
      .post(`/calcularDeudas`)
      .then((response) => {
        // Actualizar el estado de las deudas de los clientes en el frontend
        const updatedClientes = clientes.map((cliente) => {
          const clienteActualizado = response.data.find(
            (clienteActualizado) =>
              clienteActualizado.idcliente === cliente.idcliente
          );
          return {
            ...cliente,
            deuda: clienteActualizado.deuda, // Reemplazar con la propiedad adecuada de la respuesta del backend
          };
        });
        setClientes(updatedClientes);
      })
      .catch((error) => console.log("error", error));
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
      <div>
        <button className="btn btn-primary" onClick={calcularDeudas}>
          Calcular Deudas
        </button>
      </div>
      <div>
        <table className="mytable w-100">
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
                <td>{cliente.nombre_cliente}</td>
                <td>{cliente.fecha_pagado}</td>
                <td>{cliente.fecha_lim_pago}</td>
                <td>{cliente.monto_a_pagar}</td>
                <td>{cliente.multa}</td>
                <td>meses</td>
                <td>{cliente.estado_pago === 1 ? "Deudor" : "Al dia"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagosCliente;
