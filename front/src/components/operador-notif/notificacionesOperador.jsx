import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import MensajeModal from '../cliente-mensajes/mensajeModal';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css'

const NotificacionesOperador = () => {
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
      axiosCliente.get('/notificacionesOperador', { params: payload })
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
      <div className='tablePageContainer'>
        <div className='titleBottonContainer'>
          <h4>Historial de mensajes recibidos</h4>
        </div>
        <div>
          <Table responsive className='mytable'>
            <thead className='tableHeader'>
              <tr>
                <th>Fecha</th>
                <th>Tema</th>
                <th>Emisor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            {loading && (
              <tbody>
                <tr className='misFilas'>
                  <td colSpan="5">Cargando...</td>
                </tr>
              </tbody>
            )}
            {!loading && (
              <tbody>
                {filas.map((mensaje) => (
                  <tr className='misFilas' key={mensaje.idemisor}>
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
          </div>
      </div>
      
      </>
    );
  };
  
  
  export default NotificacionesOperador;