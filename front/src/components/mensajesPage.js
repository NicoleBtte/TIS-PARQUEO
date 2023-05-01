import React, { useState } from 'react'
import HistorialMensajes from './cliente-mensajes/historialMensajes';

const MensajesPage = () => {
  

  return (
    <>
      <h4>Historial de mensajes</h4>
      <div>
        <HistorialMensajes></HistorialMensajes>
      </div>
    </>

  );
}

export default MensajesPage