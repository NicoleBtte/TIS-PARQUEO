import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagen from "../assets/parqueoimg.png";
import zonaimg from "../assets/zonaimg.png";
import axiosClient from "../axios-client.js";
//import { useParams } from "react-router-dom";

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

  const {
    nombre_zona_estacionamiento,
    numero_de_sitios,
    techo,
    arboles_cerca,
    tipo_de_piso,
    descripcion,
  } = modal;

  const handleOnchange = (e) => {
    setModal({ ...modal, [e.target.name]: e.target.value });
  };

  function mostrarZona(idzonaEstacionamiento) {
    let objetoBuscado = zonas.find(
      (zona_estacionamiento) =>
        zona_estacionamiento.idzonaEstacionamiento === idzonaEstacionamiento
    );
    console.log({ idzonaEstacionamiento }); // { id: 2, nombre: 'María' }

    setModal({
      ...modal,
      ...objetoBuscado,
      open: true,
      parqueo: `Parqueo ${params.id}`,
      zona: `Zona ${idzonaEstacionamiento}`,
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
      `datos formularios:::, ${numero_de_sitios}, ${techo}, ${arboles_cerca}, ${tipo_de_piso}, ${tipo_de_piso}, ${descripcion}`
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
      .get("/zonaDeEstacionamientos")
      .then((response) => {
        const result = response.data.data;
        console.log(result);
        setZonas(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [caracteristicas, setCaracteristicas] = useState(false);

  return (
    <Container>
      <h1 textAlign={"center"}>Parqueo {params.id}</h1>{" "}
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
            {modal.parqueo} {modal.zona}
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
                </div>

                <div className="form-group col-md-4">
                  <label for="techo">Techo</label>
                  <select
                    id="techo"
                    name="techo"
                    className="form-control"
                    onChange={handleOnchange}
                    value={techo}
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
                    value={arboles_cerca}
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
                    value={tipo_de_piso}
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
                      Numero de pisos
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
                      arboles cerca
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
            <Image src={imagen} alt="parqueoimg" fluid />
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
                    onClick={() => mostrarZona(zona.idzonaEstacionamiento)}
                    className="mt-3"
                  >
                    Zona {zona.idzonaEstacionamiento}
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
