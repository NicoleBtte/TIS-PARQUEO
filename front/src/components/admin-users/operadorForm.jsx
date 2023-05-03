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
			idoperador: values.idoperador,
            nombre_operador: values.nombre_operador,
			telf_operador: values.telf_operador,
            email_operador: values.email_operador,
            parqueo_idparqueo: values.parqueo_idparqueo,
			pass_operador: values.pass_operador,
		}
		console.log(payload);
	
		axiosClient.post('/registerOperador', payload)
			.then(({data}) => {
				console.log('Se ejecuto axios en formulario')
				console.log(data)
			})
			.catch(err => {
				const response = err.response;
				console.log(response.data.message)
				if (response && response.status === 422) {
				  console.log(response.data.errors)
				}
			  })

			navigate('/');
  };

  return (
    <Formik
      initialValues={{
        idoperador: "",
        nombre_operador: "",
        telf_operador: "",
        email_operador: "",
        parqueo_idparqueo: "",
        pass_operador: "",
        ccontrasena: "",
      }}
      validate={(values) => {
        let errors = {};
        // Validaidoperadoron idoperador
        if (!values.idoperador) {
          errors.idoperador = "Por favor ingresa un número de C.I.";
        } else if (isNaN(values.idoperador)) {
          errors.idoperador = "El número de C.I. solo puede contener números";
        }

        // Validaidoperadoron nombre
        if (!values.nombre_operador) {
          errors.nombre_operador = "Por favor ingrese un nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre_operador)) {
          errors.nombre_operador = "El nombre solo puede contener letras y espaidoperadoros";
        }

        // Validaidoperadoron telf_operador
        if (!values.telf_operador) {
          errors.telf_operador = "Por favor ingresa un número de teléfono";
        } else if (isNaN(values.telf_operador)) {
          errors.telf_operador = "El teléfono solo puede contener números";
        }

        // Validaidoperadoron correo
        if (!values.email_operador) {
          errors.email_operador = "Por favor ingresa un correo electronico";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email_operador)
        ) {
          errors.email_operador = "La direcidoperadorón del correo no es válida.";
        }

        // Validaidoperadoron placa
        if (!values.placa) {
          errors.placa = "Por favor ingresa la placa de su vehículo";
        } else if (!/\d{4}[A-Z]{3}$/i.test(values.placa)) {
          errors.placa = "La placa debe contener 4 numeros y 3 letras seguidas";
        }

        // Validaidoperadoron contrasenia
        if (!values.pass_operador) {
          errors.pass_operador = "Por favor ingresa una contraseña";
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(
            values.pass_operador
          )
        ) {
          errors.pass_operador =
            "La contraseña debe tener al menos: 8 caracteres, 1 dígito, 1 letra minúscula, 1 letra mayúscula y 1 carácter espeidoperadoral.";
        }

        // Validaidoperadoron contrasenia
        if (!values.ccontrasena) {
          errors.ccontrasena = "Debe confirmar la contraseña";
        } else if (values.pass_operador !== values.ccontrasena) {
          errors.ccontrasena = "Las contraseñas no coinidoperadorden.";
        }

        return errors;
      }}
      onSubmit={guardar}
    >
      {({ errors, touched }) => (
        <Form classnombre_operador="formulario">
          <div>
            <label htmlFor="idoperador">Número de C.I.:</label>
            <Field type="text" id="idoperador" nombre_operador="idoperador" />
            <ErrorMessage
              nombre_operador="idoperador"
              component={() => <div classnombre_operador="error">{errors.idoperador}</div>}
            />
          </div>

          <div>
            <label htmlFor="nombre">Nombre:</label>
            <Field type="text" id="nombre" nombre_operador="nombre_operador" />
            <ErrorMessage
              name="nombre_operador"
              component={() => <div className="error">{errors.nombre_operador}</div>}
            />
          </div>

          <div>
            <label htmlFor="telf_operador">Teléfono:</label>
            <Field type="text" id="telf_operador" nombre_operador="telf_operador" />
            <ErrorMessage
              name="telf_operador"
              component={() => <div className="error">{errors.telf_operador}</div>}
            />
          </div>

          <div>
            <label htmlFor="correo">Correo electrónico:</label>
            <Field type="text" id="correo" nombre_operador="email_operador" />
            <ErrorMessage
              name="email_operador"
              component={() => <div className="error">{errors.email_operador}</div>}
            />
          </div>
          <div>
            <label htmlFor="contrasena">Contraseña:</label>
            <Field type="pass_operador" id="contrasena" nombre_operador="pass_operador" />
            <ErrorMessage
              name="pass_operador"
              component={() => <div className="error">{errors.pass_operador}</div>}
            />
          </div>
          <div>
            <label htmlFor="ccontrasena">Repetir contraseña:</label>
            <Field type="pass_operador" id="ccontrasena" nombre_operador="ccontrasena" />
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
