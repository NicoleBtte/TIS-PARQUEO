import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";
//import Swal from "sweetalert2";

function FormularioParqueo() {
  const [formData, setFormData] = useState({
    nombreParqueo: "",
    numero_de_zonas: 1,
    mapaParqueo: null,
  });

  //Swal.fire("", "El registro se ha completado exitoso", "");
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({ nombreParqueoB: false });

  const { nombreParqueo, numero_de_zonas, mapaParqueo } = formData;

  const handleOnchange = (e) => {
    if (e.target.name === "nombreParqueo") {
      if (!validarNombre(e.target.value)) {
        setValidar({ ...validar, nombreParqueoB: true });
      } else {
        setValidar({ ...validar, nombreParqueoB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (nombreParqueo, numero_de_zonas, mapaParqueo) => {
    console.log(nombreParqueo, numero_de_zonas, mapaParqueo);
    alert(
      `datos formularios:::, ${nombreParqueo}, ${numero_de_zonas}, ${mapaParqueo}`
    );
    fetch("http://127.0.0.1:8000/parqueos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreParqueo: nombreParqueo,
        numero_de_zonas: numero_de_zonas,
        mapaParqueo: mapaParqueo,
        /* other product data */
      }),
    });
  };

  return (
    <Container>
      <div className="container-form">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                label="nombreParqueo"
                type="text"
                name="nombreParqueo"
                id="nombreParqueo"
                helperText={
                  !validar.nombreParqueoB
                    ? ""
                    : "Solo se aceptan numeros y letras"
                }
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <input
                name="nZonas"
                type="number"
                id="nZonas"
                className="form-control"
                min="1"
                max="100"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group col-md-4">
              <label for="archivoPdf">Subir imagen</label>
              <input
                type="file"
                name="archivoImg"
                value={mapaParqueo}
                className="form-control-file"
                accept="application/jpg/png"
                id="archivoImg"
                onChange={handleOnchange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() =>
                handleSubmit(nombreParqueo, numero_de_zonas, mapaParqueo)
              }
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormularioParqueo;
