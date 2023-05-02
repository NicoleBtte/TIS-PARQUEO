import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';

const ClienteSitio = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFilas();
      }, [])

    // Arreglo de objetos con datos aleatorios
    const clientesSitios = [
        { 
            idcliente: 1,
            nombrecliente: "Juan Pérez",
            idparqueo: 1,
            nombreparqueo: "Parqueo Planta 1",
            idzona: 3,
            nombrezona: "Zona Sur",
            idsitio: 5,
            nombresitio: "Sitio A"
        },
        { 
            idcliente: 2,
            nombrecliente: "María González",
            idparqueo: 2,
            nombreparqueo: "Parqueo Planta 2",
            idzona: 2,
            nombrezona: "Zona Centro",
            idsitio: 3,
            nombresitio: "Sitio B"
        },
        { 
            idcliente: 3,
            nombrecliente: "Pedro García",
            idparqueo: 3,
            nombreparqueo: "Parqueo Planta 3",
            idzona: 1,
            nombrezona: "Zona Norte",
            idsitio: 2,
            nombresitio: "Sitio C"
        },
        { 
            idcliente: 4,
            nombrecliente: "Luisa Martínez",
            idparqueo: 4,
            nombreparqueo: "Parqueo Planta 4",
            idzona: 3,
            nombrezona: "Zona Sur",
            idsitio: 4,
            nombresitio: "Sitio D"
        },
        { 
            idcliente: 5,
            nombrecliente: "Sofía Ramírez",
            idparqueo: 5,
            nombreparqueo: "Parqueo Planta 5",
            idzona: 2,
            nombrezona: "Zona Centro",
            idsitio: 1,
            nombresitio: "Sitio E"
        }
    ];
  

    const getFilas = () => {
        setLoading(true)
        setFilas(clientesSitios);
        setLoading(false)
        
        /*setLoading(true)
        axiosCliente.get('/clientesitios')
          .then(({ data }) => {
            setLoading(false)
            setFilas(data.data)
          })
          .catch(() => {
            setLoading(false)
          })*/
    }

    return (
        <Table responsive>
          <thead>
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
            <tr>
              <td colSpan="5">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {filas.map(u => (
              <tr key={u.idcliente}>
                <td>{u.nombrecliente}</td>
                <td>{u.nombreparqueo}</td>
                <td>{u.nombrezona}</td>
                <td>{u.nombresitio}</td>
                <td>
                  <Button as={Link}  to={'/admin/asignacion/id/' + u.idcliente+'/nc/'+u.nombrecliente+'/p/'+u.nombreparqueo+'/z/'+u.nombrezona+'/s/'+u.nombresitio} variant="warning">Editar</Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </Table>
      );
}

export default ClienteSitio;