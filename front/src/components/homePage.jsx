import React, { useState } from 'react'
import FormularioRegistro from './formularioRegistro'
import { Container } from 'react-bootstrap';
import backgroundImg from '../styles/images/fondo.jpg'
import '../styles/inicioStyle.css'

const HomePage = () => {
  const [mostrarFormulario, setEstado] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const mostrarBoton = true;

  const mostrarOcultarFormulario = () => {
    setEstado(!mostrarFormulario);
  };

  function formularioEnviadoHandler() {
    setFormularioEnviado(true);
  }

  return (
    <div>
      {mostrarFormulario ? (
        <FormularioRegistro onFormularioEnviado={formularioEnviadoHandler}/>
      ) : (
        <Inicio mostrarOcultarFormulario={mostrarOcultarFormulario} />
      )}
    </div>
  );
}
const Inicio = ({ mostrarOcultarFormulario}) => {
  var mostrarBoton = true;
  var mensaje1 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente la convocatoria “Convocatoria 1” se encuentra abierta\n Cupos disponibles: 10';
  const mensaje2 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente no se encuentra ninguna convocatoria abierta';
  var mensaje = 'El mensaje';

  if(mostrarBoton){
    mensaje = mensaje1 + '';
  }else{
    mensaje = mensaje2;
  }
  return (
    <div className='inicioContenedor'>
      <Container fluid className="bg-image" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="contenido">
          <p className='textoInicio'>{mensaje}</p>
          { mostrarBoton ? <button className='inicioBoton' onClick={mostrarOcultarFormulario}>Registrarse</button> : null }
        </div>
      </Container>
    </div>
  );
};
export default HomePage
