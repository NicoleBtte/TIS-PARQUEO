import React from 'react'
import '../../styles/cardInfoStyle.css'

function CardInfo(props) {
    const nombreCliente = props.cliente;
    const nombreParqueo = props.parqueo;
    const nombreZona = props.zona;
    const numeroSitio = props.sitio;

  return (
    <div className='infoContainer'>
        <p>Cliente: {nombreCliente}</p>
        <p>Parqueo: {nombreParqueo}</p>
        <p>Zona de estacionamiento: {nombreZona}</p>
        <p>Numero de sitio: {numeroSitio}</p>
    </div>
  )
}

export default CardInfo