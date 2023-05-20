import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import "../styles/estilos.css";
import "../styles/tableStyle.css";
import "../styles/botonesStyle.css";
import "../styles/tablePageStyle.css";
import { Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

const pagosReportePage = () => {
  return (
    <div>
      <div className="d-flex-between my-4 p-3">
        <h1 className="tittleContainer">Reporte de pagos</h1>
        <div>
          <Link
            className="link-none-styles btn-personal py-2"
            to="/cliente/pagos-qr"
          >
            Generar reporte
          </Link>
        </div>
      </div>
      <div className="row-reporte">
        <div className="col-reporte1" id="firts">
          <div className="number">23432</div>
          <div className="text">Ingreso total</div>
        </div>
        <div className="col-reporte1" id="second">
          <div className="number">34234</div>
          <div className="text">Ingreso de las fechas seleccionadas</div>
        </div>
        <div className="col-reporte">
          <label htmlFor="fecha_de">Fecha de:</label>
          <input
            name="fecha_de"
            type="date"
            className="form-control"
            id="fecha_de"
            placeholder="Fecha de"
          ></input>
        </div>
        <div className="col-reporte">
          <label htmlFor="hasta_fecha">Hasta fecha:</label>
          <input
            name="hasta_fecha"
            type="date"
            className="form-control"
            id="hasta_fecha"
            placeholder="Fecha fin"
          ></input>
        </div>
      </div>
      <div className="tablePageContainer">
        <table className="mytable w-50">
          <thead className="tableHeader">
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr className="misFilas">
              <td className="myTd text-center"></td>
              <td className="myTd text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default pagosReportePage;
