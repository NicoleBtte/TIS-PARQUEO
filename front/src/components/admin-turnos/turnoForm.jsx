import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from '../../axios-client';

const TurnoForm = () => {
  const navigate = useNavigate();


  const diasOptions = [
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'miercoles', label: 'Miércoles' },
    { value: 'jueves', label: 'Jueves' },
    { value: 'viernes', label: 'Viernes' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
  ];

  const makeString = (lista) => {
    const cadena = lista.join('-');
    return cadena;
  }

  const guardar = async (values) => {
    /*if(selectedOption===''){
      alert('Por favor seleccione una opción');
      return;
    }*/
    console.log(values);
    const diasString = makeString(values.dias);

    const payload = {
      nombret: values.nombre,
      horaini: values.horaInicio,
      horafin: values.horaFin,
      dias: diasString,
    }

    axiosCliente.post('/registroTurno', payload)
        .then(({}) => {    

        })
        .catch(err => {
          const response = err.response;
          console.log(response.data.message)
          if (response && response.status === 422) {
            console.log(response.data.errors)
          }
          })
  
    navigate('/admin/turnos');
  };

  return (
    <div className="formContainer">
    <h4>Crear turno</h4>
    <Formik
      initialValues={{
        nombre: '',
        horaInicio: '',
        horaFin: '',
        dias: [],
      }}
      validate={(values) => {
        let errors = {};

        // Validacion nombre
        if (!values.nombre) {
          errors.nombre = "Por favor ingrese un nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(values.nombre)) {
          errors.nombre = "El nombre solo puede contener letras y espacios";
        }
        return errors;
      }}
      onSubmit={guardar}
    >
      {({ errors, touched }) => (
        <Form className="formulario">        
          <div className="myform-group">
            <label htmlFor="nombre">Nombre:</label>
            <Field type="text" id="nombre" name="nombre" />
            <ErrorMessage
              name="nombre"
              component={() => <div className="error">{errors.nombre}</div>}
            />
          </div>

          <label htmlFor="horaInicio">Hora de inicio:</label>
          <Field type="time" id="horaInicio" name="horaInicio" required />

          <label htmlFor="horaFin">Hora de fin:</label>
          <Field type="time" id="horaFin" name="horaFin" required />

          <label>Días:</label>
          {diasOptions.map((option) => (
            <div key={option.value}>
              <Field
                type="checkbox"
                id={option.value}
                name="dias"
                value={option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
            ))}

          <div className="boton-container">
            <button type="submit">Guardar</button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default TurnoForm