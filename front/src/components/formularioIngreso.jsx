import { useState } from "react";
import axiosClient from "../axios-client.js";

function IngresosForm() {
  const [formValue, setFormValue] = useState({
    idcliente: "",
  });
  const { idcliente } = formValue;

  /*const handleCreate = (e) => {
    e.preventDefault();
    console.log({ formValue });
  };*/

  const handleSubmit = (e) => {
    console.log(idcliente);
    axiosClient
      .post("/entrada", {
        idcliente,
      })
      .then((res) => {
        console.log(res.data);
        alert("Se registro la entrada ");
      })
      .catch((error) => {
        console.log(error);
        alert("El cliente no existe");
      });
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
              htmlFor="idcliente"
            >
              ID Cliente
            </label>
            <input
              className="form-control"
              name="idcliente"
              id="idcliente"
              type="text"
              onChange={handleInputChange}
              defaultValue={formValue.idcliente}
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
