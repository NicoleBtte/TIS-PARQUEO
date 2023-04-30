import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { validarDescripcion, validarTitulo } from "../helpers/validadores";
//import Swal from "sweetalert2";

function FormularioConvocatoria() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: 0,
    nCupos: 1,
    archivoPdf: null,
    fechaInicio: null,
    fechaFin: null,
  });

  //Swal.fire('', 'El registro se ha completado exitoso', '');
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({
    tituloB: false,
    descripcionB: false,
  });

  const {
    titulo,
    descripcion,
    nCupos,
    estado,
    archivoPdf,
    fechaInicio,
    fechaFin,
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

    if (e.target.name === "descripcion") {
      if (!validarDescripcion(e.target.value)) {
        setValidar({ ...validar, descripcionB: true });
      } else {
        setValidar({ ...validar, descripcionB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value }); //
  };

  const handleDate = (value, name) => {
    console.log({ value });
    console.log(typeof value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (
    titulo,
    descripcion,
    estado,
    nCupos,
    fechaInicio,
    fechaFin,
    archivoPdf
  ) => {
    console.log(
      titulo,
      descripcion,
      estado,
      nCupos,
      fechaInicio,
      fechaFin,
      archivoPdf
    );

    alert(
      `datos formularios:::, ${titulo}, ${descripcion}, ${estado}, ${nCupos}, ${fechaInicio}, ${fechaFin}`
    );
    fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        nCupos: nCupos,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,

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
                name="descripcion"
                type="text"
                className="form-control"
                id="descripcion"
                placeholder="Descripcion"
                onChange={handleOnchange}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <input
              name="nCupos"
              type="number"
              id="nCupos"
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
                name="fechaInicio"
                type="date"
                className="form-control"
                id="fechaInicio"
                placeholder="Fecha IInicio"
                onChange={handleOnchange}
              ></input>
            </div>
            <div className="form-group">
              <input
                name="fechaFin"
                type="date"
                className="form-control"
                id="fechaFin"
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
                descripcion,
                nCupos,
                estado,
                fechaInicio,
                fechaFin,
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

export default FormularioConvocatoria;
