import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import MensajeModal from './mensaje';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css';
import '../../styles/tablePageStyle.css';

const HistorialQuejas = () => {
  const [filas, setFilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const idUsuario = localStorage.getItem('ID_USER');

  useEffect(() => {
    getFilas();
  }, []);

  // Arreglo de objetos con datos aleatorios
  /*const mensajes = [
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
  ];*/

  const getFilas = () => {
    const payload ={
      id: idUsuario,
    }

    //con axios
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
      <Table responsive className='mytable'>
        <thead className='tableHeader'>
          <tr>
            <th>Fecha</th>
            <th>Titulo</th>
            <th>Emisor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {loading && (
          <tbody>
            <tr className='misFilas'>
              <td colSpan="5">Loading...</td>
            </tr>
          </tbody>
        )}
        {!loading && (
          <tbody>
            {filas.map((mensaje) => (
              <tr className='misFilas' key={mensaje.idnotificaciones}>
                <td className='miTd'>{mensaje.fecha_notif}</td>
                <td className='miTd'>{mensaje.titulo_notif}</td>
                <td className='miTd'>{mensaje.emisor_notif}</td>
                <td className='miTd'>
                  <Button
                    onClick={() => handleVerMasClick(mensaje)}
                    className='celesteBoton'
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


export default HistorialQuejas;