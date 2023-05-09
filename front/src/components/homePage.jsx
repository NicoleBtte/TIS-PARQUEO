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
  console.log('idconv', convocatoria.idConvocatoria)

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
              idConv={convocatoria.idConvocatoria}
            />
          ) : (
            <Inicio
              mostrarOcultarFormulario={mostrarOcultarFormulario}
              mostrarBoton={mostrarBoton}
              cupos={0}
              titulo={''}
              idConv={''}
            />
          )}
        </>
      )}
    </div>
  );
}
const Inicio = ({ mostrarOcultarFormulario, mostrarBoton, cupos, titulo, idConv}) => {
  var mensaje1 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente la convocatoria “'+titulo+'” se encuentra abierta\n Cupos disponibles: '+cupos;
  const mensaje2 = 'Bienvenido al sistema de parqueo de la Facultad de Ciencias y tecnología.\n El ingreso esta restringido para usuarios que no poseen permisos.\n  Actualmente no se encuentra ninguna convocatoria abierta';
  var mensaje = 'El mensaje';
  const idConvocatoria = idConv;
  console.log('Se ejecuta Inicio',idConvocatoria)

  function downloadPDF(idConv) {
    const payload = {
      idConvocatoria: idConv
    }
    axiosCliente
      .post(
        "/descargarConvocatoria",
        payload,
        { responseType: "blob" }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", idConv);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          { mostrarBoton ?
            <>
              <button className='inicioBoton' onClick={mostrarOcultarFormulario}>Registrarse</button>
              &nbsp;
              <button className='inicioBoton' onClick={() => downloadPDF(idConv)}>Ver informacion</button>
            </>

          : null }
        </div>
      </Container>
    </div>
  );
};
export default HomePage
