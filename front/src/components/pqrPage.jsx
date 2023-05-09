import React, { useState } from 'react'
import HistorialQuejas from './operador-mensajes/historialQuejas';
import { Button} from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import '../styles/tablePageStyle.css';
import '../styles/botonesStyle.css'
import './cliente-mensajes/estilos/botonesMensajes.css'

const PqrPage = () => {
  return (
    <div className='tablePageContainer'>
     <div className='titleBottonContainer'>
        <h4>Historial de peticiones y quejas</h4>
        <Button className='verdeBotonM' as={Link} to="/operador/enviados">Ver enviados</Button>
      </div>      
      <div>
        <HistorialQuejas></HistorialQuejas>
      </div>
    </div>
    
  );
}
export default PqrPage;
