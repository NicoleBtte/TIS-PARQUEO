import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import MensajeModal from './mensajeModal';
import axiosCliente from '../../axios-client';

const HistorialMensajes = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const idUsuario = localStorage.getItem('ID_USER');
  
    useEffect(() => {
      getFilas();
    }, []);

  
    const getFilas = () => {
    //con axios
      const payload ={
        id: idUsuario
      }
      setLoading(true)
      axiosCliente.get('/notificacionesRecibe', { params: payload })
        .then(({ data }) => {
          setLoading(false)
          setFilas(JSON.parse(data))
        })
        .catch(() => {
          setLoading(false)
        })
    };
  
    const handleVerMasClick = (mensaje) => {
      setMensajeSeleccionado(mensaje);
      setModalShow(true);
    };
  
    useEffect(() => {
      if (mensajeSeleccionado) {
        setModalShow(true);
      }
    }, [mensajeSeleccionado]);
  
    return (
      <>
        <Table responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Titulo</th>
              <th>Emisor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {filas.map((mensaje) => (
                <tr key={mensaje.idemisor}>
                  <td>{mensaje.fecha_notif}</td>
                  <td>{mensaje.titulo_notif}</td>
                  <td>{mensaje.emisor_notif}</td>
                  <td>
                    <Button
                      onClick={() => handleVerMasClick(mensaje)}
                      variant="warning"
                    >
                      Ver mas
                    </Button>
                  </td>
                </tr>
              ))}
              {modalShow && (
                <MensajeModal
                  idemisor={mensajeSeleccionado.idemisor}
                  nameemisor={mensajeSeleccionado.emisor_notif}
                  titulo={mensajeSeleccionado.titulo_notif}
                  descripcion={mensajeSeleccionado.mensaje_notif}
                  fecha={mensajeSeleccionado.fecha_notif}
                  show={modalShow}
                  onHide={() => {
                    setModalShow(false);
                  }}
                />
              )}
            </tbody>
          )}
        </Table>
      </>
    );
  };
  
  
  export default HistorialMensajes;