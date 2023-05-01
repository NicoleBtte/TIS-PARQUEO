import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { validarDescripcion, validarTitulo } from "../helpers/validadores";
//import Swal from "sweetalert2";

function ConvocatoriaEditar() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcionConv: "",
    estado: 0,
    numeroDeZonas: 1,
    archivoPdf: null,
    fecha_actual: null,
    fecha_fin: null,
  });

  //Swal.fire('', 'El registro se ha completado exitoso', '');
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({
    tituloB: false,
    descripcionConvB: false,
  });

  const {
    titulo,
    descripcionConv,
    numeroDeZonas,
    estado,
    archivoPdf,
    fecha_actual,
    fecha_fin,
  } = formData;

  //
  const handleOnchange = (e) => {
    if (e.target.name === "titulo") {
      if (!validarTitulo(e.target.value)) {
        setValidar({ ...validar, tituloB: true });
      } else {
        setValidar({ ...validar, tituloB: false });
      }
    }

    if (e.target.name === "descripcionConv") {
      if (!validarDescripcion(e.target.value)) {
        setValidar({ ...validar, descripcionConvB: true });
      } else {
        setValidar({ ...validar, descripcionConvB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (
    titulo,
    descripcionConv,
    estado,
    numeroDeZonas,
    fecha_actual,
    fecha_fin,
    archivoPdf
  ) => {
    console.log(
      titulo,
      descripcionConv,
      estado,
      numeroDeZonas,
      fecha_actual,
      fecha_fin,
      archivoPdf
    );

    fetch("http://127.0.0.1:8000/convocatorias", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo,
        descripcionConv: descripcionConv,
        estado: estado,
        numeroDeZonas: numeroDeZonas,
        fecha_actual: fecha_actual,
        fecha_fin: fecha_fin,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/convocatorias")
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
                name="titulo"
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Titulo"
                onChange={handleOnchange}
              ></input>
              <span>{validar.tituloB ? "los datos son incorrectos" : ""}</span>
            </div>
            <div className="form-group col-md-6">
              <input
                name="descripcionConv"
                type="text"
                className="form-control"
                id="descripcionConv"
                placeholder="descripcionConv"
                onChange={handleOnchange}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <input
              name="numeroDeZonas"
              type="number"
              id="numeroDeZonas"
              className="form-control"
              min="1"
              max="100"
              onChange={handleOnchange}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label for="estado">Estado</label>
              <select
                id="estado"
                className="form-control"
                onChange={handleOnchange}
              >
                <option selected>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div className="form-group">
              <input
                name="fecha_actual"
                type="date"
                className="form-control"
                id="fecha_actual"
                placeholder="Fecha IInicio"
                onChange={handleOnchange}
              ></input>
            </div>
            <div className="form-group">
              <input
                name="fecha_fin"
                type="date"
                className="form-control"
                id="fecha_fin"
                placeholder="Fecha fin"
                onChange={handleOnchange}
              ></input>
            </div>
            <div className="form-group col-md-4">
              <label for="archivoPdf">Subir archivo</label>
              <input
                type="file"
                name="archivoPdf"
                value={archivoPdf}
                className="form-control-file"
                accept="application/pdf"
                id="archivoPdf"
                onChange={handleOnchange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() =>
              handleSubmit(
                titulo,
                descripcionConv,
                numeroDeZonas,
                estado,
                fecha_actual,
                fecha_fin,
                archivoPdf
              )
            }
          >
            Agregar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default ConvocatoriaEditar;
