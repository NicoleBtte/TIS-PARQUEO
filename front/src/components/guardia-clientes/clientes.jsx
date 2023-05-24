import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';

const Clientes = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        getFilas();
      }, [])

  
    const getFilas = () => {
        setLoading(true);
        axiosCliente
        .get("/consultaEstadoClientes")
        .then((response) => {
          let result = response.data;
          result = JSON.parse(result);
          console.log(result);
          setFilas(result);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
        setLoading(false);
    }


    return (
      <>
        <div className='tablePageContainer'>
          <div className='titleBottonContainer'>
            <h4>Clientes</h4>
          </div>
          <Table responsive className='mytable'>
            <thead className='tableHeader'>
              <tr>
                  <th>CI</th>
                  <th>Cliente</th>
                  <th>Telefono</th>
                  <th>Email</th>
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
              {filas.map(u => (
                <tr className='misFilas' key={u.idcliente}>
                  <td className='miTd'>{u.idcliente}</td>
                  <td className='miTd'>{u.nombre_cliente}</td>
                  <td className='miTd'>{u.telf_cliente}</td>
                  <td className='miTd'>{u.email_cliente}</td>
                </tr>
              ))}
              </tbody>
            }
          </Table>
        </div>
      </>
        
      );
}

export default Clientes;