import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";

function IngresosForm() {
  const [formValue, setFormValue] = useState("");
  const [options, setOptions] = useState([]); // Verifica que hayas declarado esta línea correctamente
  const [filtros, setFiltros] = useState([]);
  const { idcliente } = formValue;
  /*const handleCreate = (e) => {
    e.preventDefault();
    console.log({ formValue });
  };*/

  useEffect(() => {
    // Realizar una solicitud al servidor para obtener la lista completa de IDs disponibles
    axiosClient
      .get("/register") // Ajusta la ruta de la solicitud según tu API
      .then((res) => {
        setOptions(res.data.map((cliente) => cliente.idcliente)); // Asignar la lista completa de IDs al estado idOptions
        setFiltros(res.data.map((cliente) => cliente.idcliente));
      })
      .catch((error) => {
        console.log(error);
        // Manejo de errores si es necesario
      });
  }, []);

  const handleSubmit = (e) => {
    console.log("aquii" + formValue); // Acceder a formValue en lugar de idcliente
    axiosClient
      .post("/entrada", {
        idcliente: formValue, // Utilizar formValue directamente
      })
      .then((res) => {
        console.log("aquii" + formValue);
        console.log(res.data);
        alert("Se registró la entrada");
      })
      .catch((error) => {
        console.log(error);
        alert("El cliente no existe");
      });
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormValue(value);
    setFiltros(options.filter((option) => option.toString().includes(value)));
  };

  const handleOnchange = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormValue(value);
  };

  return (
    <div className="contenedorRegistro">
      <div className="formContainer ">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-center  fw-medium primary-color">
              Registrar Ingreso
            </legend>
            <div>
              <label
                className="form-label  fw-medium primary-color"
                htmlFor="idcliente"
              >
                ID Cliente
              </label>
              <input
                type="text"
                value={formValue}
                onChange={handleInputChange}
                list="options-list"
              />
              <datalist id="options-list" className="datalist-width">
                {filtros.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>
          </fieldset>
          <div className="text-center">
            <input
              className="btn btn-personal"
              type="submit"
              value="Registrar"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default IngresosForm;
