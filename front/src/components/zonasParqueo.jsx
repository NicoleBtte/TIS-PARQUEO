import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagen from "../assets/parqueoimg.png";
import zonaimg from "../assets/zonaimg.png";
import axiosClient from "../axios-client.js";
import {
  validarNumeroSitios,
  validarDescripcionZona,
} from "../helpers/validadores";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ZonasPar() {
  const [zonas, setZonas] = React.useState([]);

  const [modal, setModal] = useState({
    open: false,
    parqueo: "",
    zona: "",
    nombre_zona_estacionamiento: "",
    numero_de_sitios: null,
    techo: false,
    arboles_cerca: false,
    tipo_de_piso: "pavimentado",
    descripcion: null,
  });

  const [show, setShow] = useState({
    imagen: "",
    show: false,
  });

  const [validar, setValidar] = useState({
    numero_de_sitiosB: false,
    descripcionB: false,
  });

  const {
    nombre_zona_estacionamiento,
    numero_de_sitios,
    techo,
    arboles_cerca,
    tipo_de_piso,
    descripcion,
  } = modal;

  function descargarPDF() {
    const doc = new jsPDF();
    const tittle = parqueoData.nombre_parqueo;
    const tableData = [];

    doc.text("Reporte de zonas de " + tittle, 10, 20);

    // Agregar encabezados de columna a tableData
    const headers = [
      "Nombre zona",
      "Techo",
      "Arboles cerca",
      "Tipo de piso",
      "Descripcion",
    ];
    tableData.push(headers);

    // Agregar filas de datos a tableData
    zonas.forEach((zona) => {
      const rowData = [
        zona.nombre_zona_estacionamiento,
        zona.techo === 0 ? "No" : "Si",
        zona.arboles_cerca === 0 ? "No" : "Si",
        zona.tipo_de_piso,
        zona.descripcion,
      ];
      tableData.push(rowData);
    });

    // Agregar tabla al documento PDF
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 30,
    });

    // Descargar el archivo PDF
    const fileName = `reporte_${parqueoData.nombre_parqueo}.pdf`;
    doc.save(fileName);
  }

  const handleOnchange = (e) => {
    if (e.target.name === "numero_de_sitios") {
      if (!validarNumeroSitios(e.target.value)) {
        setValidar({ ...validar, numero_de_sitiosB: true });
      } else {
        setValidar({ ...validar, numero_de_sitiosB: false });
      }
    }

    if (e.target.name === "descripcion") {
      if (!validarDescripcionZona(e.target.value)) {
        setValidar({ ...validar, descripcionB: true });
      } else {
        setValidar({ ...validar, descripcionB: false });
      }
    }

    setModal({ ...modal, [e.target.name]: e.target.value });
  };

  function mostrarZona(idzonaEstacionamiento, nombre_zona_estacionamiento) {
    let objetoBuscado = zonas.find(
      (zona_estacionamiento) =>
        zona_estacionamiento.idzonaEstacionamiento === idzonaEstacionamiento
    );
    console.log({ idzonaEstacionamiento }); // { id: 2, nombre: 'María' }

    setModal({
      ...modal,
      ...objetoBuscado,
      open: true,
      parqueo: `Parqueo ${params.id}5`,
      zona: `Zona ${idzonaEstacionamiento}`,
      nombre_zona_estacionamiento,
    });
    setCaracteristicas(false);
  }
  const params = useParams();

  const handleSubmit = (e) => {
    console.log(
      nombre_zona_estacionamiento,
      numero_de_sitios,
      techo,
      arboles_cerca,
      tipo_de_piso,
      descripcion
    );
    alert(
      `datos formularios:::, ${numero_de_sitios}, ${techo}, ${arboles_cerca}, ${tipo_de_piso}, ${descripcion}`
    );
    axiosClient
      .put("/zonaDeEstacionamiento/" + modal.idzonaEstacionamiento, {
        numero_de_sitios: numero_de_sitios,
        techo: techo,
        arboles_cerca: arboles_cerca,
        tipo_de_piso: tipo_de_piso,
        descripcion: descripcion,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    e.preventDefault();
  };
  React.useEffect(() => {
    axiosClient
      .get("/zonaDeEstacionamientos/" + params.id)
      .then((response) => {
        const result = response.data;
        console.log(result[0]);
        setZonas(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [parqueoData, setParqueoData] = React.useState({
    administrador_idadministrador: null,
    idParqueo: null,
    mapa_parqueo: "",
    nombre_parqueo: "",
    numero_de_zonas: null,
  });

  React.useEffect(() => {
    axiosClient
      .get("/parqueo/" + params.id)
      .then((response) => {
        console.log("esto", response.data);
        const result = response.data[0];
        setParqueoData(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const [caracteristicas, setCaracteristicas] = useState(false);

  return (
    <Container className="tablePageContainer">
      <h2 className="tittleContainer" textAlign={"center"}>
        {parqueoData.nombre_parqueo}
      </h2>{" "}
      <div className="containerDescargarBoton">
        <button className="descargarBoton" onClick={descargarPDF}>
          Descargar reporte
        </button>
      </div>
      <Modal
        show={modal.open}
        onHide={() => setModal({ ...modal, open: false })}
      >
        <Modal.Header
          className="header-modal d-flex justify-content-between"
          closeButton
        >
          {!caracteristicas ? (
            <span></span>
          ) : (
            <Button variant="link" onClick={() => setCaracteristicas(false)}>
              <i class="bx bx-arrow-back"></i>
            </Button>
          )}
          <span>
            {parqueoData.nombre_parqueo} {modal.nombre_zona_estacionamiento}
          </span>
        </Modal.Header>
        <Modal.Body>
          {caracteristicas ? (
            <div className="form-container">
              <div className="caracteristicas">
                <h1 style={{ fontSize: "36px", textAlign: "center" }}>
                  Caracteristicas
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                  <input
                    name="numero_de_sitios"
                    type="number"
                    id="numero_de_sitios"
                    className="form-control"
                    min="1"
                    max="100"
                    onChange={handleOnchange}
                    defaultValue={numero_de_sitios}
                  />
                  <span className="spanError">
                    {validar.numero_de_sitiosB
                      ? "El numero de sitios debe ser mayor o igual a 1"
                      : ""}
                  </span>
                </div>

                <div className="form-group col-md-4">
                  <label for="techo">Techo</label>
                  <select
                    id="techo"
                    name="techo"
                    className="form-control"
                    onChange={handleOnchange}
                    defaltValue={techo}
                  >
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label for="arboles_cerca">Arboles cerca</label>
                  <select
                    id="arboles_cerca"
                    name="arboles_cerca"
                    className="form-control"
                    onChange={handleOnchange}
                    defaultValue={arboles_cerca}
                  >
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label for="tipo_de_piso">Tipo de piso</label>
                  <select
                    id="tipo_de_piso"
                    name="tipo_de_piso"
                    className="form-control"
                    onChange={handleOnchange}
                    defaultValue={tipo_de_piso}
                  >
                    <option>Pavimentado</option>
                    <option>Empedrado</option>
                    <option>Tierra</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <input
                    name="descripcion"
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="descripcion"
                    onChange={handleOnchange}
                    defaultValue={descripcion}
                  ></input>
                  <span className="spanError">
                    {validar.descripcionB
                      ? "La descripcion debe contener un minimo de 7 y maximo 20 caracteres"
                      : ""}
                  </span>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <Row>
              <Col xs={12}>
                <div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "14px", textAlign: "center" }}
                    >
                      Caracteristicas
                    </h1>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Numero de sitios
                    </h1>
                    <Button variant="outline-primary">
                      {numero_de_sitios}
                    </Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Techo
                    </h1>
                    <Button variant="outline-primary">
                      {techo === 0 ? "NO" : "SI"}
                    </Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Arboles cerca
                    </h1>
                    <Button variant="outline-primary">
                      {arboles_cerca === 0 ? "NO" : "SI"}
                    </Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Tipo de piso
                    </h1>
                    <Button variant="outline-primary">{tipo_de_piso}</Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Caracteristicas
                    </h1>
                    <Button variant="outline-primary">{descripcion}</Button>
                  </div>
                </div>
              </Col>
              <Col xs={12} className="text-end">
                <Button
                  variant="primary"
                  className="botones-cs submit-btn"
                  onClick={() => setCaracteristicas(true)}
                >
                  Editar
                </Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
      <Container>
        <Row className="mb-3">
          <Col xs={6}>
            <Image
              className="w-100"
              src={
                "http://catsoft.tis.cs.umss.edu.bo/storage/public/mapasparqueo/" +
                parqueoData.mapa_parqueo
              }
            />
          </Col>
          <Col xs={6}>
            <Row>
              {zonas.map((zona, index) => (
                <Col xs={6} key={zona.idzonaEstacionamiento}>
                  <Image
                    className="image-location"
                    src={zonaimg}
                    alt="zonaimg"
                    fluid
                  />
                  <Button
                    variant="primary"
                    onClick={() =>
                      mostrarZona(
                        zona.idzonaEstacionamiento,
                        zona.nombre_zona_estacionamiento
                      )
                    }
                    className="mt-3"
                  >
                    {zona.nombre_zona_estacionamiento}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
