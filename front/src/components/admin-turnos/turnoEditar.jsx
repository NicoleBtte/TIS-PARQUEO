import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from '../../axios-client';

const TurnoEdit = () => {
    const [turno, setTurno] = useState({
        id: "",
        nombre: "",
        horaInicio: "",
        horaFin: "",
        dias: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        getTurno();
      }, []);

    const elturno = {
        "id": 1,
        "nombre": "Turno 1",
        "horaInicio": "09:00",
        "horaFin": "17:00",
        "dias": ["lunes", "martes", "jueves"]
    }
      

    const getTurno = () => {
        setTurno(elturno);
        console.log(turno)
    }


    const diasOptions = [
        { value: 'lunes', label: 'Lunes' },
        { value: 'martes', label: 'Martes' },
        { value: 'miercoles', label: 'Miércoles' },
        { value: 'jueves', label: 'Jueves' },
        { value: 'viernes', label: 'Viernes' },
        { value: 'sabado', label: 'Sábado' },
        { value: 'domingo', label: 'Domingo' },
    ];

    const isDiaSeleccionado = (dia) => {
        return turno.dias.includes(dia);
    };

    const guardar = async (values) => {
        /*if(selectedOption===''){
        alert('Por favor seleccione una opción');
        return;
        }*/
        console.log(values);
        const payload = {
            nombre_turno: values.nombre,
            hora_inicio_turno: values.horaInicio,
            hora_fin_turno: values.horaFin,
            dia_turno: values.dias,
        }

        /*axiosCliente.post('/crearOperador', payload)
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
    
        navigate('/admin/turnos');
    };

    return (
        <div className="formContainer">
        <h4>Crear turno</h4>
        <Formik
            initialValues={{ nombre: turno.nombre, ...turno }}
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
                    checked={isDiaSeleccionado(option.value)}
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

export default TurnoEdit