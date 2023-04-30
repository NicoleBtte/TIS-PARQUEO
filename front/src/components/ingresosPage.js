import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function IngresosPage() {
  const [ingresosSalidas, setIngresosSalidas] = useState([
    {
      id: 1,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 2,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 3,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 4,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 5,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 6,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 7,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
    {
      id: 8,
      cliente: "Cliente Name Last Name",
      placa: 165,
      entrada: "10/22/33",
      salida: "10/22/33",
    },
  ]);

  //useEffect(() => {
  //	() => setPagos();
  //}, [pagos]);

  return (
    <div className="container">
      <div className="d-flex-between my-4">
        <h1 className="my-0 fs-2">Pagos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/pagos/agregar"
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
            {ingresosSalidas.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.cliente}</td>
                <td>{pago.placa}</td>
                <td>{pago.entrada}</td>
                <td>{pago.salida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngresosPage;
