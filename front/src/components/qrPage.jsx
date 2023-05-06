import React from "react";
import imagen from "../assets/qrUmss.png";
import "../styles/tablePageStyle.css";

function QrPage() {
  return (
    <div>
      <h1 className="tittleQr" paddin>
        Realiza tus pagos de una manera mas facil
      </h1>
      <div className="row">
        <div className="col bac">
          <div className="cuentaB">
            <p className="parrafo">Cuenta Bancaria</p>
            <p className="parrafo">Numero de la cuenta: #############</p>
            <p className="parrafo">Nombre: Parqueo UMSS</p>
            <p className="parrafo">NIT: ########</p>
          </div>
        </div>
        <div className="col">
          <div className="qr">
            <img src={imagen} alt="qrUmss.png" width={300} />
          </div>
        </div>
      </div>
      <h6 className="text-center">
        No olvides dejar tu comprobante directamente en administracion
      </h6>
    </div>
  );
}

export default QrPage;
