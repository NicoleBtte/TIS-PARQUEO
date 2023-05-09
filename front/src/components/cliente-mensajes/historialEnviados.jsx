import React, { useState } from 'react'
import '../../styles/tablePageStyle.css';
import './estilos/botonesMensajes.css'
import { Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import MensajesEnviados from './enviados';

const MensajesEnviadosPage = () => {
  const theRol = localStorage.getItem('ROL')

  return (
    <div className='tablePageContainer'>
     <div className='titleBottonContainer'>
        <h4>Historial de mensajes enviados</h4>
        {theRol === 'cliente' ? (
          <Button className='verdeBotonM' as={Link} to="/cliente/mensajes">Ver recibidos</Button>
        ) : 
          <Button className='verdeBotonM' as={Link} to="/operador/pqr">Ver recibidos</Button>
        }
      </div>
      <div>
        <MensajesEnviados></MensajesEnviados>
      </div>
    </div>

  );
}

export default MensajesEnviadosPage