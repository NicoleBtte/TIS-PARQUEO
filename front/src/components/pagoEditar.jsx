import * as React from "react";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import { validarMonto } from "../helpers/validadores";

function PagoForm() {
  const [formValue, setFormValue] = useState({
    comprobante: "",
  });

  const { comprobante } = formValue;

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
    if (archivo != undefined) {
      formData.append("imagen", archivo.archivo);
    }
    console.log({ archivo });
    console.log({ formValue });
    axiosClient
      .post("/updatePago", { comprobante: comprobante })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-center  fw-medium primary-color">
            Editar comprobante
          </legend>
          <div className="mb-3">
            <label
              className="form-label row  fw-medium primary-color"
              htmlFor="comprobante"
            >
              <span>Seleccionar Comprobante</span>
            </label>
            <input
              id="comprobante"
              name="comprobante"
              type="file"
              accept="image/jpeg,image/png"
              onChange={fileSelectHandler}
            />
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
