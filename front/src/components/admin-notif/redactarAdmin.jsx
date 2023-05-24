import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axiosCliente from "../../axios-client";

const RedactarAdmin = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("clientes");
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem("ID_USER");
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  
    const enviarMensaje = (values) => {
      if (selectedOption === "") {
        alert("Por favor seleccione una opción");
        return;
      }
  
      console.log(values);
      const payload = {
        idadministrador: idUsuario,
        titulo_notif: values.titulo,
        mensaje_notif: values.descripcion,
      };
      console.log(payload);

      let apiruta = "";

      if(selectedOption==="clientes"){
        apiruta = "/notificacionAnuncioClientes";
      }else{
        if(selectedOption==="personal"){
          apiruta = "/notificacionAnuncioPersonal";
        }
      }
  
      axiosCliente
        .post(apiruta, payload)
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
                option: null,
                titulo: "",
                descripcion: "",
              }}
              validate={(values) => {
                let errors = {};
  
                // Validacion titulo
                if (!values.titulo) {
                  errors.titulo = "Por favor ingrese sus titulo";
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.titulo)) {
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
                  <div>
                    <label className="speciallabel" htmlFor="rol" >Mandar a:</label>
                      <select className="combobox" name="rol" id="rol" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="clientes">Clientes</option>
                        <option value="personal">Personal</option>
                      </select>
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

export default RedactarAdmin