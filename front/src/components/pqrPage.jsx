import React, { useState } from 'react'
import HistorialQuejas from './operador-mensajes/historialQuejas';
import '../styles/tablePageStyle.css';
import '../styles/botonesStyle.css'

const PqrPage = () => {
  return (
    <div className='tablePageContainer'>
      <div className='titleContainer'>
        <h4>Historial de peticiones y quejas</h4>
      <div>
      </div>
        <HistorialQuejas></HistorialQuejas>
      </div>
    </div>
    
  );
}
export default PqrPage;
