import { useState } from "react";
import axiosClient from "../axios-client.js";
import { validarMonto } from "../helpers/validadores";

function PagoForm() {
  const [formValue, setFormValue] = useState({
    carnet: "",
    monto: null,
    tipo_de_pago: 1,
    comprobante: "",
    meses: [],
  });

  const { carnet, monto, tipo_de_pago, comprobante, meses } = formValue;

  const [archivo, setArchivo] = useState();

  const fileSelectHandler = (e) => {
    setArchivo({
      archivo: e.target.files[0],
    });
  };
  const [validar, setValidar] = useState({
    montoB: false,
  });
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

  const handleMonthSelection = (month) => {
    if (meses.includes(month)) {
      setFormValue({
        ...formValue,
        meses: meses.filter((m) => m !== month),
      });
    } else {
      setFormValue({
        ...formValue,
        meses: [...meses, month],
      });
    }
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
    // Agregar meses seleccionados al FormData
    meses.forEach((month) => {
      formData.append("meses[]", month);
    });
    console.log({ archivo });
    console.log({ formValue });
    axiosClient
      .post("/pagar", formData)
      .then((res) => {
        console.log(res.data);
        alert("El pago se registro exitosamente");
      })
      .catch((error) => {
        console.log(error);
        alert("Datos invalidos al registrar pago");
      });
  };

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
          <div className="mb-3">
            <label className="form-label fw-medium primary-color">
              Seleccionar meses que se esta cancelando:
            </label>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="enero"
                checked={meses.includes("enero")}
                onChange={() => handleMonthSelection("enero")}
              />
              <label className="form-check-label" htmlFor="enero">
                Enero
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="febrero"
                checked={meses.includes("febrero")}
                onChange={() => handleMonthSelection("febrero")}
              />
              <label className="form-check-label" htmlFor="febrero">
                Febrero
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="marzo"
                checked={meses.includes("marzo")}
                onChange={() => handleMonthSelection("marzo")}
              />
              <label className="form-check-label" htmlFor="marzo">
                marzo
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="abril"
                checked={meses.includes("abril")}
                onChange={() => handleMonthSelection("abril")}
              />
              <label className="form-check-label" htmlFor="abril">
                abril
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="mayo"
                checked={meses.includes("mayo")}
                onChange={() => handleMonthSelection("mayo")}
              />
              <label className="form-check-label" htmlFor="mayo">
                mayo
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="junio"
                checked={meses.includes("junio")}
                onChange={() => handleMonthSelection("junio")}
              />
              <label className="form-check-label" htmlFor="junio">
                junio
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="julio"
                checked={meses.includes("julio")}
                onChange={() => handleMonthSelection("julio")}
              />
              <label className="form-check-label" htmlFor="julio">
                julio
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="agosto"
                checked={meses.includes("agosto")}
                onChange={() => handleMonthSelection("agosto")}
              />
              <label className="form-check-label" htmlFor="agosto">
                agosto
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="septiembre"
                checked={meses.includes("septiembre")}
                onChange={() => handleMonthSelection("septiembre")}
              />
              <label className="form-check-label" htmlFor="septiembre">
                septiembre
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="octubre"
                checked={meses.includes("octubre")}
                onChange={() => handleMonthSelection("octubre")}
              />
              <label className="form-check-label" htmlFor="octubre">
                octubre
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="noviembre"
                checked={meses.includes("noviembre")}
                onChange={() => handleMonthSelection("noviembre")}
              />
              <label className="form-check-label" htmlFor="noviembre">
                noviembre
              </label>
            </div>
            <div className="check">
              <input
                className="form-check-input"
                type="checkbox"
                id="diciembre"
                checked={meses.includes("diciembre")}
                onChange={() => handleMonthSelection("diciembre")}
              />
              <label className="form-check-label" htmlFor="diciembre">
                diciembre
              </label>
              {/* Agregar más checkboxes para los demás meses aquí */}
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
