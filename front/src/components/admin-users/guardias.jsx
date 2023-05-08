import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { Button } from "react-bootstrap";
import axiosCliente from '../../axios-client.js';
import '../../styles/tablePageStyle.css'
import '../../styles/tableStyle.css'
import './theStyles/botonesUsersStyle.css'

const Guardias = () => {
    const [guardias, setGuardias] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      getGuardias();
    }, [])

    const getGuardias = () => {
      setLoading(true)
      axiosCliente.get('/guardias')
        .then(({ data }) => {
          setLoading(false)
          setGuardias(data)
        })
        .catch(() => {
          setLoading(false)
        })
      console.log('Esto es guardias',guardias)
    }

    const onDelete = user => {
        const payload = {
          "id": user.idguardia
        }
        if (!window.confirm("Esta seguro de eliminar este usuario?")) {
          return
        }
        axiosCliente.delete('/deleteGuardia',{ params: payload })
          .then(() => {
            getGuardias()
          })
    }
  
    return (
      <div>
          <div className='tablePageContainer'>
            <div className='titleBottonContainer'>
              <h3>Guardias</h3>
              <Button as={Link} to="/admin/guardias/new" className="azulBotonU">Agregar guardia</Button>
            </div>
            <div className="card animated fadeInDown">
              <table className='mytable'>
                <thead className='tableHeader'>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Telefono</th>
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
                  {guardias.map(u => (
                    <tr className='misFilas' key={u.idguardia}>
                      <td className='miTd'>{u.idguardia}</td>
                      <td className='miTd'>{u.nombre_guardia}</td>
                      <td className='miTd'>{u.telefono_guardia}</td>
                      <td className='miTd'>
                        <Button as={Link} onClick={ev => onDelete(u)} className="rojoBotonU">Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                }
              </table>
          </div>
          </div>
      </div>
    )
  }

export default Guardias;