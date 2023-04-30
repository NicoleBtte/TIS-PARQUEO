import React from "react";
import imagen from "../assets/qrUmss.png";

function PqrPage() {
  return (
    <div>
      <h1 className="text-center">Realiza tus pagos de una manera mas facil</h1>
      <div className="row">
        <div className="col">
          <p>Cuenta Bancaria</p>
          <p>Numero de la cuenta: #############</p>
          <p>Nombre: Parqueo UMSS</p>
          <p>NIT: ########</p>
        </div>
        <div className="col">
          <img src={imagen} alt="qrUmss.png" width={300} />
        </div>
      </div>
      <h6 className="text-center">
        No olvides dejar tu comprobante directamente en administracion
      </h6>
    </div>
  );
}

export default PqrPage;
