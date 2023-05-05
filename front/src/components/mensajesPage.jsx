import React, { useState } from 'react'
import HistorialMensajes from './cliente-mensajes/historialMensajes';
import '../styles/tablePageStyle.css';
import '../styles/botonesStyle.css'

const MensajesPage = () => {
  

  return (
    <div className='tablePageContainer'>
      <div className='titleContainer'>
        <h4>Historial de mensajes</h4>
      </div>
      <div>
        <HistorialMensajes></HistorialMensajes>
      </div>
    </div>

  );
}

export default MensajesPage