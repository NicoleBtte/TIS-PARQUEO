import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.js";
import { Button } from "react-bootstrap";

export default function operadores() {
    const [operadores, setOperadores] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getOperadores();
    }, [])
  
    const onDelete = user => {
        if (!window.confirm("Esta seguro de eliminar este usuario?")) {
          return
        }
        axiosClient.delete(`/operadores/${user.id}`)
          .then(() => {
            getOperadores()
          })
    }
  
    const getOperadores = () => {
      setLoading(true)
      axiosClient.get('/operadores')
        .then(({ data }) => {
          setLoading(false)
          setOperadores(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div>
            <h1>Operadores</h1>
            <Button as={Link} to="/operadores/new" variant="primary">Agregar operador</Button>
            <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de creacion</th>
            <th>Acciones</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {operadores.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Button as={Link} onClick={ev => onDelete(u)} variant="danger">Eliminar</Button>
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