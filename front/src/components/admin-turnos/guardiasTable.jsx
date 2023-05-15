import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axiosCliente from '../../axios-client';

const GuardiasTable = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFilas();
      }, [])

    const guardiasTurnos = [
          {
            "id": 1,
            "nombre": "Juan Pérez",
            "turno": "mañana"
          },
          {
            "id": 2,
            "nombre": "María López",
            "turno": "tarde"
          },
          {
            "id": 3,
            "nombre": "Carlos García",
            "turno": "noche"
          }
        ]
      

    const getFilas = () => {
        setLoading(true);
        setFilas(guardiasTurnos);
        setLoading(false);

        /*
        axiosCliente.get('/consultaClienteSitio')
          .then(({ data }) => {
            console.log(data)
            setLoading(false)
            setFilas(JSON.parse(data))
          })
          .catch(() => {
            setLoading(false)
          })*/
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
            <tr className='misFilas' key={u.id}>
              <td className='miTd'>{u.nombre}</td>
              <td className='miTd'>{u.turno}</td>
              <td className='miTd'>
                <Button className='naranjaBoton' as={Link} to={'/admin/asigTurno'}>
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