import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import router from '../router';
import '../styles/headerStyle.css';
import '../styles/navbarStyle.css'
import logo from "../styles/images/logofcyt.png";

const GuestLayout = () => {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header>
        <div className="mi-estilo">
          <p className='theTitle'>
            SISTEMA DE PARQUEO FCYT
          </p>
          <div className='logocontainer'>
          </div>
        </div>
        
      </header>
      <div>
        <Navbar collapseOnSelect className="custom-navbar" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/register">Inicio</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
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

export default GuestLayout