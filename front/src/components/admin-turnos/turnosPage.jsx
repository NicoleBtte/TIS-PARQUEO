import React from 'react';
import TurnosTable from './turnosTable';
import { Button} from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import axiosCliente from '../../axios-client';

function TurnosPage() {
  return (
    <>
    <div className='tablePageContainer'>
      <div className='titleBottonContainer'>
        <h4>Horarios disponibles</h4>
        <Button className='celesteBoton' as={Link} to="/admin/turnoForm">Agregar turno</Button>
      </div>
      <div>
        <TurnosTable/>
      </div>
    </div>
    </>
  )
}

export default TurnosPage