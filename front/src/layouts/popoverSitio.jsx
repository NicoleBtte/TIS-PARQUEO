import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import axiosCliente from '../axios-client';

const PopoverSitio = () => {
    const [miParqueo, setMiParqueo] = useState([{ "nombre_parqueo": "Sin asignar", "nombre_zona_estacionamiento": "Sin asignar", "numero": "Sin asignar" }]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado

    useEffect(() => {
        getInfo();
        console.log('mi p', miParqueo);
    }, []);

    const getInfo = () => {
      setLoading(true);
      const payload = {
        "idCliente": localStorage.getItem('ID_USER')
      };
      axiosCliente.get('/miSitio', { params: payload })
        .then(({ data }) => {
          console.log('Respuesta recibida:', data);
          if (data.message && data.message === 'el El arreglo esta vacio') {
            console.log('no tiene sitio');
          }else{
            console.log('El data de mi sitio es', data);
            setMiParqueo(JSON.parse(data));
            //setMiParqueo(data);
          }
          setLoading(false);
          setDataLoaded(true); // Marcar como datos recibidos
        })
        .catch((errors) => {
          console.log('Error:', errors);
          setLoading(false);
          setDataLoaded(true); // Marcar como datos recibidos incluso en caso de error
        });
    };    

    useEffect(() => {
        console.log('mi p actualizado', miParqueo);
    }, [miParqueo]);

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
                            {loading || !dataLoaded ? ( // Comprobar si los datos están cargando o aún no se han recibido
                                <p>Cargando...</p>
                            ) : (
                                <>
                                    <p>Parqueo: {miParqueo[0].nombre_parqueo}</p>
                                    <p>Zona: {miParqueo[0].nombre_zona_estacionamiento}</p>
                                    <p>Numero de sitio: {miParqueo[0].numero}</p>
                                </>
                            )}
                        </Popover.Body>
                    </Popover>
                }
            >
                <Button variant="secondary">Mi sitio</Button>
            </OverlayTrigger>
        </>
    );
};

export default PopoverSitio;

