import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";
//import Swal from "sweetalert2";

function FormularioParqueo() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    mapa: "",
    cantZonas: 1,
    archivoImg: null,
  });

  //Swal.fire("", "El registro se ha completado exitoso", "");
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({ nombreB: false });

  const { nombre, cantZonas, archivoImg } = formData;

  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleOnchange = (e) => {
    if (e.target.name === "nombre") {
      if (!validarNombre(e.target.value)) {
        setValidar({ ...validar, nombreB: true });
      } else {
        setValidar({ ...validar, nombreB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (nombre, cantZonas, archivoImg) => {
    console.log(nombre, cantZonas, archivoImg);
    setLoading(true);
    alert(`datos formularios:::, ${nombre}, ${cantZonas}, ${archivoImg}`);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <div className="container-form">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                label="Nombre"
                type="text"
                name="nombre"
                id="nombre"
                helperText={
                  !validar.nombreB ? "" : "Solo se aceptan numeros y letras"
                }
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
              />
            </div>
            <div className="form-group col-md-4">
              <label for="archivoPdf">Subir imagen</label>
              <input
                type="file"
                name="archivoImg"
                value={archivoImg}
                className="form-control-file"
                accept="application/jpg/png"
                id="archivoImg"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormularioParqueo;
