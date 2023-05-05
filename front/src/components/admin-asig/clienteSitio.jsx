import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css'
import '../../styles/botonesStyle.css'

const ClienteSitio = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFilas();
      }, [])


      const clientesSitios = [
        { 
            idcliente: 1,
            nombre_cliente: "Juan Pérez",
            idparqueo: 1,
            nombre_parqueo: "Parqueo Planta 1",
            idzona: 3,
            nombre_zona_estacionamiento: "Zona Sur",
            idsitio: 5,
            numero: "Sitio A"
        },
        { 
            idcliente: 2,
            nombre_cliente: "María González",
            idparqueo: 2,
            nombre_parqueo: "Parqueo Planta 2",
            idzona: 2,
            nombre_zona_estacionamiento: "Zona Centro",
            idsitio: 3,
            numero: "Sitio B"
        },
        { 
            idcliente: 3,
            nombre_cliente: "Pedro García",
            idparqueo: 3,
            nombre_parqueo: "Parqueo Planta 3",
            idzona: 1,
            nombre_zona_estacionamiento: "Zona Norte",
            idsitio: 2,
            numero: "Sitio C"
        },
        { 
            idcliente: 4,
            nombre_cliente: "Luisa Martínez",
            idparqueo: 4,
            nombre_parqueo: "Parqueo Planta 4",
            idzona: 3,
            nombre_zona_estacionamiento: "Zona Sur",
            idsitio: 4,
            numero: "Sitio D"
        },
        { 
            idcliente: 5,
            nombre_cliente: "Sofía Ramírez",
            idparqueo: 5,
            nombre_parqueo: "Parqueo Planta 5",
            idzona: 2,
            nombre_zona_estacionamiento: "Zona Centro",
            idsitio: 1,
            numero: "Sitio E"
        }
    ];

    const getFilas = () => {
        setLoading(true)
        //setFilas(clientesSitios);
        //setLoading(false)
        
        setLoading(true)
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

    return (
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
            </tbody>
          }
        </Table>
      );
}

export default ClienteSitio;