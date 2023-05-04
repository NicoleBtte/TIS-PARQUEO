import Button from 'react-bootstrap/Button';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axiosCliente from '../../axios-client';
import '../../styles/formStyle.css';

const ResponseForm = () => {
    const {id, name} = useParams();
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem('ID_USER');

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
      <h4>Responder</h4>
      <p>Destinatario: {name}</p>
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
                <div>
                  <label htmlFor="titulo">Titulo:</label>
                  <Field
                    type="text" 
                    id="titulo" 
                    name="titulo" 
                  />
                  <ErrorMessage name="titulo" component={() => (<div className="error">{errors.titulo}</div>)} />
                </div>
                <div>
                  <label htmlFor="ci">Descripcion:</label>
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
  
  export default ResponseForm