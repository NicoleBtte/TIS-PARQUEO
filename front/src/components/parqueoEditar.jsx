import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre, validarNumeroSitios } from "../helpers/validadores";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import "../styles/formStyle.css";
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

    if (e.target.name === "numero_de_zonas") {
      if (!validarNumeroSitios(e.target.value)) {
        setValidar({ ...validar, numero_de_zonasB: true });
      } else {
        setValidar({ ...validar, numero_de_zonasB: false });
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
      .then((res) => {
        console.log(res.data);
        alert("El parqueo se actualizo correctamente");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "No se pudo actualizar parqueo, revisa que hayas cambiado bien los datos"
        );
      });
    e.preventDefault();
  };
  React.useEffect(() => {
    axiosClient
      .get("/parqueo/" + params.id)
      .then((response) => {
        const result = response.data;
        console.log(result[0]);
        setFormData(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, [params.id]);

  return (
    <Container>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="myform-group ">
              <label htmlFor="nombre_parqueo">Nombre del parqueo</label>
              <input
                className="form-control"
                type="text"
                name="nombre_parqueo"
                id="nombre_parqueo"
                onChange={handleOnchange}
                defaultValue={nombre_parqueo}
              />
              <span className="spanError">
                {validar.nombre_parqueoB
                  ? "El nombre no puede contener caracteres especiales y debe tener un minimo de 4 caracteres"
                  : ""}
              </span>
            </div>

            <div className="myform-group">
              <label htmlFor="numero_de_zonas">Numero de zonas</label>
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
              <span className="spanError">
                {validar.numero_de_zonasB
                  ? "El numero de zonas debe ser mayor o igual a 1"
                  : ""}
              </span>
            </div>
            <div className="myform-group ">
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ParqueoEditar;
