import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axiosCliente from '../../axios-client';

const GuardiasTable = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filasAdicionales, setFilasAdicionales] = useState([]);
    const texto = 'Sin asignar';

    useEffect(() => {
        getFilas();
        getFilasAdicionales();
      }, [])

    const getFilas = () => {
        setLoading(true);
        //setFilas(guardiasTurnos);
        //setLoading(false);
        axiosCliente.get('/listaGuardiasconturno')
          .then(({ data }) => {
            console.log(data)
            setLoading(false)
            setFilas(JSON.parse(data))
          })
          .catch(() => {
            setLoading(false)
          })
    }

    const getFilasAdicionales = () => {
      setLoading(true);
      //setFilas(guardiasTurnos);
      //setLoading(false);
      axiosCliente.get('/listaGuardiassinturno')
        .then(({ data }) => {
          console.log(data)
          setLoading(false)
          setFilasAdicionales(JSON.parse(data))
        })
        .catch(() => {
          setLoading(false)
        })
    }

    
    return (
        <Table responsive className='mytable'>
        <thead className='tableHeader'>
          <tr>
              <th>Nombre</th>
              <th>Turnos</th>
              <th>Acciones</th>
          </tr>
        </thead>
        {loading &&
          <tbody>
          <tr className='misFilas'>
            <td colSpan="5">
              Loading...
            </td>
          </tr>
          </tbody>
        }
        {!loading &&
          <tbody>
          {filas.map(u => (
            <tr className='misFilas' key={u.idguardia}>
              <td className='miTd'>{u.nombre_guardia}</td>
              <td className='miTd'>{u.nombre_turno+" "+u.dia_turno+" "+u.hora_inicio_turno+" "+u.hora_fin_turno}</td>
              <td className='miTd'>
                <Button className='naranjaBoton' as={Link} to={'/admin/asigTurno/id/'+u.idguardia+'/t/'+u.nombre_turno+'/hi/'+u.hora_inicio_turno+'/hf/'+u.hora_fin_turno+'/d/'+u.dia_turno}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
          {filasAdicionales.map(u => (
            <tr className='misFilas' key={u.idguardia}>
              <td className='miTd'>{u.nombre_guardia}</td>
              <td className='miTd'>{texto}</td>
              <td className='miTd'>
                <Button className='naranjaBoton' as={Link} to={'/admin/asigTurno/id/'+u.idguardia+'/t/'+texto+'/hi/'+texto+'/hf/'+texto+'/d/'+texto}>
                  Editar
                </Button>
              </td>
              </tr>
            ))}
          </tbody>
        }
      </Table>
    )
}

export default GuardiasTable