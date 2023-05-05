import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link, useParams, Navigate} from "react-router-dom";

const MensajeModal = (props) => {
  const id = props.idemisor;
  const name = props.nameemisor;
  const titulo = props.titulo;
  const descripcion = props.descripcion;
  const fecha = props.fecha;

  const handleClose = () => {
    console.log("Cerrando modal");
    console.log(props);
    props.onHide();
  };

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Mensaje
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{titulo}</h4>
            <p>
              {descripcion}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
    );
  }
  //<Button as={Link} to={'/cliente/mensajes/responder/id/' + id + '/name/' + encodeURIComponent(name)} variant="warning">Responder</Button>

  export default MensajeModal