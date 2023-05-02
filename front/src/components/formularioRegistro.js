import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.js";

const FormularioRegistro = () => {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

	const guardar = (values) =>{
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
	
		axiosClient.post('/register', payload)
			.then(({data}) => {
				console.log('Se ejecuto axios en formulario')
				//setUser(data.user)
				//setToken(data.token);
				
				console.log(data)
			})
			.catch(err => {
				const response = err.response;
				console.log(response.data.message)
				if (response && response.status === 422) {
				  console.log(response.data.errors)
				}
			  })

			navigate('/login');
  };

  return (
    <Formik
      initialValues={{
        name: "",
        apellidos: "",
        ci: "",
        direccion: "",
        telefono: "",
        email: "",
        placa: "",
        password: "",
        ccontrasena: "",
      }}
      validate={(values) => {
        let errors = {};

        // Validacion nombre
        if (!values.name) {
          errors.name = "Por favor ingrese un nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
          errors.name = "El nombre solo puede contener letras y espacios";
        }

        // Validacion apellidos
        if (!values.apellidos) {
          errors.apellidos = "Por favor ingrese sus apellidos";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.apellidos)) {
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
        } else if (!/^[a-zA-Z0-9\s\-\#\.]+$/i.test(values.direccion)) {
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
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <Field type="text" id="nombre" name="name" />
            <ErrorMessage
              name="name"
              component={() => <div className="error">{errors.name}</div>}
            />
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos:</label>
            <Field type="text" id="apellidos" name="apellidos" />
            <ErrorMessage
              name="apellidos"
              component={() => <div className="error">{errors.apellidos}</div>}
            />
          </div>
          <div>
            <label htmlFor="ci">Número de C.I.:</label>
            <Field type="text" id="ci" name="ci" />
            <ErrorMessage
              name="ci"
              component={() => <div className="error">{errors.ci}</div>}
            />
          </div>
          <div>
            <label htmlFor="direccion">Dirección:</label>
            <Field type="text" id="direccion" name="direccion" />
            <ErrorMessage
              name="direccion"
              component={() => <div className="error">{errors.direccion}</div>}
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <Field type="text" id="telefono" name="telefono" />
            <ErrorMessage
              name="telefono"
              component={() => <div className="error">{errors.telefono}</div>}
            />
          </div>
          <div>
            <label htmlFor="correo">Correo electrónico:</label>
            <Field type="text" id="correo" name="email" />
            <ErrorMessage
              name="email"
              component={() => <div className="error">{errors.email}</div>}
            />
          </div>
          <div>
            <label htmlFor="placa">Placa del vehículo:</label>
            <Field type="text" id="placa" name="placa" />
            <ErrorMessage
              name="placa"
              component={() => <div className="error">{errors.placa}</div>}
            />
          </div>
          <div>
            <label htmlFor="contrasena">Contraseña:</label>
            <Field type="password" id="contrasena" name="password" />
            <ErrorMessage
              name="password"
              component={() => <div className="error">{errors.password}</div>}
            />
          </div>
          <div>
            <label htmlFor="ccontrasena">Repetir contraseña:</label>
            <Field type="password" id="ccontrasena" name="ccontrasena" />
            <ErrorMessage
              name="ccontrasena"
              component={() => (
                <div className="error">{errors.ccontrasena}</div>
              )}
            />
          </div>
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioRegistro;
