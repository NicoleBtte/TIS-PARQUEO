import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import axiosCliente from '../../axios-client';
import CardInfoTurno from './cardInfoTurno';

const AsignarTurno = () => {
  const [filas, setFilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { id, t, hi, hf, d } = useParams();
  const navigate = useNavigate();

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
      //setFilas(turnos);
      //setLoading(false);
      axiosCliente.get('/listaTurnosSinGuardia')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setFilas(JSON.parse(data))
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const asignarTurno = (guardiaID, idturno) => {
      let apiruta = '/asignarTurno';
      console.log('Se asigno al usuario '+guardiaID+"p: "+idturno);
      const payload = {
        idguardia: guardiaID,
        idturno: idturno,
      }

      axiosCliente.post(apiruta, payload)
        .then(() => {
            console.log('Se ha editado el usuario')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
      
      navigate('/admin/guardiasTurnos');
    }

    const removeTurno = () => {
        /*if (!window.confirm("Esta seguro de remover la asigancion de sitio de este cliente?")) {
          return
        }*/
        const payload = {
          idguardia: id
        }
        axiosCliente.post('/dejarSinTurno', payload)
          .then(() => {
            console.log("Se dejo sin turno al guardia")
          })
        navigate('/admin/guardiasTurnos')
      }
    
  

return (
  <>
    <CardInfoTurno
        turno = {t}
        inicio = {hi}
        fin = {hf}
        dias = {d}
    />    
    <div className='tablePageContainer'>
        <div className='titleBottonContainer'>
            <h4>Horarios disponibles</h4>
            {t !== 'Sin asignar' ? (
                <Button className='rojoBoton' onClick={() => removeTurno(id)}>Dejar sin turnos</Button>
            ) : null}
            
        </div>    
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
                    <Button className='naranjaBoton' onClick={() => asignarTurno(id, turno.idturno)}>Asignar este turno</Button>
                  </td>
                  </tr>
              ))}
              </tbody>
          )}
      </Table>
      </div>
  </>
)
}

export default AsignarTurno