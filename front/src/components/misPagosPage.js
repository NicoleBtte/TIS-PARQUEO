//import { useEffect } from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";

const MisPagos = () => {
  const [estadoPago, setEstadoPago] = useState({
    estado: "Descripcion de Estado",
    fechaLiminte: "Descripcion de Fecha limite de pago",
    deuda: "Descripcion de Deuda",
    montoMensual: "Descripcion de Monto mensual",
    multa: "Descripcion de Multa",
  });

  const [pagos, setPagos] = useState([
    { id: 1, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 2, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 3, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 4, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 5, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 6, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 7, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
    { id: 8, fecha: "10/22/33", monto: 1500, tipoPago: "Efectivo" },
  ]);

  /*useEffect(() => {
		() => setPagos();
		() => setEstadoPago();
	}, [pagos]);*/

  return (
    <div className="container">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Mis Pagos</h1>
        <div>
          <Link className="link-none-styles btn-personal py-2" to="/pagar-link">
            Pagar
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Estado</p>
          <p>{estadoPago.estado}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Fecha limite de pago</p>
          <p>{estadoPago.fechaLiminte}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Deuda</p>
          <p>{estadoPago.deuda}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Monto mensual</p>
          <p>{estadoPago.montoMensual}</p>
        </div>
        <div className="col">
          <p className="text-nowrap fw-medium mb-1">Multa</p>
          <p>{estadoPago.multa}</p>
        </div>
      </div>
      <table className="table">
        <thead className="bg-c-primary">
          <tr>
            <th className="fw-medium">Fecha</th>
            <th className="fw-medium">Monto</th>
            <th className="fw-medium">Tipo de Pago</th>
          </tr>
        </thead>
        <tbody className="bg-c-secondary">
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.fecha}</td>
              <td>{pago.monto}</td>
              <td>{pago.tipoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisPagos;
