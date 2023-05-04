import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre } from "../helpers/validadores";
import axiosClient from "../axios-client.js";
//import Swal from "sweetalert2";

/*{
  "idParqueo": 1,
  "nombre_parqueo": "prueba parqueo",
  "administrador_idadministrador": 1,
  "mapa_parqueo": "asdfkhgfdasdfg",
  "numero_de_zonas": 2
}*/

function FormularioParqueo() {
  const [formData, setFormData] = useState({
    nombre_parqueo: "",
    numero_de_zonas: 1,
    mapa_parqueo: null,
  });

  //Swal.fire("", "El registro se ha completado exitoso", "");
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({ nombre_parqueoB: false });

  const { nombre_parqueo, numero_de_zonas, mapa_parqueo } = formData;

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

  const handleSubmit = (e) => {
    console.log(nombre_parqueo, numero_de_zonas, mapa_parqueo);
    alert(
      `datos formularios:::, ${nombre_parqueo}, ${numero_de_zonas}, ${mapa_parqueo}`
    );
    axiosClient
      .post("/parqueo", {
        nombre_parqueo,
        numero_de_zonas,
        mapa_parqueo,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };
  /*React.useEffect(() => {
    axiosClient
      .get("/admininistores")
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setAdministradores(result);
      })
      .catch((error) => console.log("error", error));
  }, []);*/

  return (
    <Container>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                label="nombre_parqueo"
                type="text"
                name="nombre_parqueo"
                id="nombre_parqueo"
                helperText={
                  !validar.nombre_parqueoB
                    ? ""
                    : "Solo se aceptan numeros y letras"
                }
                onChange={handleOnchange}
              />
            </div>
            {/*}
            <div className="form-group col-md-4">
              <label for="estado_convocatoria">estado_convocatoria</label>
              <select
                name="estado_convocatoria"
                id="estado_convocatoria"
                className="form-control"
                onChange={handleOnchange}
              >
                {parqueos.map((parqueo) => (
                  <option
                    key={administrador.idadministrador}
                    value={idadministrador.idadministrador}
                  >
                    {adminnistrador.nombre_administrador}
                  </option>
                ))}
              </select>
            </div>
            */}
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
                name="archivoImg"
                value={mapa_parqueo}
                className="form-control-file"
                accept="application/jpg/png"
                id="archivoImg"
                onChange={handleOnchange}
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
