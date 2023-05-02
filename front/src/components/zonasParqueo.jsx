import React, { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import imagen from "../assets/parqueoimg.png";
import zonaimg from "../assets/zonaimg.png";

export default function ZonasPar() {
  const zonas = [1, 2, 3, 4, 5, 6];
  const [modal, setModal] = useState({
    open: false,
    parqueo: "",
    zona: "",
    nombreZona: "",
    nSitios: 1,
    techo: false,
    arbolesCerca: false,
    tipoDePiso: "pavimentado",
    descripcionZona: null,
  });

  const {
    nombreZona,
    nSitios,
    techo,
    arbolesCerca,
    tipoDePiso,
    descripcionZona,
  } = modal;

  const handleOnchange = (e) => {
    setModal({ ...modal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (
    nombreZona,
    nSitios,
    techo,
    arbolesCerca,
    tipoDePiso,
    descripcionZona
  ) => {
    console.log(
      nombreZona,
      nSitios,
      techo,
      arbolesCerca,
      tipoDePiso,
      descripcionZona
    );
    fetch("http://127.0.0.1:8000/zonaDeEstacionamientos", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreZona: nombreZona,
        nSitios: nSitios,
        techo: techo,
        arbolesCerca: arbolesCerca,
        tipoDePiso: tipoDePiso,
        descripcionZona: descripcionZona,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/zonaDeEstacionamientos")
      .then((response) => response.json()) //loconvierto un json el json
      .then((result) => setModal(result)) //aqui uso json
      .catch((error) => console.log("error", error));
  }, []);

  const params = useParams();

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
              <Form.Group controlId="nSitios" className="w-100">
                <Form.Label>N° de sitios</Form.Label>
                <Form.Control
                  className="mx-0 my-0"
                  type="number"
                  name="nSitios"
                  value={nSitios}
                  onChange={handleOnchange}
                  min={1}
                  max={100}
                  isInvalid={false}
                />
                <Form.Control.Feedback type="invalid">
                  Campo obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="techo">
                <Form.Label>Techo</Form.Label>
                <Form.Check
                  type="radio"
                  label="SI"
                  name="techo"
                  value="si"
                  checked={techo === "si"}
                  onChange={handleOnchange}
                />
                <Form.Check
                  type="radio"
                  label="NO"
                  name="techo"
                  value="no"
                  checked={techo === "no"}
                  onChange={handleOnchange}
                />
              </Form.Group>
              <Form.Group controlId="arbolesCerca">
                <Form.Label>Arboles cerca</Form.Label>
                <Form.Check
                  type="radio"
                  name="arbolesCerca"
                  label="SI"
                  value="si"
                  checked={arbolesCerca === "si"}
                  onChange={handleOnchange}
                />
                <Form.Check
                  type="radio"
                  name="arbolesCerca"
                  label="NO"
                  value="no"
                  checked={arbolesCerca === "no"}
                  onChange={handleOnchange}
                />
              </Form.Group>
              <Form.Group controlId="tipoDePiso">
                <Form.Label>Tipo de Piso</Form.Label>
                <Form.Check
                  type="radio"
                  label="Pavimentado"
                  name="tipoDePiso"
                  value="pavimentado"
                  checked={tipoDePiso === "pavimentado"}
                  onChange={handleOnchange}
                />
                <Form.Check
                  type="radio"
                  label="Empedrado"
                  name="tipoDePiso"
                  value="empedrado"
                  checked={tipoDePiso === "empedrado"}
                  onChange={handleOnchange}
                />
                <Form.Check
                  type="radio"
                  label="Tierra"
                  name="tipoDePiso"
                  value="tierra"
                  checked={tipoDePiso === "tierra"}
                  onChange={handleOnchange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>descripcionZona</Form.Label>
                <Form.Control
                  className="errores mx-0 my-0"
                  type="text"
                  placeholder="descripcionZona"
                  name="descripcionZona"
                  value={descripcionZona}
                  onChange={handleOnchange}
                />
              </Form.Group>
              <div className="text-end">
                <Button
                  variant="primary"
                  className="botones-cs submit-btn"
                  onClick={() =>
                    handleSubmit(
                      nombreZona,
                      tipoDePiso,
                      techo,
                      arbolesCerca,
                      nSitios,
                      descripcionZona
                    )
                  }
                >
                  Actualizar
                </Button>
              </div>
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
                      Techo
                    </h1>
                    <Button variant="outline-primary">SI</Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Arboles cerca
                    </h1>
                    <Button variant="outline-primary">NO</Button>
                  </div>
                  <div className="caracteristicas">
                    <h1
                      className="h1"
                      style={{ fontSize: "15px", textAlign: "center" }}
                    >
                      Tipo de piso
                    </h1>
                    <Button variant="outline-primary">Pavimentado</Button>
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
                <Col xs={6} key={zona}>
                  <Image
                    className="image-location"
                    src={zonaimg}
                    alt="zonaimg"
                    fluid
                  />
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModal({
                        ...modal,
                        open: true,
                        parqueo: `Parqueo ${params.id}`,
                        zona: `Zona ${index + 1}`,
                      });
                      setCaracteristicas(false);
                    }}
                    className="mt-3"
                  >
                    Zona {index + 1}
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
