import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from "../../axios-client.js";
import '../../styles/formStyle.css';

const FormularioGuardia = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  /*useEffect(() => {
    getoptions();
  },[])*/

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  /*const getoptions = () => {
    axiosCliente.get('/parqueos')
    .then(({ data }) => {
      setOptions(JSON.parse(data))
      console.log(JSON.parse(data))
    })
    .catch(() => {
      console.log('Algo salio mal');
    })
  }*/

  const guardar = async (values) => {
    /*if(selectedOption===''){
      alert('Por favor seleccione una opción');
      return;
    }*/
    console.log(values);
    const payload = {
      nombre_guardia: values.name,
      ci: values.ci,
      telf_guardia: values.telefono,
      pass_guardia: values.password,
    }
    console.log(payload);

    axiosCliente.post('/crearGuardia', payload)
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
  
    navigate('/admin/guardias');
  };
  

  return (
    <div className="formContainer">
    <h4>Registro</h4>
    <Formik
      initialValues={{
        name: "",
        ci: "",
        telefono: "",
        password: "",
        ccontrasena: "",
      }}
      validate={(values) => {
        let errors = {};

        // Validacion nombre
        if (!values.name) {
          errors.name = "Por favor ingrese un nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(values.name)) {
          errors.name = "El nombre solo puede contener letras y espacios";
        }

        // Validacion ci
        if (!values.ci) {
          errors.ci = "Por favor ingresa un número de C.I.";
        } else if (isNaN(values.ci)) {
          errors.ci = "El número de C.I. solo puede contener números";
        }

        // Validacion telefono
        if (!values.telefono) {
          errors.telefono = "Por favor ingresa un número de teléfono";
        } else if (isNaN(values.telefono)) {
          errors.telefono = "El teléfono solo puede contener números";
        }

        // Validacion contrasenia
        if (!values.password) {
          errors.password = "Por favor ingresa una contraseña";
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(
            values.password
          )
        ) {
          errors.password =
            "La contraseña debe tener al menos: 8 caracteres, 1 dígito, 1 letra minúscula, 1 letra mayúscula y 1 carácter especial.";
        }

        // Validacion contrasenia
        if (!values.ccontrasena) {
          errors.ccontrasena = "Debe confirmar la contraseña";
        } else if (values.password !== values.ccontrasena) {
          errors.ccontrasena = "Las contraseñas no coinciden.";
        }

        return errors;
      }}
      onSubmit={guardar}
    >
      {({ errors, touched }) => (
        <Form className="formulario">
          
          <div className="myform-group">
            <label htmlFor="nombre">Nombre:</label>
            <Field type="text" id="nombre" name="name" />
            <ErrorMessage
              name="name"
              component={() => <div className="error">{errors.name}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="ci">Número de C.I.:</label>
            <Field type="text" id="ci" name="ci" />
            <ErrorMessage
              name="ci"
              component={() => <div className="error">{errors.ci}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="telefono">Teléfono:</label>
            <Field type="text" id="telefono" name="telefono" />
            <ErrorMessage
              name="telefono"
              component={() => <div className="error">{errors.telefono}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <Field type="password" id="contrasena" name="password" />
            <ErrorMessage
              name="password"
              component={() => <div className="error">{errors.password}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="ccontrasena">Repetir contraseña:</label>
            <Field type="password" id="ccontrasena" name="ccontrasena" />
            <ErrorMessage
              name="ccontrasena"
              component={() => (
                <div className="error">{errors.ccontrasena}</div>
              )}
            />
          </div>
          <div className="boton-container">
            <button type="submit">Enviar</button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default FormularioGuardia;