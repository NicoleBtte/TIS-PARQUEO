import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import axiosCliente from '../../axios-client';
import CardInfoTurno from './cardInfoTurno';

const AsignarTurno = () => {
  const [filas, setFilas] = useState([]);
  //const [filasAdicionales, setFilasAdicionales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { id, t } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      //getFilasAdicionales();
      getFilas();
    }, []);

    /*const getFilasAdicionales = () => {
      setLoading(true);

      axiosCliente.get('/listaTurnosDelGuardia')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setFilasAdicionales(JSON.parse(data))
      })
      .catch(() => {
        setLoading(false)
      })
    }*/

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