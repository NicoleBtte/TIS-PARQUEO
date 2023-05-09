import * as React from "react";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import { validarMonto } from "../helpers/validadores";

function PagoForm() {
  const [formValue, setFormValue] = useState({
    carnet: "",
    monto: null,
    tipo_de_pago: 1,
    comprobante: "",
  });

  const { carnet, monto, tipo_de_pago, comprobante } = formValue;

  const [archivo, setArchivo] = useState();

  const fileSelectHandler = (e) => {
    setArchivo({
      archivo: e.target.files[0],
    });
  };
  const [validar, setValidar] = useState({
    montoB: false,
  });

  const params = useParams();

  const handleInputChange = ({ target }) => {
    if (target.name === "monto") {
      if (!validarMonto(target.value)) {
        setValidar({ ...validar, montoB: true });
      } else {
        setValidar({ ...validar, montoB: false });
      }
    }

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
    e.preventDefault();

    const formData = new FormData();
    formData.append("carnet", carnet);
    formData.append("monto", monto);
    formData.append("tipo_de_pago", tipo_de_pago);
    if (archivo != undefined) {
      formData.append("imagen", archivo.archivo);
    }
    console.log({ archivo });
    console.log({ formValue });
    axiosClient
      .put("/pagar", { comprobante: comprobante })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    axiosClient
      .post("/updatePago", params.idtransaccion)
      .then((response) => {
        let result = response.data;
        result = JSON.parse(result);
        console.log("esto es el resultado", result);
        setFormValue(result);
      })
      .catch((error) => console.log("error", error));
  }, [params.id]);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-center  fw-medium primary-color">
            Agregar Pago
          </legend>
          <div className="mb-3">
            <label
              className="form-label  fw-medium primary-color"
              htmlFor="carnet"
            >
              C.I. cliente
            </label>
            <input
              className="form-control"
              name="carnet"
              id="carnet"
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
            <span className="spanError">
              {validar.montoB
                ? "El monto debe contener un minimo 2 y maximo 3 unidades"
                : ""}
            </span>
          </div>
          <div className="d-flex-container">
            <div className="mb-3">
              <label
                className="form-label  fw-medium primary-color"
                htmlFor="tipo_de_pago"
              >
                Tipo de pago
              </label>
              <select
                className="form-select"
                name="tipo_de_pago"
                id="tipo_de_pago"
                onChange={handleInputChange}
              >
                <option value="1">Efectivo</option>
                <option value="2">Electronico</option>
              </select>
            </div>
            {tipo_de_pago == "2" && (
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
                  accept="image/jpeg,image/png"
                  onChange={fileSelectHandler}
                />
              </div>
            )}
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
