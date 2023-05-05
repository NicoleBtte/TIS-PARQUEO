import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link, useParams, Navigate} from "react-router-dom";
import '../../styles/botonesStyle.css';
import '../../styles/mensajeModalStyle.css';

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
          <Modal.Header className='modalMensajeHeader' closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Mensaje
            </Modal.Title>
          </Modal.Header>
          <div className='modalMensajeBody'>
             <Modal.Body>
                <h4>{titulo}</h4>
                <p>
                  {descripcion}
                </p>
              </Modal.Body>
          </div>
         
          <Modal.Footer className='modalMensajeFooter'>
            <Button className='grisBoton' variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button className='verdeBoton' as={Link} to={'/operador/pqr/responder/id/' + id + '/name/' + encodeURIComponent(name)} variant="warning">Responder</Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
  export default MensajeModal