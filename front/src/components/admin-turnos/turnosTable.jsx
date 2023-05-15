import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link} from "react-router-dom";

const TurnosTable = () => {
    const [filas, setFilas] = useState([]);
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
        {
            "idturno": 2,
            "nombre_turno": "Turno 2",
            "hora_inicio_turno": "7:57",
            "hora_fin_turno": "12:50",
            "dia_turno": "six-three-ten-five-one-four-nine"
        },
        {
            "idturno": 3,
            "nombre_turno": "Turno 3",
            "hora_inicio_turno": "1:21",
            "hora_fin_turno": "20:00",
            "dia_turno": "seven-five-six-two-one-three-four"
        },
        {
            "idturno": 4,
            "nombre_turno": "Turno 4",
            "hora_inicio_turno": "13:03",
            "hora_fin_turno": "23:25",
            "dia_turno": "six-three-eight-one-five-two-four"
        },
        {
            "idturno": 5,
            "nombre_turno": "Turno 5",
            "hora_inicio_turno": "13:57",
            "hora_fin_turno": "10:22",
            "dia_turno": "ten-five-one-eight-four-nine-seven"
        }
    ];

    const getFilas = () => {
        setLoading(true);
        setFilas(turnos);
        setLoading(false);
    }

    const onDelete = turno => {
        console.log('Se borro el turno', turno.idturno)
        /*const payload = {
          "idturno": turno.idturno
        }
        if (!window.confirm("Esta seguro de eliminar este turno?")) {
          return
        }
        axiosCliente.delete('/deleteTurno',{ params: payload })
          .then(() => {
            getFilas()
          })*/
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
                        <Button as={Link} to="/admin/turnoEdit" className='celesteBoton'> Editar </Button>
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