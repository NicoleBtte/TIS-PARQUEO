import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from "../axios-client.js";
import { Navigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/headerStyle.css';
import '../styles/navbarStyle.css';
import App from '../App';

const DefaultLayout = () => {
  const {user, token, setUser, setToken, rol, setRol} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        setRol(null)
      })
  }

  let menu;
  switch (rol) {
    case "admin":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin/convocatoria">Convocatoria</Nav.Link>
          <Nav.Link as={Link} to="/admin/parqueo">Parqueo</Nav.Link>
          <Nav.Link as={Link} to="/admin/asignacion">Asignar sitio</Nav.Link>
        </Nav>
      );
      break;
    case "operador":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/operador/pagos">Pagos</Nav.Link>
          <Nav.Link as={Link} to="/operador/pqr">GestionPQR</Nav.Link>
        </Nav>
      );
      break;
    case "guardia":
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/guardia/ingresos">Ingresos</Nav.Link>
        </Nav>
      );
      break;
    default:
      //es cliente
      menu = (
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/cliente/misitio">Mi sitio</Nav.Link>
          <Nav.Link as={Link} to="/cliente/redactar">Redactar</Nav.Link>
          <Nav.Link as={Link} to="/cliente/mensajes">Mensajes</Nav.Link>
        </Nav>
      );
  }


  return (
    <div>
      <header>
        <div className="mi-estilo">
          <p className='theTitle'>
            SISTEMA DE PARQUEO FCYT
          </p>
          <div className='logocontainer'> </div>
        </div>
        
      </header>
      
      <div>
        <Navbar collapseOnSelect className="custom-navbar" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {menu}
              <Nav>
                <a href="#" onClick={onLogout} className='btn-logout'>Cerrar sesión</a>
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
}

export default DefaultLayout