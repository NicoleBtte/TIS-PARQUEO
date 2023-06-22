import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import "../styles/formStyle.css";
//import Swal from "sweetalert2";

/*{
  "idConvocatoria": 1,
  "titulo": "convocatoria prueba",
  "fecha_inicio": "2023-05-01",
  "fecha_fin": "2023-05-02",
  "descripcion_convocatoria": "puerbassssssssss",
  "fecha_inicio_gestion": "2023-06-01",
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
    fecha_inicio_: null,
    fecha_fin: null,
    fecha_inicio_gestion: null,
    fecha_fin_gestion: null,
    pago_mensual: null,
    multa_mensaul: null,
  });

  //Swal.fire('', 'El registro se ha completado exitoso', '');
  //Swal.fire('', 'El/los datos(s) ha(n) sido ingresados incorrectamente', 'error');

  const [validar, setValidar] = useState({
    tituloB: false,
    descripcion_convocatoriaB: false,
    numero_cuposB: false,
    fecha_inicioB: false,
    fecha_finB: false,
    fecha_inicio_gestionB: false,
    pago_mensualB: false,
    multa_mensualB: false,
    fecha_inicio_parqueoB: false,
    fecha_fin_parqueoB: false,
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

  const params = useParams();

  const handleSubmit = (e) => {
    console.log(
      titulo,
      descripcion_convocatoria,
      estado_convocatoria,
      numero_cupos,
      fecha_inicio,
      fecha_fin,
      fecha_inicio_gestion,
      fecha_fin_gestion,
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
        fecha_inicio_gestion: fecha_inicio_gestion,
        fecha_fin_gestion: fecha_fin_gestion,
        pago_mensual: pago_mensual,
        multa_mensual: multa_mensual,
      })
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
          console.log("Datos invalidos al editar la convocatoria");
        }
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
              <span className="spanError">
                {validar.tituloB
                  ? "El titulo no puede contener caracteres especiales y debe tener un minimo de 5 caracteres"
                  : ""}
              </span>
            </div>
            <div className="myform-group ">
              <label htmlFor="descripcion_convocatoria">Descripcion</label>
              <input
                name="descripcion_convocatoria"
                type="text"
                className="form-control"
                id="descripcion_convocatoria"
                as="textarea"
                placeholder="descripcion_convocatoria"
                onChange={handleOnchange}
                defaultValue={descripcion_convocatoria}
              ></input>
              <span className="spanError">
                {validar.descripcion_convocatoriaB
                  ? "La descripcion debe contener minimamente 16 caracteres"
                  : ""}
              </span>
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
            <span className="spanError">
              {validar.numero_cuposB
                ? "Los cupos deben ser mayor o igual a 1"
                : ""}
            </span>
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
                placeholder="Fecha Inicio"
                min={new Date().toISOString().split("T")[0]}
                onChange={handleOnChangeFechaInicio}
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
                min={minFechaFin}
                defaultValue={fecha_fin}
              ></input>
              <span className="spanError">
                {validar.fecha_finB
                  ? "La fecha fin no puede ser menor a la fecha inicio"
                  : ""}
              </span>
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
                defaultValue={fecha_inicio_gestion}
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
                defaultValue={fecha_fin_gestion}
                min={minFechaFinG}
              ></input>
              <span className="spanError">
                {validar.fecha_fin_gestionB
                  ? "La fecha fin no puede ser menor a la fecha inicio"
                  : ""}
              </span>
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
              <span className="spanError">
                {validar.pago_mensualB
                  ? "El pago mensual no puede contener numeros negativos ni ser mayor a 1000"
                  : ""}
              </span>
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
              <span className="spanError">
                {validar.multa_mensualB
                  ? "La multa mensual no puede contener numeros negativos ni ser mayor a 1000"
                  : ""}
              </span>
            </div>
            <h6>Recuerda que no puedes editar el archivo pdf</h6>
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
