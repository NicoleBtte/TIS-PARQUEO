import { useState } from "react";
import axiosClient from "../axios-client.js";

function PagoForm() {
  const [formValue, setFormValue] = useState({
    cliente_idcliente: "",
    monto: null,
    tipo_de_pago: 1,
    comprobante: "",
  });

  const { cliente_idcliente, monto, tipo_de_pago, comprobante } = formValue;

  const handleInputChange = ({ target }) => {
    let value = target.value;
    if (target.name === "monto" || target.name === "tipoPago") {
      value = parseInt(value);
    }
    setFormValue({
      ...formValue,
      [target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    console.log(tipo_de_pago, monto, cliente_idcliente, comprobante);
    alert(
      `datos formularios:::, ${cliente_idcliente}, ${monto}, ${tipo_de_pago}, ${comprobante}`
    );
    axiosClient
      .post("/pagar", {
        cliente_idcliente: cliente_idcliente,
        monto: monto,
        tipo_de_pago: tipo_de_pago,
        comprobante: comprobante,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };

  return (
    <div className="container">
      <form className="pago-form box mx-auto my-4" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-center  fw-medium primary-color">
            Agregar Pago
          </legend>
          <div className="mb-3">
            <label
              className="form-label  fw-medium primary-color"
              htmlFor="idClient"
            >
              C.I. cliente
            </label>
            <input
              className="form-control"
              name="idClient"
              id="idClient"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label fw-medium primary-color"
              htmlFor="monto"
            >
              Monto
            </label>
            <input
              className="form-control"
              id="monto"
              type="number"
              name="monto"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex-container">
            <div className="mb-3">
              <label
                className="form-label  fw-medium primary-color"
                htmlFor="tipoPago"
              >
                Tipo de pago
              </label>
              <select
                className="form-select"
                name="tipoPago"
                id="tipoPago"
                onChange={handleInputChange}
              >
                <option value="1">Efectivo</option>
                <option value="2">Electronico</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                className="form-label row  fw-medium primary-color"
                htmlFor="comprobante"
              >
                <span>Seleccionar Comprobante</span>
                <i className="bx-icon bx bxs-cloud-upload"></i>
              </label>
              <input
                id="comprobante"
                name="comprobante"
                type="file"
                hidden
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <div className="text-center">
          <input className="btn btn-personal" type="submit" value="Registrar" />
        </div>
      </form>
    </div>
  );
}

export default PagoForm;
