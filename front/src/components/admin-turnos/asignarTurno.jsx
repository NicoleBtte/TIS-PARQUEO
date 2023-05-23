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
      getFilas();
    }, []);

  const getFilas = () => {
      setLoading(true);
      axiosCliente.get('/listaTurnosTodos')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setFilas(JSON.parse(data))
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const verificarTurno = (guardiaID, idturno) => {
    const payload = {
      idguardia: guardiaID,
      idturno: idturno,
    }

    axiosCliente.get('/verificarTurno', {params:payload})
      .then((data) => {
        if(!JSON.parse(data)==='Fue asignado exitosamente'){
          return window.confirm("ERROR")
        }else{
          navigate('/admin/guardiasTurnos');
        }
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
    
    navigate('/admin/guardiasTurnos');

  }

    const removeTurno = (idt) => {
        /*if (!window.confirm("Esta seguro de remover la asigancion de sitio de este cliente?")) {
          return
        }*/
        const payload = {
          idguardia: id,
          idturno: idt
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
          {loading &&
            <tbody>
            <tr className='misFilas'>
              <td colSpan="5">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading && (
            <tbody>
            {filas.map((turno) => {
              let boton;
                const idsturno = t.split(',');
                const seEncuentra = idsturno.includes(turno.idturno.toString());
                if (seEncuentra) {
                  boton = (
                    <Button className='quitarBotonTurno' onClick={() => removeTurno(turno.idturno)}>
                      Quitar este turno
                    </Button>
                  );
                } else {
                  boton = (
                    <Button className='naranjaBoton' onClick={() => verificarTurno(id, turno.idturno)}>
                      Asignar este turno
                    </Button>
                  );
                }

              return (
                <tr className='misFilas' key={turno.idturno}>
                  <td className='miTd'>{turno.nombre_turno}</td>
                  <td className='miTd'>{turno.hora_inicio_turno}</td>
                  <td className='miTd'>{turno.hora_fin_turno}</td>
                  <td className='miTd'>{turno.dia_turno}</td>
                  <td className='miTd'>{boton}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
      </div>
  </>
)
}

export default AsignarTurno