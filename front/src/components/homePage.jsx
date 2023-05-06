import React, { useState, useEffect } from 'react'
import FormularioRegistro from './formularioRegistro'
import { Container } from 'react-bootstrap';
import backgroundImg from '../styles/images/fondo.jpg'
import axiosCliente from '../axios-client';
import '../styles/inicioStyle.css'

const HomePage = () => {
  const [mostrarFormulario, mostrarOcultarFormulario] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [convocatoria, setConvocatoria] = useState([]);

  useEffect(() => {
    getConvocatoria();
  }, []);

  const getConvocatoria = () => {
    axiosCliente.get('/convocatoriaActual')
    .then(({ data }) => {
      const c = JSON.parse(data)
      setConvocatoria(c);
      //setConvocatoria(JSON.parse(data));
      if(c){
        console.log('es diferente de null')
        setMostrarBoton(true)
      }
    })
    .catch(() => {
      setConvocatoria(null);
    });
  };

  function formularioEnviadoHandler() {
    setFormularioEnviado(true);
  }
  console.log('mostraboton',mostrarBoton)

  return (
    <div>
      {mostrarFormulario ? (
        <FormularioRegistro
          onFormularioEnviado={formularioEnviadoHandler}

          />
      ) : (
        <>
          {mostrarBoton ? (
            <Inicio
              mostrarOcultarFormulario={mostrarOcultarFormulario}
              mostrarBoton={mostrarBoton}
              cupos={convocatoria.numero_cupos}
              titulo={convocatoria.titulo}
            />
          ) : (
            <Inicio
              mostrarOcultarFormulario={mostrarOcultarFormulario}
              mostrarBoton={mostrarBoton}
              cupos={0}
              titulo={''}
            />
          )}
        </>
      )}
    </div>
  );
}
const Inicio = ({ mostrarOcultarFormulario, mostrarBoton, cupos, titulo}) => {
  var mensaje1 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente la convocatoria “'+titulo+'” se encuentra abierta\n Cupos disponibles: '+cupos;
  const mensaje2 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente no se encuentra ninguna convocatoria abierta';
  var mensaje = 'El mensaje';

  if(mostrarBoton){
    mensaje = mensaje1;
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
