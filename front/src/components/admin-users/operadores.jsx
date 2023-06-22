import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { Button } from "react-bootstrap";
import axiosCliente from '../../axios-client.js';
import '../../styles/tablePageStyle.css'
import '../../styles/tableStyle.css'
import './theStyles/botonesUsersStyle.css'

const Operadores = () => {
    const [operadores, setOperadores] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      getOperadores();
    }, [])

    const getOperadores = () => {
      setLoading(true)
      axiosCliente.get('/operadores')
        .then(({ data }) => {
          setLoading(false)
          setOperadores(data)
        })
        .catch(() => {
          setLoading(false)
        })
      console.log('Esto es operadores',operadores)
    }

    const onDelete = user => {
        const payload = {
          "id": user.idoperador
        }
        if (!window.confirm("Esta seguro de eliminar este usuario?")) {
          return
        }
        axiosCliente.delete('/deleteOperador',{ params: payload })
          .then(() => {
            getOperadores()
          })
    }
  
    return (
      <div>
          <div className='tablePageContainer'>
            <div className='titleBottonContainer'>
              <h3>Operadores</h3>
              <Button as={Link} to="/admin/operadores/new" className="azulBotonU">Agregar operador</Button>
            </div>
            <div className="card animated fadeInDown">
              <table className='mytable'>
                <thead className='tableHeader'>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Parqueo</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                {loading &&
                  <tbody>
                  <tr className='misFilas'>
                    <td colSpan="5">
                      Cargando...
                    </td>
                  </tr>
                  </tbody>
                }
                {!loading &&
                  <tbody>
                  {operadores.map(u => (
                    <tr className='misFilas' key={u.idoperador}>
                      <td className='miTd'>{u.idoperador}</td>
                      <td className='miTd'>{u.nombre_operador}</td>
                      <td className='miTd'>{u.email_operador}</td>
                      <td className='miTd'>{u.telf_operador}</td>
                      <td className='miTd'>
                        {u.nombre_parqueo !== null ? u.nombre_parqueo : 'Sin asignar'}
                      </td>
                      <td className='miTd'>
                        <Button as={Link} to={"/admin/editOp/id/"+u.idoperador+"/p/"+u.parqueo_idparqueo}className='naranjaBotonU'> Editar </Button>
                        &nbsp;
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

export default Operadores;