import React, { useState } from 'react'
import HistorialMensajes from './cliente-mensajes/historialMensajes';
import '../styles/tablePageStyle.css';
import '../styles/botonesStyle.css'
import { Button} from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";

const MensajesPage = () => {
  

  return (
    <div className='tablePageContainer'>
     <div className='titleBottonContainer'>
        <h4>Historial de mensajes</h4>
        <Button className='celesteBoton' as={Link} to="/cliente/enviados">Ver enviados</Button>
      </div>
      <div>
        <HistorialMensajes></HistorialMensajes>
      </div>
    </div>

  );
}

export default MensajesPage