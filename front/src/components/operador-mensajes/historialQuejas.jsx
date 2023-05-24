import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import MensajeModal from './mensaje';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css';
import '../../styles/tablePageStyle.css';
import jsPDF from "jspdf";
import "jspdf-autotable";

const HistorialQuejas = () => {
  const [filas, setFilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const idUsuario = localStorage.getItem('ID_USER');

  useEffect(() => {
    getFilas();
  }, []);

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

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Agregar el título al documento
    doc.setFontSize(18);
    doc.text("Historial de quejas", 10, 20);
  
    // Agregar los datos de la tabla a una matriz
    const dataTabla = filas.map((registro) => [registro.fecha_notif, registro.emisor_notif, registro.titulo_notif, registro.mensaje_notif]);
    // Agregar la tabla al documento
    doc.autoTable({
      head: [["Fecha", "Emisor","Tema","Mensaje"]],
      body: dataTabla,
      startY: 30,
    });

    // Guardar el documento como un archivo PDF
    doc.save("Historial_Quejas.pdf");
  };

  return (
    <>
      <div className='containerDescargarBoton'>
         <button className='descargarBoton' onClick={generarPDF}>Descargar PDF</button>
      </div>
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