import React, { useState } from 'react';
import ClienteSitio from './admin-asig/clienteSitio';
import '../styles/tablePageStyle.css';
import '../styles/botonesStyle.css'

const AsignacionPage = () => {
  
  return (
    <>
    <div className='tablePageContainer'>
      <div>
        <ClienteSitio/>
      </div>
    </div>
    </>
    
  );
}

export default AsignacionPage