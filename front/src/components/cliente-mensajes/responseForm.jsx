import Button from 'react-bootstrap/Button';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useParams } from 'react-router-dom';

const ResponseForm = () => {
  
    const {id, name} = useParams();

    return (
      <>
      <h1>Cliente: {name}</h1>
      <Formik
        initialValues={{
          destino: '',
          titulo: '',
          descripcion:''
        }}

        validate={(values) => {
          let errors = {};

          // Validacion destinatario
          if(!values.destino){
            errors.destino = 'Por favor ingrese un receptor'
          }

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

        >
        {({ errors, touched }) => (
            <Form className='formulario'>
                <div>
                  <label htmlFor="nombre">Nombre del receptor:</label>
                  <Field
                    type="text" 
                    id="destino" 
                    name="destino" 
                  />
                  <ErrorMessage name="destino" component={() => (<div className="error">{errors.destino}</div>)} />
                </div>
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