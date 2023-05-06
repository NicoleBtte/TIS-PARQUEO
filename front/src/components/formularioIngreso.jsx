import { useState } from "react";
import axiosClient from "../axios-client.js";

function IngresosForm() {
  const [formValue, setFormValue] = useState({
    cliente_idcliente: "",
  });
  const { cliente_idcliente, placa } = formValue;

  /*const handleCreate = (e) => {
    e.preventDefault();
    console.log({ formValue });
  };*/

  const handleSubmit = (e) => {
    console.log(cliente_idcliente, placa);
    alert(`datos formularios:::, ${cliente_idcliente}`);
    axiosClient
      .post("'/entrada", {
        cliente_idcliente,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="formContainer ">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-center  fw-medium primary-color">
            Registrar Ingreso
          </legend>
          <div className="mb-3">
            <label
              className="form-label  fw-medium primary-color"
              htmlFor="cliente_idcliente"
            >
              ID Cliente
            </label>
            <input
              className="form-control"
              name="cliente_idcliente"
              id="cliente_idcliente"
              type="text"
              onChange={handleInputChange}
              defaultValue={formValue.cliente_idcliente}
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

export default IngresosForm;
