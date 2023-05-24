import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import App from '../../App';
import axiosCliente from '../../axios-client';
import '../../styles/tableStyle.css'
import '../../styles/botonesStyle.css'
import '../../styles/descargarBotonStyle.css'
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const generarPDF = () => {
      const doc = new jsPDF();
      
      // Agregar el título al documento
      doc.setFontSize(18);
      doc.text("Clientes y sitios asignados", 10, 20);
    
      // Agregar los datos de la tabla a una matriz
      const dataTabla = filas.map((registro) => [registro.nombre_cliente, registro.nombre_parqueo, registro.nombre_zona_estacionamiento, registro.numero]);
      filasAdicionales.forEach(registro => {
        dataTabla.push([
          registro.nombre_cliente,
          texto,
          texto,
          texto
        ]);
      });
      // Agregar la tabla al documento
      doc.autoTable({
        head: [["Cliente", "Parqueo", "Zona de estacionamiento", "Sitio"]],
        body: dataTabla,
        startY: 30,
      });

      // Guardar el documento como un archivo PDF
      doc.save("Clientes-Sitios.pdf");
    };

    return (
      <>
        <div className='containerDescargarBoton'>
            <button className='descargarBoton' onClick={generarPDF}>Descargar PDF</button>
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
                Cargando...
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