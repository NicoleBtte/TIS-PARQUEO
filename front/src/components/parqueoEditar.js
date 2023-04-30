import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";

function ParqueoEditar() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    mapa: "",
    cantZonas: 1,
    archivoImg: null,
  });
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
    fetch("", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "iPhone Galaxy +1",
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  React.useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then(console.log);
  }, []);

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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ParqueoEditar;
