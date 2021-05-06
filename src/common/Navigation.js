import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
  
  return (
    <Navbar
      className='container-fluid py-3'
      bg="secondary"
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand href="/">The Rolling Post</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="align-navbar">
        <Nav className="mr-auto">
          <NavDropdown title="Secciones" id="collasible-nav-dropdown" className="li-navbar-responsive w-50">
            <NavDropdown.Item href={'/'}>Sociales</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Economia</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Internacional</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Inmuebles</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Funebres</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Clasificados</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Fotografia</NavDropdown.Item>
            <NavDropdown.Item href={'/'}>Covid-19</NavDropdown.Item>
          </NavDropdown>

          <NavLink exact={true} to={'/policiales'} className="nav-link li-navbar-lg">Policiales</NavLink>
          <NavLink exact={true} to={'/politica'} className="nav-link li-navbar-lg">Politica</NavLink>
          <NavLink exact={true} to={'/deportes'} className="nav-link li-navbar-lg">Deportes</NavLink>
          <NavLink exact={true} to={'/actualidad'} className="nav-link li-navbar-lg">Actualidad</NavLink>
          <NavLink exact={true} to={'/sociales'} className="nav-link li-navbar-lg">Sociales</NavLink>
          <NavLink exact={true} to={'/economia'} className="nav-link li-navbar-lg">Economia</NavLink>
          <NavLink exact={true} to={'/internacional'} className="nav-link li-navbar-lg">Internacional</NavLink>
          <NavLink exact={true} to={'/inmuebles'} className="nav-link li-navbar-lg">Inmuebles</NavLink>
          <NavLink exact={true} to={'/funebres'} className="nav-link li-navbar-lg">Funebres</NavLink>
          <NavLink exact={true} to={'/clasificados'} className="nav-link li-navbar-lg">Clasificados</NavLink>
          <NavLink exact={true} to={'/fotografia'} className="nav-link li-navbar-lg">Fotografia</NavLink>
          <NavLink exact={true} to={'/covid-19'} className="nav-link li-navbar-lg">Covid-19</NavLink>

          <NavLink className="li-navbar-responsive nav-link" exact={true} to="/policiales">
            Policiales
              </NavLink>
          <NavLink className="li-navbar-responsive nav-link" exact={true} to="/politica">
            Politica
              </NavLink>
          <NavLink className="li-navbar-responsive nav-link" exact={true} to="/deportes">
            Deportes
              </NavLink>
          <NavLink className="li-navbar-responsive nav-link" exact={true} to="/actualidad">
            Actualidad
              </NavLink>
        </Nav>
        <Nav>
          <Button variant="outline-light botones-navbar" className="p-0 me-2"><NavLink className="btn text-light" exact={true} to={'/suscripcion'}><FontAwesomeIcon icon={faPlusSquare} className="me-2"></FontAwesomeIcon>Suscribirse</NavLink></Button>
          <Button variant="outline-light botones-navbar" className="p-0"><NavLink className="btn text-light" exact={true} to={'/inicio-sesion'}><FontAwesomeIcon icon={faSignInAlt} className="me-2"></FontAwesomeIcon>Ingresar</NavLink></Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


  );
};

export default Navigation;
