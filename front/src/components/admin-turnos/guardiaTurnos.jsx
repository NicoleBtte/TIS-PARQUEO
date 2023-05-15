import React from 'react'
import GuardiasTable from './guardiasTable'

const GuardiaTurnos = () => {
  return (
    <>
      <div className='tablePageContainer'>
        <div className='titleBottonContainer'>
          <h4>Guardias</h4>
        </div>
        <div>
          <GuardiasTable/>
        </div>
      </div>
    </>
  )
}

export default GuardiaTurnos