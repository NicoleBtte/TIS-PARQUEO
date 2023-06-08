import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axiosCliente from "../../axios-client";

const NotifIndv = () => {
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem("ID_USER");

  
    const enviarMensaje = (values) => {
      console.log(values);
      const payload = {
        idemisor: idUsuario,
        idreceptor: values.ci,
        titulo_notif: values.titulo,
        mensaje_notif: values.descripcion,
      };
      console.log(payload);

      axiosCliente
        .post('/notificacionIndividual', payload)
        .then(({ data }) => {
          //que hacer despues
          window.alert("Mensaje enviado");
          console.log(data);
          navigate('/admin/mensajes');
        })
        .catch((err) => {
          const response = err.response;
          console.log(response.data.message);
          if (response && response.status === 422) {
            console.log(response.data.errors);
          }
        });
    };
  
    return (
      <>
        <div className="bigestContainerRedactar">
          <div className="formContainer">
            <h4>Redactar mensaje</h4>
            <Formik
              initialValues={{
                ci: '',
                titulo: "",
                descripcion: "",
              }}
              validate={(values) => {
                let errors = {};

                // Validacion ci
                if (!values.ci) {
                    errors.ci = "Por favor ingresa un número de C.I.";
                } else if (isNaN(values.ci)) {
                    errors.ci = "El número de C.I. solo puede contener números";
                }
  
                // Validacion titulo
                if (!values.titulo) {
                  errors.titulo = "Por favor ingrese sus titulo";
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,60}$/.test(values.titulo)) {
                  errors.titulo =
                    "El titulo solo puede contener letras y espacios";
                }
  
                // Validacion descripcion
                if (!values.descripcion) {
                  errors.descripcion = "Por favor ingresa una descripcion";
                }
                return errors;
              }}
              onSubmit={enviarMensaje}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form className="formulario">
                  <div className="myform-group">
                      <label htmlFor="ci">Número de C.I.:</label>
                      <Field
                        type="text" 
                        id="ci" 
                        name="ci" 
                      />
                      <ErrorMessage name="ci" component={() => (<div className="error">{errors.ci}</div>)} />
                  </div>
                  <div className="myform-group">
                    <label htmlFor="titulo">Tema:</label>
                    <Field type="text" id="titulo" name="titulo" />
                    <ErrorMessage
                      name="titulo"
                      component={() => (
                        <div className="error">{errors.titulo}</div>
                      )}
                    />
                  </div>
                  <div className="myform-group">
                    <label htmlFor="ci">Mensaje:</label>
                    <Field
                      as="textarea"
                      type="textarea"
                      id="descripcion"
                      name="descripcion"
                      className="bigInput"
                    />
                    <ErrorMessage
                      name="descripcion"
                      component={() => (
                        <div className="error">{errors.descripcion}</div>
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
        </div>
      </>
    );
}

export default NotifIndv