import React from 'react'
import GlobalesEnviados from './globalesEnviados'

function AdminMensajes() {
  const theRol = localStorage.getItem('ROL')

  return (
    <div className='tablePageContainer'>
     <div className='titleBottonContainer'>
        <h4>Historial de mensajes enviados</h4>
      </div>
      <div>
        <GlobalesEnviados></GlobalesEnviados>
      </div>
    </div>
  )
}

export default AdminMensajes