import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import CardInfo from './cardInfo';
import '../../styles/tablePageStyle.css'
import '../../styles/tableStyle.css'
import '../../styles/botonesStyle.css'

const SitiosDisponibles = () => {
    const [filas, setFilas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { id, nc, p, z, s } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        getFilas();
      }, [])

  
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
      let apiruta = '';
      console.log('Se asigno al usuario '+clienteID+"p: "+idsitio);
      const payload = {
        idcliente: clienteID,
        idsitio: idsitio,
      }
      if (clienteID) {
        if(p==='Sin asignar'){
          apiruta = '/asignarManual'
        }else{
          apiruta = '/reasignarSitio'
        }

        axiosCliente.post(apiruta, payload)
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

    const removeSitio = () => {
      /*if (!window.confirm("Esta seguro de remover la asigancion de sitio de este cliente?")) {
        return
      }*/
      const payload = {
        idcliente: id
      }
      axiosCliente.post('/dejarSinSitio', payload)
        .then(() => {
          getFilas();
        })
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
        <div className='tablePageContainer'>
          <div className='titleBottonContainer'>
            <h4>Sitios disponibles</h4>
            {p !== 'Sin asignar' ? (
                <Button className='rojoBoton' onClick={() => removeSitio(id)}>Dejar sin sitio</Button>
            ) : null}
            
          </div>
          <Table responsive className='mytable'>
            <thead className='tableHeader'>
              <tr>
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
                <tr className='misFilas' key={u.idsitio}>
                  <td className='miTd'>{u.nombre_parqueo}</td>
                  <td className='miTd'>{u.nombre_zona_estacionamiento}</td>
                  <td className='miTd'>{u.numero}</td>
                  <td className='miTd'>
                    <Button className='naranjaBoton' onClick={() => asignarSitio(id, u.idsitio)}>Asignar este sitio</Button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </Table>
        </div>
      </>
        
      );
}

export default SitiosDisponibles;