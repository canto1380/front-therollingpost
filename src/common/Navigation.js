import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar
        bg="secondary"
        expand="lg"
        variant="dark"
        className="container-fluid py-3"
      >
        <Navbar.Brand href="/">The Rolling Post</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" exact={true} to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/policiales">
              Policiales
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/politica">
              Politica
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/deportes">
              Deportes
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/actualidad">
              Actualidad
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
