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

const DefaultLayout = () => {
  const {user, token, setUser, setToken} = useStateContext()

  /*useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])*/

  if (!token) {
    return <Navigate to="/register"/>
  }

  const onLogout = (ev) => {
    /*ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })*/
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
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/convocatoria">Convocatoria</Nav.Link>
                <Nav.Link as={Link} to="/parqueo">Parqueo</Nav.Link>
              </Nav>
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