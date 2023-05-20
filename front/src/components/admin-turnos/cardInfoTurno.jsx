import React from 'react'
import '../../styles/cardInfoStyle.css'

function CardInfoTurno(props) {
    const nombreTurno = props.turno;
    const horaInicio = props.inicio;
    const horaFin = props.fin;
    const dias = props.dias;

  return (
    <div className='infoContainer'>
        <p>Turno: {nombreTurno}</p>
        <p>Hora de inicio: {horaInicio}</p>
        <p>Hora fin: {horaFin}</p>
        <p>Dias: {dias}</p>
    </div>
  )
}

export default CardInfoTurno