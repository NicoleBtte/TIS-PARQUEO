import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';

const SitiosDisponibles = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getFilas();
      }, [])

    // Arreglo de objetos con datos aleatorios
    const sitiosDisponibles = [
        { 
            idparqueo: 1,
            nombreparqueo: "Parqueo Planta 1",
            idzona: 3,
            nombrezona: "Zona Sur",
            idsitio: 5,
            nombresitio: "Sitio A"
        },
        { 
            idparqueo: 2,
            nombreparqueo: "Parqueo Planta 2",
            idzona: 2,
            nombrezona: "Zona Centro",
            idsitio: 3,
            nombresitio: "Sitio B"
        },
        { 
            idparqueo: 3,
            nombreparqueo: "Parqueo Planta 3",
            idzona: 1,
            nombrezona: "Zona Norte",
            idsitio: 2,
            nombresitio: "Sitio C"
        },
        { 
            idparqueo: 4,
            nombreparqueo: "Parqueo Planta 4",
            idzona: 3,
            nombrezona: "Zona Sur",
            idsitio: 4,
            nombresitio: "Sitio D"
        },
        { 
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
        setFilas(sitiosDisponibles
    );
        setLoading(false)
    }

    return (
      <>
        <Button variant="warning">Dejar sin sitio</Button>
        <Table responsive>
          <thead>
            <tr>
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
              <tr key={u.idparqueo}>
                <td>{u.nombreparqueo}</td>
                <td>{u.nombrezona}</td>
                <td>{u.nombresitio}</td>
                <td>
                  <Button variant="warning">Asignar este sitio</Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </Table>
      </>
        
      );
}

export default SitiosDisponibles;