import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosCliente from '../../axios-client';

const TurnoForm = () => {
  const [turno, setTurno] = useState({
    id: "",
    nombre: "",
    horaInicio: "",
    horaFin: "",
    dias: []
  });
  const [error, setError] = useState({ nombre: '', horaInicio: '', horaFin: ''});
  const navigate = useNavigate();


  const diasOptions = [
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    { value: 'Miércoles', label: 'Miércoles' },
    { value: 'Jueves', label: 'Jueves' },
    { value: 'Viernes', label: 'Viernes' },
    { value: 'Sábado', label: 'Sábado' },
    { value: 'Domingo', label: 'Domingo' },
  ];

  const makeString = (lista) => {
    const ordenDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
    const diasOrdenados = lista.sort(function(a, b) {
      const indiceA = ordenDias.indexOf(a);
      const indiceB = ordenDias.indexOf(b);
      if (indiceA === -1 && indiceB === -1) {
        return 0; // Ambos elementos no están en la lista de orden
      }
      if (indiceA === -1) {
        return 1; // El elemento 'a' no está en la lista de orden
      }
      if (indiceB === -1) {
        return -1; // El elemento 'b' no está en la lista de orden
      }
      return indiceA - indiceB; // Comparación normal de índices
    });
  
    console.log("lista ordenada", diasOrdenados);
    const cadena = diasOrdenados.join('-');
    return cadena;
  }
  
  

  const guardar = async (values) => {
    if(error.nombre!=='' || error.horaFin!==''|| error.horaInicio!==''){
      alert('Los datos no son válidos');
      return;
    }else if(turno.nombre==="" || turno.horaInicio==="" || turno.horaFin==="" || turno.dias.length === 0){
      alert('Por favor complete los campos vacios');
      return;
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar el campo nombre
    if (name === 'nombre') {
      if (!value || /^\s+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre: 'El campo nombre no puede estar vacío' }));
        //setError('');
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setError((prevError) => ({ ...prevError, nombre: 'El formato del nombre no es válido' }));
      } else {
        setError((prevError) => ({ ...prevError, nombre: '' }));
        //setError('');
      }
    }

    // Validar el campo horaFin
    if (name === 'horaFin') {
      const horaInicioValue = turno.horaInicio;
      if (horaInicioValue && value && value < horaInicioValue) {
        setError((prevError) => ({ ...prevError, horaFin: 'La hora de finalización no puede ser anterior a la hora de inicio' }));
      }else if (horaInicioValue === value) {
        setError((prevError) => ({ ...prevError, horaFin: 'La hora de inicio y la hora de fin no pueden ser iguales' }));
      }else {
        setError((prevError) => ({ ...prevError, horaFin: '' }));
      }
    }

    // Validar el campo horaInicio
    if (name === 'horaInicio') {
      const horaFinValue = turno.horaFin;
      if (horaFinValue && value && value > horaFinValue) {
        setError((prevError) => ({ ...prevError, horaInicio: 'La hora de inicio no puede ser posterior a la hora de finalización' }));
      }else if (horaFinValue === value) {
        setError((prevError) => ({ ...prevError, horaFin: 'La hora de inicio y la hora de fin no pueden ser iguales' }));
      }else {
        setError((prevError) => ({ ...prevError, horaInicio: '' }));
      }
    }

    setTurno((prevturno) => ({
      ...prevturno,
      [name]: value
    }));
};

const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setTurno((prevTurno) => {
      if (checked) {
        return {
          ...prevTurno,
          dias: [...prevTurno.dias, value]
        };
      } else {
        return {
          ...prevTurno,
          dias: prevTurno.dias.filter((dia) => dia !== value)
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(turno);
    guardar(turno);
  };

  return (
    <div className='bigestContainerTurno'>
    <div className="formContainer">
      <h4>Crear turno</h4>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="myform-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                value={turno.nombre}
                onChange={handleChange}
            />
          {error.nombre && <div className="error">{error.nombre}</div>}
        </div>

        <div className="myform-group">
            <label htmlFor="horaInicio">Hora de inicio:</label>
            <input
            type="time"
            id="horaInicio"
            name="horaInicio"
            className = "horaInput"
            value={turno.horaInicio}
            onChange={handleChange}
            required
            />
            {error.horaInicio && <div className="error">{error.horaInicio}</div>}
        </div>

        <div className="myform-group">
            <label htmlFor="horaFin">Hora de fin:</label>
            <input
            type="time"
            id="horaFin"
            name="horaFin"
            className = "horaInput"
            value={turno.horaFin}
            onChange={handleChange}
            required
            />
            {error.horaFin && <div className="error">{error.horaFin}</div>}
        </div>

        <div>
            <label className='myLabel'>Días:</label>
            {diasOptions.map((option) => (
            <div key={option.value}>
                <input
                    type="checkbox"
                    id={option.value}
                    name="dias"
                    value={option.value}
                    checked={turno.dias.includes(option.value)}
                    onChange={handleCheckboxChange}
                />
                <label className='myLabel' htmlFor={option.value}>{option.label}</label>
            </div>
        ))}
        </div>
      <div className="boton-container">
        <button type="submit">Guardar</button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default TurnoForm