import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import { Container } from "react-bootstrap";
import { validarDescripcion, validarTitulo } from "../helpers/validadores";
import { useParams } from "react-router-dom";
import "../styles/formStyle.css";
//import Swal from "sweetalert2";

/*{
  "idConvocatoria": 1,
  "titulo": "convocatoria prueba",
  "fecha_inicio": "2023-05-01",
  "fecha_fin": "2023-05-02",
  "descripcion_convocatoria": "puerbassssssssss",
  "fecha_pago": "2023-06-01",
  "numero_cupos": 20,
  "estado_convocatoria_convocatoria": 1
}*/

function ConvocatoriaEditar() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion_convocatoria: "",
    estado_convocatoria: null,
    numero_cupos: null,
    archivoPdf: null,
    fecha_inicio: null,
    fecha_fin: null,
    fecha_pago: null,
    pago_mensual: null,
    multa_mensaul: null,
  });

  //Swal.fire('', 'El registro se ha completado exitoso', '');
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({
    tituloB: false,
    descripcion_convocatoriaB: false,
  });

  const {
    titulo,
    descripcion_convocatoria,
    numero_cupos,
    estado_convocatoria,
    archivoPdf,
    fecha_inicio,
    fecha_fin,
    fecha_pago,
    pago_mensual,
    multa_mensual,
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

    if (e.target.name === "descripcion_convocatoria") {
      if (!validarDescripcion(e.target.value)) {
        setValidar({ ...validar, descripcion_convocatoriaB: true });
      } else {
        setValidar({ ...validar, descripcion_convocatoriaB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const params = useParams();

  const handleSubmit = (e) => {
    console.log(
      titulo,
      descripcion_convocatoria,
      estado_convocatoria,
      numero_cupos,
      fecha_inicio,
      fecha_fin,
      fecha_pago,
      pago_mensual,
      multa_mensual,
      archivoPdf
    );

    axiosClient
      .put("/convocatoria/" + params.id, {
        titulo: titulo,
        descripcion_convocatoria: descripcion_convocatoria,
        estado_convocatoria: estado_convocatoria,
        numero_cupos: numero_cupos,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        fecha_pago: fecha_pago,
        pago_mensual: pago_mensual,
        multa_mensual: multa_mensual,
      })
      .then((res) => {
        console.log(res.data);
        alert("La convocatoria se actualizo correctamente");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "No se pudo actualizar la convocatoria, revisa que haya cambiado bien los datos"
        );
      });
    e.preventDefault();
  };

  React.useEffect(() => {
    axiosClient
      .get("/convocatoria/" + params.id)
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
        <form className="" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="myform-group ">
              <label htmlFor="titulo">Titulo</label>
              <input
                name="titulo"
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Titulo"
                onChange={handleOnchange}
                defaultValue={titulo}
              ></input>
              <span>{validar.tituloB ? "los datos son incorrectos" : ""}</span>
            </div>
            <div className="myform-group ">
              <label htmlFor="descripcion_convocatoria">Descripcion</label>
              <input
                name="descripcion_convocatoria"
                type="text"
                className="form-control"
                id="descripcion_convocatoria"
                placeholder="descripcion_convocatoria"
                onChange={handleOnchange}
                defaultValue={descripcion_convocatoria}
              ></input>
            </div>
          </div>
          <div className="myform-group">
            <label htmlFor="numero_cupos">Numero de cupos</label>
            <input
              name="numero_cupos"
              type="number"
              id="numero_cupos"
              className="form-control"
              min="1"
              max="100"
              onChange={handleOnchange}
              defaultValue={numero_cupos}
            />
          </div>

          <div className="form-row">
            <div className="myform-group ">
              <label for="estado_convocatoria">Estado convocatoria</label>
              <select
                id="estado_convocatoria"
                name="estado_convocatoria"
                className="form-control"
                onChange={handleOnchange}
                value={estado_convocatoria}
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_inicio">Fecha inicio</label>
              <input
                name="fecha_inicio"
                type="date"
                className="form-control"
                id="fecha_inicio"
                placeholder="Fecha IInicio"
                onChange={handleOnchange}
                defaultValue={fecha_inicio}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_fin">Fecha fin</label>
              <input
                name="fecha_fin"
                type="date"
                className="form-control"
                id="fecha_fin"
                placeholder="Fecha fin"
                onChange={handleOnchange}
                defaultValue={fecha_fin}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_pago">Fecha pago</label>
              <input
                name="fecha_pago"
                type="number"
                className="form-control"
                id="fecha_pago"
                placeholder="FechaPago"
                onChange={handleOnchange}
                defaultValue={fecha_pago}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="pago_mensual">Pago mensual</label>
              <input
                name="pago_mensual"
                type="number"
                className="form-control"
                id="pago_mensual"
                placeholder="multa_mensual"
                onChange={handleOnchange}
                defaultValue={pago_mensual}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="multa_mensual">Multa mensual</label>
              <input
                name="multa_mensual"
                type="number"
                className="form-control"
                id="multa_mensual"
                placeholder="multa_mensual"
                onChange={handleOnchange}
                defaultValue={multa_mensual}
              ></input>
            </div>
            {/*<div className="myform-group ">
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
  </div>*/}
          </div>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default ConvocatoriaEditar;
