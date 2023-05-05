import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.js";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState("cliente");
  const { setUser, setToken, setRol, setID } = useStateContext();

  const guardar = (values) => {
    console.log(values);
    let apiruta = "";

    const payload = {
      ci: values.ci,
      password: values.password,
    };
    console.log(payload);

    if (selectedRole === "cliente") {
      apiruta = "/login";
    } else {
      if (selectedRole === "admin") {
        apiruta = "/loginadmin";
      } else {
        if (selectedRole === "operador") {
          apiruta = "/loginoperador";
        } else {
          apiruta = "/loginguardia";
        }
      }
    }
    console.log("Apiruta", apiruta);

    axiosClient
      .post(apiruta, payload)
      .then(({ data }) => {
        console.log(data.idusuario);
        setID(data.idusuario);
        console.log(data.access_token);
        setToken(data.access_token);
        console.log(data.rol);
        setRol(data.rol);
      })
      .catch((err) => {
        const response = err.response;
        console.log("El error en login es:");
        console.log(err);
        if (response && response.status === 422) {
          console.log(response.data.message);
        }
      });
  };

  return (
    <>
      <h4>Iniciar sesion</h4>
      <Formik
        initialValues={{
          ci: "",
          password: "",
          loginus: selectedRole,
        }}
        validate={(values) => {
          let errors = {};

          // Validacion ci
          if (!values.ci) {
            errors.ci = "Por favor ingresa un número de C.I.";
          } else if (isNaN(values.ci)) {
            errors.ci = "El número de C.I. solo puede contener números";
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
          return errors;
        }}
        onSubmit={guardar}
      >
        {({ errors, touched }) => (
          <Form className="formulario">
            <label htmlFor="rol">Rol:</label>
            <select
              name="rol"
              id="rol"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="cliente">Cliente</option>
              <option value="operador">Operador</option>
              <option value="guardia">Guardia</option>
              <option value="admin">Administrador</option>
            </select>
            <div>
              <label htmlFor="ci">Número de C.I.:</label>
              <Field type="text" id="ci" name="ci" />
              <ErrorMessage
                name="ci"
                component={() => <div className="error">{errors.ci}</div>}
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
            <button type="submit">Ingresar</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
