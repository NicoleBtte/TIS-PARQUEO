import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Container } from "react-bootstrap";
import {
  validarDescripcion,
  validarTitulo,
  validarNumeroSitios,
  validarFechas,
  validarPagoMensual,
  validarMultaMensual,
} from "../helpers/validadores";
import "../styles/formStyle.css";

function FormularioConvocatoria() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion_convocatoria: "",
    estado_convocatoria: 1,
    numero_cupos: 1,
    archivoPdf: null,
    fecha_inicio: null,
    fecha_fin: null,
    fecha_inicio_gestion: null,
    fecha_fin_gestion: null,
    //fecha_inicio_gestion: null,
    pago_mensual: null,
    multa_mensaul: null,
  });

  const [validar, setValidar] = useState({
    tituloB: false,
    descripcion_convocatoriaB: false,
    numero_cuposB: false,
    fecha_inicioB: false,
    fecha_finB: false,
    fecha_inicio_gestionB: false,
    fecha_fin_gestionB: false,
  });

  const {
    titulo,
    descripcion_convocatoria,
    numero_cupos,
    estado_convocatoria,
    archivoPdf,
    fecha_inicio,
    fecha_fin,
    fecha_inicio_gestion,
    fecha_fin_gestion,
    pago_mensual,
    multa_mensual,
  } = formData;

  const [archivo, setArchivo] = useState();
  const fileSelectHandler = (e) => {
    setArchivo({
      archivo: e.target.files[0],
      archivoNombre: e.target.files[0].name,
    });
  };

  const [minFechaFin, setMinFechaFin] = useState("");
  const [minFechaFinG, setMinFechaFinG] = useState("");

  const handleOnChangeFechaInicio = (e) => {
    if (!validarFechas(e.target.value)) {
      setValidar({ ...validar, fecha_inicioB: true });
    } else {
      setValidar({ ...validar, fecha_inicioB: false });
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setMinFechaFin(value);
  };

  const handleOnChangeFechaInicioG = (e) => {
    if (e.target.name === "fecha_inicio_gestion") {
      if (!validarFechas(e.target.value)) {
        setValidar({ ...validar, fecha_inicio_gestionB: true });
      } else if (
        validarFechas(e.target.value) &&
        fecha_fin &&
        e.target.value <= fecha_fin
      ) {
        setValidar({ ...validar, fecha_inicio_gestionB: true });
      } else {
        setValidar({ ...validar, fecha_inicio_gestionB: false });
      }
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setMinFechaFinG(value);
  };

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

    if (e.target.name === "numero_cupos") {
      if (!validarNumeroSitios(e.target.value)) {
        setValidar({ ...validar, numero_cuposB: true });
      } else {
        setValidar({ ...validar, numero_cuposB: false });
      }
    }

    if (e.target.name === "pago_mensual") {
      if (!validarPagoMensual(e.target.value)) {
        setValidar({ ...validar, pago_mensualB: true });
      } else {
        setValidar({ ...validar, pago_mensualB: false });
      }
    }

    if (e.target.name === "multa_mensual") {
      if (!validarMultaMensual(e.target.value)) {
        setValidar({ ...validar, multa_mensualB: true });
      } else {
        setValidar({ ...validar, multa_mensualB: false });
      }
    }

    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value }); //
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion_convocatoria", descripcion_convocatoria);
    formData.append("estado_convocatoria", estado_convocatoria);
    formData.append("numero_cupos", numero_cupos);
    formData.append("fecha_inicio", fecha_inicio);
    formData.append("fecha_fin", fecha_fin);
    formData.append("fecha_inicio_gestion", fecha_inicio_gestion);
    formData.append("fecha_fin_gestion", fecha_fin_gestion);
    //formData.append("fecha_inicio_gestion", fecha_inicio_gestion);
    formData.append("pago_mensual", pago_mensual);
    formData.append("multa_mensual", multa_mensual);
    formData.append("pdf_convocatoria", archivo.archivo);

    axiosClient
      .post("/convocatoria", formData)
      .then((response) => {
        if (response.data.success) {
          const successMessage = response.data.message;
          alert(successMessage);
        } else {
          const errorMessage = response.data.message;
          alert(errorMessage);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("Datos invalidos al crear la convocatoria");
        }
      });
  };

  return (
    <Container>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="myform-group ">
              <label htmlFor="titulo">Titulo:</label>
              <input
                name="titulo"
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Titulo"
                onChange={handleOnchange}
              ></input>
              <span className="spanError">
                {validar.tituloB
                  ? "El titulo no puede contener caracteres especiales y debe tener un minimo de 5 caracteres"
                  : ""}
              </span>
            </div>
            <div className="myform-group ">
              <label htmlFor="descripcion_convocatoria">Descripcion:</label>
              <input
                name="descripcion_convocatoria"
                type="text"
                className="form-control"
                id="descripcion_convocatoria"
                placeholder="descripcion_convocatoria"
                onChange={handleOnchange}
              ></input>
              <span className="spanError">
                {validar.descripcion_convocatoriaB
                  ? "La descripcion debe contener minimamente 16 caracteres"
                  : ""}
              </span>
            </div>
          </div>
          <div className="myform-group">
            <label htmlFor="numero_cupos">Numero de cupos:</label>
            <input
              name="numero_cupos"
              type="number"
              id="numero_cupos"
              className="form-control"
              min="1"
              max="100"
              onChange={handleOnchange}
            />
            <span className="spanError">
              {validar.numero_cuposB
                ? "Los cupos deben ser mayor o igual a 1"
                : ""}
            </span>
          </div>

          <div className="form-row">
            <div className="myform-group ">
              <label for="estado_convocatoria">Estado:</label>
              <select
                name="estado_convocatoria"
                id="estado_convocatoria"
                className="form-control"
                onChange={handleOnchange}
                defaultValue={formData.estado_convocatoria}
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_inicio">Fecha inicio de registro:</label>
              <input
                name="fecha_inicio"
                type="date"
                className="form-control"
                id="fecha_inicio"
                placeholder="Fecha Inicio"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleOnChangeFechaInicio}
              ></input>
              <span
                className={`spanError ${validar.fecha_inicioB ? "show" : ""}`}
              >
                {validar.fecha_inicioB ? "Hay solapamiento de fechas" : ""}
              </span>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_fin">Fecha fin de registro:</label>
              <input
                name="fecha_fin"
                type="date"
                className="form-control"
                id="fecha_fin"
                placeholder="Fecha fin"
                onChange={handleOnchange}
                min={minFechaFin}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_inicio_gestion">
                Fecha inicio gestion:
              </label>
              <input
                name="fecha_inicio_gestion"
                type="date"
                className="form-control"
                id="fecha_inicio_gestion"
                placeholder="Fecha Inicio"
                min={fecha_fin}
                onChange={handleOnChangeFechaInicioG}
              ></input>
            </div>
            <div className="myform-group">
              <label htmlFor="fecha_fin_gestion">Fecha fin gestion:</label>
              <input
                name="fecha_fin_gestion"
                type="date"
                className="form-control"
                id="fecha_fin_gestion"
                placeholder="Fecha fin"
                onChange={handleOnchange}
                min={minFechaFinG}
              ></input>
              <span className="spanError">
                {validar.fecha_fin_gestionB
                  ? "La fecha fin gestion no puede ser menor a la fecha inicio gestion"
                  : ""}
              </span>
            </div>
            <div className="myform-group">
              <label htmlFor="pago_mensual">Pago Mensual:</label>
              <input
                name="pago_mensual"
                type="number"
                id="pago_mensual"
                className="form-control"
                min="1"
                max="1000"
                onChange={handleOnchange}
              />
              <span className="spanError">
                {validar.pago_mensualB
                  ? "El pago mensual no puede contener numeros negativos ni ser mayor a 1000"
                  : ""}
              </span>
            </div>
            <div className="myform-group">
              <label htmlFor="multa_mensual">Multa Mensual:</label>
              <input
                name="multa_mensual"
                type="number"
                id="multa_mensual"
                className="form-control"
                min="0"
                max="1000"
                onChange={handleOnchange}
              />
              <span className="spanError">
                {validar.multa_mensualB
                  ? "El pago mensual no puede contener numeros negativos ni ser mayor a 1000"
                  : ""}
              </span>
            </div>
            <div className="myform-group ">
              <label for="archivoPdf">Subir archivo:</label>
              <input
                type="file"
                name="archivoPdf"
                value={archivoPdf}
                className="form-control-file"
                accept="application/pdf"
                id="archivoPdf"
                onChange={fileSelectHandler}
              />
            </div>
          </div>
          <div className="boton-container">
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormularioConvocatoria;
