import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axiosCliente from '../../axios-client';

const GuardiasTable = () => {
    const [filas, setFilas] = useState([]);
    const [filasxGrupo, setGrupos] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [filasAdicionales, setFilasAdicionales] = useState([]);
    const asignadoFlag = 'Asignado';
    const texto = 'Sin asignar';

    useEffect(() => {
        getFilas();
        //getFilasAdicionales();
      }, [])

      useEffect(() => {
        if (filas.length > 0) {
          getGrupos();
        }
        console.log("misfilasxgrupo",filasxGrupo)
      }, [filas])
    
    const getFilas = () => {
        setLoading(true);
        //setFilas(guardiasTurnos);
        //setLoading(false);
        axiosCliente.get('/listaGuardiasconturno')
          .then(({ data }) => {
            //console.log(data)
            setLoading(false)
            setFilas(JSON.parse(data))
          })
          .catch(() => {
            setLoading(false)
          })
    }

    const getGrupos = () => {
      const grupos = filas.reduce((result, elemento) => {
        const { idguardia, nombre_guardia, idturno, ...datos } = elemento;
        if (!result[idguardia]) {
          result[idguardia] = { nombre_guardia, datos: [], idsturno: [] };
        }
        result[idguardia].datos.push(datos);
        result[idguardia].idsturno.push(idturno); // Agregar idturno al arreglo idsturno
        return result;
      }, {});
      setGrupos(grupos);
      console.log("f",filasxGrupo);
    }    

    /*const getGrupos = () => {
      const grupos = filas.reduce((result, elemento) => {
        const { idguardia, nombre_guardia, ...datos } = elemento;
        if (!result[idguardia]) {
          result[idguardia] = { nombre_guardia, datos: [] };
        }
        result[idguardia].datos.push(datos);
        return result;
      }, {});
      setGrupos(grupos);
    }*/

    /*const getFilasAdicionales = () => {
      setLoading(true);
      //setFilas(guardiasTurnos);
      //setLoading(false);
      axiosCliente.get('/listaGuardiassinturno')
        .then(({ data }) => {
          //console.log(data)
          setLoading(false)
          setFilasAdicionales(JSON.parse(data))
        })
        .catch(() => {
          setLoading(false)
        })
    }*/

    
    return (
        <Table responsive className='mytable'>
        <thead className='tableHeader'>
          <tr>
              <th>Nombre</th>
              <th>Turnos</th>
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
          {Object.keys(filasxGrupo).map((idguardia) => {
            const grupo = filasxGrupo[idguardia];
            console.log("el grupito", grupo)
            const tieneIdTurnoNull = grupo.idsturno[0] === null;
            return (
              <tr className='misFilas' key={idguardia}>
                <td className='miTd'>{grupo.nombre_guardia}</td>
                <td className='miTd'>
                {grupo.datos.map((dato, index) => {
                  if (dato.nombre_turno) {
                    return (
                      <div key={index}>{dato.nombre_turno+": "+dato.dia_turno+" de "+dato.hora_inicio_turno.slice(0, 5)+" a "+dato.hora_fin_turno.slice(0, 5)}</div>
                    );
                  } else {
                    return (
                      <p>{texto}</p>
                    );
                  }
                })}
                </td>
                {tieneIdTurnoNull ? (
                <td className='miTd'>
                    <Button
                      className='naranjaBoton'
                      as={Link}
                      to={`/admin/asigTurno/id/${idguardia}/t/${texto}`}
                    >
                      Editar
                    </Button>
                  </td>                  
                ) : (
                  <td className='miTd'>
                    <Button
                      className='naranjaBoton'
                      as={Link}
                      to={`/admin/asigTurno/id/${idguardia}/t/${grupo.idsturno.join(",")}`}
                    >
                      Editar
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
          </tbody>
        }
      </Table>
    )
}
//to={`/admin/asigTurno/id/${idguardia}/t/${grupo.nombre_turno}/hi/${grupo.hora_inicio_turno}/hf/${grupo.hora_fin_turno}/d/${grupo.dia_turno}`}
/*
{filasAdicionales.map(u => (
            <tr className='misFilas' key={u.idguardia}>
              <td className='miTd'>{u.nombre_guardia}</td>
              <td className='miTd'>{texto}</td>
              <td className='miTd'>
                <Button className='naranjaBoton' as={Link} to={'/admin/asigTurno/id/'+u.idguardia+'/t/'+texto}>
                  Editar
                </Button>
              </td>
              </tr>
            ))}
*/

export default GuardiasTable