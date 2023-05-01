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
  
    useEffect(() => {
      getFilas();
    }, []);
  
    // Arreglo de objetos con datos aleatorios
    const mensajes = [
      {
        idemisor: 1,
        fecha: "2022-01-01",
        titulo: "Mensaje de prueba 1",
        descripcion: "Esta es una descripcion de prueba para el mensaje 1",
        emisor: "Juan Pérez"
      },
      {
        idemisor: 2,
        fecha: "2022-02-15",
        titulo: "Mensaje de prueba 2",
        descripcion: "Esta es una descripcion de prueba para el mensaje 2",
        emisor: "María González"
      }
    ];
  
    const getFilas = () => {
      setLoading(true);
      setFilas(mensajes);
      setLoading(false);

      //con axios
    /*setLoading(true)
      axiosCliente.get('/notificaciones')
        .then(({ data }) => {
          setLoading(false)
          setFilas(data.data)
        })
        .catch(() => {
          setLoading(false)
        })*/
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
                  <td>{mensaje.fecha}</td>
                  <td>{mensaje.titulo}</td>
                  <td>{mensaje.emisor}</td>
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
                  nameemisor={mensajeSeleccionado.emisor}
                  titulo={mensajeSeleccionado.titulo}
                  descripcion={mensajeSeleccionado.descripcion}
                  fecha={mensajeSeleccionado.fecha}
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