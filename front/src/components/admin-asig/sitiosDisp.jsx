import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import CardInfo from './cardInfo';

const SitiosDisponibles = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { id, nc, p, z, s } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        getFilas();
      }, [])

    // Arreglo de objetos con datos aleatorios
    /*const sitiosDisponibles = [
        { 
            idparqueo: 1,
            nombreparqueo: "Parqueo Planta 1",
            idzona: 3,
            nombrezona: "Zona Sur",
            idsitio: 5,
            numerositio: "Sitio A"
        },
        { 
            idparqueo: 2,
            nombreparqueo: "Parqueo Planta 2",
            idzona: 2,
            nombrezona: "Zona Centro",
            idsitio: 3,
            numerositio: "Sitio B"
        }
    ];*/
  

    const getFilas = () => {
        setLoading(true);
        /*setFilas(sitiosDisponibles);//Estatico--->cambiar
        setLoading(false);*/

        axiosCliente.get('/consultaSitios')
        .then(({ data }) => {
          console.log(data)
          setLoading(false)
          setFilas(JSON.parse(data))
        })
        .catch(() => {
          setLoading(false)
        })
    }

    const asignarSitio = (clienteID, idsitio) => {
      console.log('Se asigno al usuario '+clienteID+"p: "+idsitio);
      const payload = {
        idcliente: clienteID,
        idsitio: idsitio,
      }
      if (clienteID) {
        axiosCliente.post(`/reasignarSitio`, payload)
          .then(() => {
              console.log('Se ha editado el usuario')
              navigate('/admin/asignacion')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
      navigate('/admin/asignacion');
    }

    const removeSitio = (clienteID) => {
      console.log('Se removio el sitio del cliente');
      /*
      if (!window.confirm("Esta seguro de remover la asigancion de sitio de este cliente?")) {
        return
      }
      axiosCliente.put(`//${clienteID}`)
        .then(() => {
          getFilas();
        })*/
      navigate('/admin/asignacion')
    }

    return (
      <>
        <CardInfo
          cliente = {nc}
          parqueo = {p}
          zona = {z}
          sitio = {s}
        />
        <h4>Sitios disponibles</h4>
        <Button onClick={() => removeSitio(id)} variant="warning">Dejar sin sitio</Button>
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
              <tr key={u.idsitio}>
                <td>{u.nombre_parqueo}</td>
                <td>{u.nombre_zona_estacionamiento}</td>
                <td>{u.numero}</td>
                <td>
                  <Button onClick={() => asignarSitio(id, u.idsitio)} variant="warning">Asignar este sitio</Button>
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