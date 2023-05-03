import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
/*{
  "idParqueo": 1,
  "nombre_parqueo": "prueba parqueo",
  "administrador_idadministrador": 1,
  "mapa_parqueo": "asdfkhgfdasdfg",
  "numero_de_zonas": 2
}*/

function ParqueoEditar() {
  const [formData, setFormData] = useState({
    nombre_parqueo: "",
    numero_de_zonas: null,
    mapa_parqueo: null,
    //administrador_idadministrador: null,
  });
  const [validar, setValidar] = useState({ nombre_parqueoB: false });

  const {
    nombre_parqueo,
    //administrador_idadministrador,
    numero_de_zonas,
    mapa_parqueo,
  } = formData;

  const handleOnchange = (e) => {
    if (e.target.name === "nombre_parqueo") {
      if (!validarNombre(e.target.value)) {
        setValidar({ ...validar, nombre_parqueoB: true });
      } else {
        setValidar({ ...validar, nombre_parqueoB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const params = useParams();

  const handleSubmit = (e) => {
    console.log(
      nombre_parqueo,
      //administrador_idadministrador,
      numero_de_zonas,
      mapa_parqueo
    );

    alert(
      `datos formularios:::, ${nombre_parqueo}, ${numero_de_zonas}, ${mapa_parqueo}`
    );
    axiosClient
      .put("/parqueo/" + params.id, {
        nombre_parqueo,
        numero_de_zonas,
        mapa_parqueo,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };
  React.useEffect(() => {
    axiosClient
      .get("/parqueo/" + params.id)
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setFormData(result);
      })
      .catch((error) => console.log("error", error));
  }, [params.id]);

  return (
    <Container>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="nombre_parqueo"
                id="nombre_parqueo"
                onChange={handleOnchange}
                defaultValue={nombre_parqueo}
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
                defaultValue={numero_de_zonas}
              />
            </div>
            <div className="form-group col-md-4">
              <label for="archivoPdf">Subir imagen</label>
              <input
                type="text"
                name="mapa_parqueo"
                className="form-control-file"
                accept="application/jpg/png"
                id="mapa_parqueo"
                onChange={handleOnchange}
                defaultValue={mapa_parqueo}
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

export default ParqueoEditar;
