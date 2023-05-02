import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";

function ParqueoEditar() {
  const [formData, setFormData] = useState({
    nombreParqueo: "",
    numero_de_zonas: 1,
    mapaParqueo: null,
  });
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
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreParqueo: nombreParqueo,
        numero_de_zonas: numero_de_zonas,
        mapaParqueo: mapaParqueo,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/parqueos")
      .then((response) => response.json()) //loconvierto un json el json
      .then((result) => setFormData(result)) //aqui uso json
      .catch((error) => console.log("error", error));
  }, []);

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
                name="numero_de_zonas"
                type="number"
                id="numero_de_zonas"
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
                name="mapaParqueo"
                value={mapaParqueo}
                className="form-control-file"
                accept="application/jpg/png"
                id="mapaParqueo"
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ParqueoEditar;
