import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { validarNombre, validarNumeroSitios } from "../helpers/validadores";
import axiosClient from "../axios-client.js";
import "../styles/formStyle.css";
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

  const [validar, setValidar] = useState({
    nombre_parqueoB: false,
    numero_de_zonasB: false,
  });

  const { nombre_parqueo, numero_de_zonas, mapa_parqueo } = formData;

  const [archivo, setArchivo] = useState();

  const fileSelectHandler = (e) => {
    setArchivo({
      archivo: e.target.files[0],
      archivoNombre: e.target.files[0].name,
    });
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre_parqueo", nombre_parqueo);
    formData.append("numero_de_zonas", numero_de_zonas);
    formData.append("mapa_parqueo", archivo.archivo);

    axiosClient
      .post("/parqueo", formData)
      .then((res) => {
        console.log(res.data);
        alert("El parqueo fue creado exitosamente");
      })
      .catch((error) => {
        console.log(error);
        alert("Datos invalidos al crear parqueo");
      });
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
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="myform-group ">
              <label htmlFor="nombre_parqueo">Nombre parqueo</label>
              <input
                className="form-control"
                label="nombre_parqueo"
                type="text"
                name="nombre_parqueo"
                id="nombre_parqueo"
                onChange={handleOnchange}
              />
              <span className="spanError">
                {validar.nombre_parqueoB
                  ? "El nombre no puede contener caracteres especiales y debe tener un minimo de 4 caracteres"
                  : ""}
              </span>
            </div>
            {/*}
            <div className="myform-group col-md-4">
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
            <div className="myform-group">
              <label htmlFor="nombre_de_zonas">Numero de zonas</label>
              <input
                name="numero_de_zonas"
                type="number"
                id="numero_de_zonas"
                className="form-control"
                min="1"
                max="100"
                onChange={handleOnchange}
              />
              <span className="spanError">
                {validar.numero_de_zonasB
                  ? "El numero de zonas debe ser mayor o igual a 1"
                  : ""}
              </span>
            </div>
            <div className="myform-group">
              <label for="archivoPdf">Subir imagen</label>
              <input
                type="file"
                name="archivoImg"
                value={mapa_parqueo}
                className="form-control-file"
                accept="image/jpeg,image/png"
                id="archivoImg"
                onChange={fileSelectHandler}
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
