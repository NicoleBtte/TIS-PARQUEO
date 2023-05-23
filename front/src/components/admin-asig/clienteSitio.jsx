import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css'
import '../../styles/botonesStyle.css'
import '../../styles/descargarBotonStyle.css'

const ClienteSitio = () => {
    const [filas, setFilas] = useState([]);
    const [filasAdicionales, setFilasAdicionales] = useState([]);
    const [loading, setLoading] = useState(false);
    const texto = 'Sin asignar';

    useEffect(() => {
        getFilas();
        getFilasAdicionales();
      }, [])

    const getFilas = () => {
        setLoading(true)
        //setFilas(clientesSitios);
        //setLoading(false)
        
        axiosCliente.get('/consultaClienteSitio')
          .then(({ data }) => {
            console.log(data)
            setLoading(false)
            setFilas(JSON.parse(data))
          })
          .catch(() => {
            setLoading(false)
          })
    }

    const getFilasAdicionales = () => {
      setLoading(true);

      axiosCliente.get('/consultaClienteSinSitio')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setFilasAdicionales(JSON.parse(data))
      })
      .catch(() => {
        setLoading(false)
      })
    }

    return (
      <>
        <div className='titleBottonContainer'>
            <h3>Clientes</h3>
            <button className='descargarBoton'>Descargar PDF</button>
        </div>
        <Table responsive className='mytable'>
          <thead className='tableHeader'>
            <tr>
                <th>Cliente</th>
                <th>Parqueo</th>
                <th>Zona de estacionamiento</th>
                <th>Sitio</th>
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
              <tr className='misFilas' key={u.idcliente}>
                <td className='miTd'>{u.nombre_cliente}</td>
                <td className='miTd'>{u.nombre_parqueo}</td>
                <td className='miTd'>{u.nombre_zona_estacionamiento}</td>
                <td className='miTd'>{u.numero}</td>
                <td className='miTd'>
                  <Button className='naranjaBoton' as={Link} to={'/admin/asignacion/id/' + u.idcliente+'/nc/'+u.nombre_cliente+'/p/'+u.nombre_parqueo+'/z/'+u.nombre_zona_estacionamiento+'/s/'+u.numero}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
            {filasAdicionales.map(u => (
                <tr className='misFilas' key={u.idsitio}>
                  <td className='miTd'>{u.nombre_cliente}</td>
                  <td className='miTd'>Sin asignar</td>
                  <td className='miTd'>Sin asignar</td>
                  <td className='miTd'>Sin asignar</td>
                  <td className='miTd'>
                    <Button className='naranjaBoton' as={Link} to={'/admin/asignacion/id/' + u.idcliente+'/nc/'+u.nombre_cliente+'/p/'+texto+'/z/'+texto+'/s/'+texto}>
                      Editar
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          }
        </Table>
      </>
      );
}

export default ClienteSitio;