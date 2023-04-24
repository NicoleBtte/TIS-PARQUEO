import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

const NavBarComponent = () => {
  return (
    <div>
        <div style={{ backgroundColor: "lightgray", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Mi Sitio Web
        </div>
        <Navbar className="navBg" bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    <Nav.Link as={Link} to="/convocatoria">Convocatoria</Nav.Link>
                    <Nav.Link as={Link} to="/parqueo">Parqueo</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <section>
            <Outlet />
        </section>
    </div>
  )
}

export default NavBarComponent