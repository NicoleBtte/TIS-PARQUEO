import React, { useEffect, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {FormGroup, FormControl} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosCliente from '../../axios-client';

const RedactarForm = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem('ID_USER');

    useEffect(() => {
      getoptions();
    },[])

    const opciones = [
      {
        idParqueo: 1,
        nombre_parqueo: 'Parqueo 1'
      }
    ]

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    }

    const getoptions = () => {
      //setOptions(opciones);//Estatico--->cambiar

      axiosCliente.get('/parqueos')
      .then(({ data }) => {
        setOptions(JSON.parse(data))
        console.log(JSON.parse(data))
      })
      .catch(() => {
        //setLoading(false)
        console.log('Algo salio mal');
      })
    }

    const enviarMensaje = (values) =>{
      console.log(values);
      const payload = {
        id: idUsuario,
        idparqueo: selectedOption,
        titulo_notif: values.titulo,
        mensaje_notif: values.descripcion,
        
      }
      console.log(payload);
    
      axiosCliente.post('/notificaciones', payload)
        .then(({data}) => {    
          //que hacer despues      
          console.log(data)
        })
        .catch(err => {
          const response = err.response;
          console.log(response.data.message)
          if (response && response.status === 422) {
            console.log(response.data.errors)
          }
          })
    }

    return (
      <>
      <h4>Redactar petición/queja</h4>
      <Formik
        initialValues={{
          option: null,
          titulo: '',
          descripcion:'',
        }}

        validate={(values) => {
          let errors = {};

          // Validacion titulo
          if(!values.titulo){
            errors.titulo = 'Por favor ingrese sus titulo'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.titulo)){
            errors.titulo = 'El titulo solo puede contener letras y espacios'
          }

          // Validacion descripcion
          if(!values.descripcion){
            errors.descripcion = 'Por favor ingresa una descripcion'
          }
        return errors;
      }}
          onSubmit = {enviarMensaje}
        >
        {({ errors, touched, handleChange, values }) => (
            <Form className='formulario'>
                <div>
                  <label htmlFor="option">Opción:</label>
                  <Field as="select" id="option" name="option" onChange={handleOptionChange} value={selectedOption}>
                    <option value="">Seleccione una opción</option>
                    {options.map((opcion) => (
                      <option key={opcion.idParqueo} value={opcion.idParqueo}>
                        {opcion.nombre_parqueo}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="option" component={() => (<div className="error">{errors.option}</div>)} />
                </div>
                <div>
                  <label htmlFor="titulo">Título del asunto:</label>
                  <Field
                    type="text" 
                    id="titulo" 
                    name="titulo" 
                  />
                  <ErrorMessage name="titulo" component={() => (<div className="error">{errors.titulo}</div>)} />
                </div>
                <div>
                  <label htmlFor="ci">Descripción:</label>
                  <Field
                    type="text" 
                    id="descripcion" 
                    name="descripcion" 
                  />
                  <ErrorMessage name="descripcion" component={() => (<div className="error">{errors.descripcion}</div>)} />
                </div>

                <button type="submit">Enviar</button>
            </Form>
        )}
      </Formik>
      </>
      );
  }
  
  export default RedactarForm