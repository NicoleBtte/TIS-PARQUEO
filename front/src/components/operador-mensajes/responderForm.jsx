import Button from 'react-bootstrap/Button';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axiosCliente from '../../axios-client';
import '../../styles/formStyle.css';

const ResponderForm = () => {
    const idUsuario = localStorage.getItem('ID_USER');
    const {id, name} = useParams();
    const navigate = useNavigate();

    const enviarMensaje = (values) =>{
      console.log(values);
      const payload = {
        idemisor: idUsuario,
        idreceptor: id,
        titulo: values.titulo,
        descripcion: values.descripcion
      }
      console.log(payload);
    
      /*axiosCliente.post('/notificaciones', payload)
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
          })*/
    }

    return (
      <>
      <div className='bigestContainerRedactar'>
      <div className="formContainer">
      <h4>Responder</h4>
      <p className='destinatarioText'>Cliente: {name}</p>
      <Formik
        initialValues={{
          titulo: '',
          descripcion:''
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
        {({ errors, touched }) => (
            <Form className='formulario'>
                <div className="myform-group">
                  <label htmlFor="titulo">Titulo:</label>
                  <Field
                    type="text" 
                    id="titulo" 
                    name="titulo" 
                  />
                  <ErrorMessage name="titulo" component={() => (<div className="error">{errors.titulo}</div>)} />
                </div>
                <div className="myform-group">
                  <label htmlFor="ci">Descripcion:</label>
                  <Field
                    type="text" 
                    id="descripcion" 
                    name="descripcion"
                    className="bigInput"
                  />
                  <ErrorMessage name="descripcion" component={() => (<div className="error">{errors.descripcion}</div>)} />
                </div>
                <div className="boton-container">
                  <button type="submit">Enviar</button>
                </div>
            </Form>
        )}
      </Formik>
      </div>
      </div>
      </>
      );
  }
  
  export default ResponderForm