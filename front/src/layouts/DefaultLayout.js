import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Navigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/headerStyle.css";
import "../styles/navbarStyle.css";
import '../styles/logoutButtonStyle.css';
import App from "../App";
import "../styles/botonesStyle.css";
import { Button } from "react-bootstrap";
import PopoverSitio from "./popoverSitio";
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/miNavDrop.css'

const DefaultLayout = () => {
  const { user, token, setUser, setToken, rol, setRol, id, setID } =
    useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    let apiruta = "";
    const theRol = localStorage.getItem("ROL");

    if (theRol === "cliente") {
      apiruta = "/logout";
    } else {
      if (theRol === "admin") {
        apiruta = "/logoutadmin";
      } else {
        if (theRol === "operador") {
          apiruta = "/logoutoperador";
        } else {
          apiruta = "/logoutguardia";
        }
      }
    }

    axiosClient.post(apiruta).then(() => {
      setUser({});
      setToken(null);
      setRol(null);
      setID(null);
    });
  };

  let menu;
  switch (rol) {
    case "admin":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin/convocatoria">
            Convocatoria
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/parqueo">
            Parqueo
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/asignacion">
            Asignar sitio
          </Nav.Link>
          <NavDropdown title="Usuarios" className="navDrop">
              <NavDropdown.Item className="navDrop" as={Link} to="/admin/operadores">Operadores</NavDropdown.Item>
              <NavDropdown.Item className="navDrop" as={Link} to="/admin/guardias">Guardias</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
      break;
    case "operador":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/operador/pagos">
            Pagos
          </Nav.Link>
          <Nav.Link as={Link} to="/operador/pqr">
            Quejas y peticiones
          </Nav.Link>
        </Nav>
      );
      break;
    case "guardia":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/guardia/ingresos">
            Ingresos
          </Nav.Link>
        </Nav>
      );
      break;
    default:
      //es cliente
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/cliente/mis-pagos">
            Mis pagos
          </Nav.Link>
          <Nav.Link as={Link} to="/cliente/redactar">
            Redactar
          </Nav.Link>
          <Nav.Link as={Link} to="/cliente/mensajes">
            Mensajes
          </Nav.Link>
        </Nav>
      );
  }

  return (
    <div>
      <header>
        <div className="mi-estilo">
          <p className="theTitle">SISTEMA DE PARQUEO FCYT</p>
          <div className="logocontainer"> </div>
        </div>
      </header>

      <div>
        <Navbar collapseOnSelect className="custom-navbar" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {menu}
              <Nav>
                {rol === 'cliente' ? (
                  <PopoverSitio></PopoverSitio>
                ) : null}
                &nbsp;
                <Button href="#" onClick={onLogout} className='mylogoutButton'>Cerrar sesión</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default DefaultLayout;
