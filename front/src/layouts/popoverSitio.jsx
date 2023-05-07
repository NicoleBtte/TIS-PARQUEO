import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axiosCliente from '../axios-client';

const PopoverSitio = () => {
    const [miParqueo, setMiParqueo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getInfo();
      }, [])



    const getInfo = () => {
        setLoading(true)
        const payload = {
            "idCliente": localStorage.getItem('ID_USER')
        }
        axiosCliente.get('/miSitio', { params: payload })
            .then(({ data }) => {
                console.log('El data de mi sitio es',data)
                setMiParqueo(JSON.parse(data))
                setLoading(false)
            })
            .catch((errors) => {
                setLoading(false)
            })
    }

  return (
    <>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id="popoverMisitio">
              <Popover.Header as="h3">Mi sitio</Popover.Header>
              <Popover.Body>
                {loading &&
                    <p>Cargando...</p>
                }
                {!loading &&
                    <>
                    <p>Parqueo: {miParqueo[0].nombre_parqueo}</p>
                    <p>Zona: {miParqueo[0].nombre_zona_estacionamiento}</p>
                    <p>Numero de sitio: {miParqueo[0].numero}</p>
                    </>
                }
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Mi sitio</Button>
        </OverlayTrigger>
    </>
  );
}

export default PopoverSitio;