import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link} from "react-router-dom";
import axiosCliente from '../../axios-client';

const TurnosTable = () => {
    const [filas, setFilas] = useState([]);
    const [filasAdicionales, setFilasAdicionales] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFilas();
      }, []);

    const turnos = [
        {
            "idturno": 1,
            "nombre_turno": "Turno 1",
            "hora_inicio_turno": "15:27",
            "hora_fin_turno": "5:17",
            "dia_turno": "eight-four-five-one-nine-six-ten"
        },
    ];

    const getFilas = () => {
        setLoading(true);
        axiosCliente.get('/listaTurnosTodos')
        .then(({ data }) => {
          console.log(data)
          setFilas(JSON.parse(data))
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })

    }

    const onDelete = turno => {
        console.log('Se borro el turno', turno.idturno)
        const payload = {
          "idturno": turno.idturno
        }
        if (!window.confirm("Esta seguro de eliminar este turno?")) {
          return
        }
        axiosCliente.delete('/eliminarTurno',{ params: payload })
          .then(() => {
            getFilas()
          })
    }

  return (
    <>
        <Table responsive className='mytable'>
            <thead className='tableHeader'>
                <tr>
                <th>Turno</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Dias</th>
                <th>Acciones</th>
                </tr>
            </thead>
            {loading && (
                <tbody>
                <tr className='misFilas'>
                    <td colSpan="5">Cargando...</td>
                </tr>
                </tbody>
            )}
            {!loading && (
                <tbody>
                {filas.map((turno) => (
                    <tr className='misFilas' key={turno.idturno}>
                    <td className='miTd'>{turno.nombre_turno}</td>
                    <td className='miTd'>{turno.hora_inicio_turno}</td>
                    <td className='miTd'>{turno.hora_fin_turno}</td>
                    <td className='miTd'>{turno.dia_turno}</td>
                    <td className='miTd'>
                        <Button as={Link} to={"/admin/turnoEdit/id/"+turno.idturno+'/t/'+turno.nombre_turno+'/hi/'+turno.hora_inicio_turno+'/hf/'+turno.hora_fin_turno+'/d/'+turno.dia_turno}className='celesteBoton'> Editar </Button>
                        <Button onClick={ev => onDelete(turno)} className="rojoBotonU">Eliminar</Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            )}
        </Table>
    </>
  )
}

export default TurnosTable