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

const Vehiculos = () => {
    const [filas, setFilas] = useState([]);
    const [filasAdicionales, setFilasAdicionales] = useState([]);
    const [loading, setLoading] = useState(false);
    const texto = 'Sin asignar';

    useEffect(() => {
        getFilas();
      }, [])

    const getFilas = () => {
        setLoading(true)
        axiosCliente.get('/infoClientes')
          .then(({ data }) => {
            console.log(data)
            setLoading(false)
            setFilas(JSON.parse(data))
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
      const dataTabla = filas.map((registro) => [registro.nombre_cliente + " "+ registro.apellidos_cliente, registro.placa_auto,registro.nombre_parqueo, registro.nombre_zona_estacionamiento, registro.numero]);
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
        head: [["Cliente", "Placa","Parqueo", "Zona de estacionamiento", "Sitio"]],
        body: dataTabla,
        startY: 30,
      });

      // Guardar el documento como un archivo PDF
      doc.save("Clientes-Sitios.pdf");
    };

    return (
      <>
        <div className='tablePageContainer'>
            <div className='titleBottonContainer'>
                <h4>Clientes: Vehículos y Estacionamiento</h4>
            </div>
            <div className='containerDescargarBoton'>
                <button className='descargarBoton' onClick={generarPDF}>Descargar PDF</button>
            </div>
            <Table responsive className='mytable'>
            <thead className='tableHeader'>
                <tr>
                    <th>Cliente</th>
                    <th>Placa del vehículo</th>
                    <th>Parqueo</th>
                    <th>Zona de estacionamiento</th>
                    <th>Sitio</th>
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
                    <td className='miTd'>{u.nombre_cliente+" "+u.apellidos_cliente}</td>
                    <td className='miTd'>{u.placa_auto}</td>
                    <td className='miTd'>{u.nombre_parqueo}</td>
                    <td className='miTd'>{u.nombre_zona_estacionamiento}</td>
                    <td className='miTd'>{u.numero}</td>
                </tr>
                ))}
                {filasAdicionales.map(u => (
                    <tr className='misFilas' key={u.idsitio}>
                    <td className='miTd'>{u.nombre_cliente+" "+u.apellidos_cliente}</td>
                    <td className='miTd'>{u.placa_auto}</td>
                    <td className='miTd'>Sin asignar</td>
                    <td className='miTd'>Sin asignar</td>
                    <td className='miTd'>Sin asignar</td>
                    </tr>
                ))}
                </tbody>
            }
            </Table>
        </div>

      </>
      );
}

export default Vehiculos;