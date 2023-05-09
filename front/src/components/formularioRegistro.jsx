import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axiosCliente from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.js";
import '../styles/formStyle.css';

const FormularioRegistro = ({idConvocatoria, titulo, numero_cupos}) => {
  const idConv = idConvocatoria
  const title = titulo
  const cupos = numero_cupos
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const reducirCupos = async () => {
    try {
      await axiosCliente.put('/convocatoriaRegistrarse');
      return 'Se resto un cupo del total';
    } catch (error) {
      console.log('Error en reducir cupo:', error);
      return 'No se pudo reducir el cupo';
    }
  }  

  const guardar = async (values) => {
    console.log(values);
    const payload = {
      name: values.name,
      email: values.email,
      apellidos: values.apellidos,
      direccion: values.direccion,
      telefono: values.telefono,
      ci: values.ci,
      password: values.password,
      //password_confirmation: values.ccontrasena
    }
    console.log(payload);
  
    try {
      const { data } = await axiosCliente.post('/register', payload);
      if (data.message && data.message.indexOf('Usuario creado') !== -1) {
        //se encontro mensaje de exito
        const m = await reducirCupos();
        console.log('Se termino de ejecutar reducir cupos');
        console.log(m);
        if (m === 'Se resto un cupo del total') {
          console.log('El m essssss',m)
          setTimeout(() => {
            window.alert('Registro completado con éxito!');
          }, 500); //espera 500ms antes de mostrar el mensaje
        } else {
          console.log('PEro se entroe porrrr',m)
          setTimeout(() => {
            window.alert('No se pudo completar el registro.\nEs posible que los cupos se hayan acabado.');
          }, 500); //espera 500ms antes de mostrar el mensaje
        }
      } else {
        setTimeout(() => {
          window.alert('No se pudo completar el registro.\nPor favor revise que los datos esten correctos.');
        }, 500); //espera 500ms antes de mostrar el mensaje
      }
    } catch (error) {
      const response = error.response;
      console.log(response.data.message)
      if (response && response.status === 422) {
        console.log(response.data.errors)
      }
      setTimeout(() => {
        window.alert('No se pudo completar el registro.\nPor favor revise que los datos esten correctos. \nTambien es posible que los cupos se hayan acabado.');
      }, 500); //espera 500ms antes de mostrar el mensaje
    }
  
    navigate('/login');
  };
  

  return (
    <div className="formContainer">
    <h4>Registro</h4>
    <Formik
      initialValues={{
        name: "",
        apellidos: "",
        ci: "",
        direccion: "",
        telefono: "",
        email: "",
        placa: "",
        unidad: "",
        cargo: "",
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

        // Validacion apellidos
        if (!values.apellidos) {
          errors.apellidos = "Por favor ingrese sus apellidos";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(values.apellidos)) {
          errors.apellidos =
            "El apellido solo puede contener letras y espacios";
        }

        // Validacion ci
        if (!values.ci) {
          errors.ci = "Por favor ingresa un número de C.I.";
        } else if (isNaN(values.ci)) {
          errors.ci = "El número de C.I. solo puede contener números";
        }

        // Validacion dirección
        if (!values.direccion) {
          errors.direccion = "Por favor ingrese una dirección";
        } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s\-\#\.]+$/i.test(values.direccion)) {
          errors.direccion =
            "La dirección solo puede contener letras, espacios, dígitos, espacios, guiones, almohadillas y puntos.";
        }

        // Validacion telefono
        if (!values.telefono) {
          errors.telefono = "Por favor ingresa un número de teléfono";
        } else if (isNaN(values.telefono)) {
          errors.telefono = "El teléfono solo puede contener números";
        }

        // Validacion correo
        if (!values.email) {
          errors.email = "Por favor ingresa un correo electronico";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
        ) {
          errors.email = "La dirección del correo no es válida.";
        }

        // Validacion placa
        if (!values.placa) {
          errors.placa = "Por favor ingresa la placa de su vehículo";
        } else if (!/\d{4}[A-Z]{3}$/i.test(values.placa)) {
          errors.placa = "La placa debe contener 4 numeros y 3 letras seguidas";
        }

        // Validacion unidad
        if (!values.unidad) {
          errors.unidad = "Por favor ingrese la unidad en la que trabaja";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,80}$/.test(values.unidad)) {
          errors.unidad = "La unidad solo puede contener letras y espacios";
        }
        
        // Validacion cargo
        if (!values.cargo) {
          errors.cargo = "Por favor ingrese un cargo";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,80}$/.test(values.cargo)) {
          errors.cargo = "El cargo solo puede contener letras y espacios";
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
            <label htmlFor="apellidos">Apellidos:</label>
            <Field type="text" id="apellidos" name="apellidos" />
            <ErrorMessage
              name="apellidos"
              component={() => <div className="error">{errors.apellidos}</div>}
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
            <label htmlFor="direccion">Dirección:</label>
            <Field type="text" id="direccion" name="direccion" />
            <ErrorMessage
              name="direccion"
              component={() => <div className="error">{errors.direccion}</div>}
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
            <label htmlFor="correo">Correo electrónico:</label>
            <Field type="text" id="correo" name="email" />
            <ErrorMessage
              name="email"
              component={() => <div className="error">{errors.email}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="placa">Placa del vehículo:</label>
            <Field type="text" id="placa" name="placa" />
            <ErrorMessage
              name="placa"
              component={() => <div className="error">{errors.placa}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="unidad">Unidad de trabajo:</label>
            <Field type="text" id="unidad" name="unidad" />
            <ErrorMessage
              name="unidad"
              component={() => <div className="error">{errors.unidad}</div>}
            />
          </div>
          <div className="myform-group">
            <label htmlFor="cargo">Cargo:</label>
            <Field type="text" id="cargo" name="cargo" />
            <ErrorMessage
              name="cargo"
              component={() => <div className="error">{errors.cargo}</div>}
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

export default FormularioRegistro;
