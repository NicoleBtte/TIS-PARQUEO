import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import CardInfo from './cardInfo';

const SitiosDisponibles = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id, nc, p, z, s } = useParams();
    const navigate = useNavigate();
    
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
    ];
  

    const getFilas = () => {
        setLoading(true);
        setFilas(sitiosDisponibles);//Estatico--->cambiar
        setLoading(false);

        /*axiosCliente.get('/sitios disponibles')
        .then(({ data }) => {
          setLoading(false)
          setFilas(data.data)
        })
        .catch(() => {
          setLoading(false)
        })*/
    }

    const asignarSitio = (clienteID, nombreparqueo, nombrezona, numerositio) => {
      console.log('Se asigno al usuario '+clienteID+"p: "+nombreparqueo+"z: "+nombrezona+"s: "+numerositio);
      /*if (clienteID) {
        axiosCliente.put(`/users/${user.id}`, user)
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
      }*/
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
              <tr key={u.idparqueo}>
                <td>{u.nombreparqueo}</td>
                <td>{u.nombrezona}</td>
                <td>{u.numerositio}</td>
                <td>
                  <Button onClick={() => asignarSitio(id, u.nombreparqueo, u.nombrezona, u.numerositio)} variant="warning">Asignar este sitio</Button>
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