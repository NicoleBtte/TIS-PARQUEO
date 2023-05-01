import React, { useState } from 'react'
import HistorialQuejas from './operador-mensajes/historialQuejas';

const PqrPage = () => {

  return (
    <>
      <h4>Historial de peticiones y quejas</h4>
      <div>
        <HistorialQuejas></HistorialQuejas>
      </div>
    </>
    
  );
}

export default PqrPage