import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import "../../App.css";
import { isAuthenticated } from "../../helpers/helpers";
import MenuAdmin from "./MenuAdmin";
import MenuCliente from "./MenuCliente";

const Navigation = (props) => {

  return (
    <Navbar
      className="container-fluid py-3"
      bg="secondary"
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand href="/">The Rolling Post</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="align-navbar">
        <Nav className="mr-auto">
          <NavDropdown
            title="Secciones"
            id="collasible-nav-dropdown"
            className="li-navbar-responsive w-50"
          >
            <NavDropdown.Item href={"/sociales"}>Sociales</NavDropdown.Item>
            <NavDropdown.Item href={"/economia"}>Economia</NavDropdown.Item>
            <NavDropdown.Item href={"/internacional"}>Internacional</NavDropdown.Item>
            <NavDropdown.Item href={"/inmuebles"}>Inmuebles</NavDropdown.Item>
            <NavDropdown.Item href={"/funebres"}>Funebres</NavDropdown.Item>
            <NavDropdown.Item href={"/clasificados"}>Clasificados</NavDropdown.Item>
            <NavDropdown.Item href={"/fotografia"}>Fotografia</NavDropdown.Item>
            <NavDropdown.Item href={"/covid"}>Covid-19</NavDropdown.Item>
          </NavDropdown>

          <NavLink
            exact={true}
            to={"/policiales"}
            className="nav-link li-navbar-lg"
          >
            Policiales
          </NavLink>
          <NavLink
            exact={true}
            to={"/politica"}
            className="nav-link li-navbar-lg"
          >
            Politica
          </NavLink>
          <NavLink
            exact={true}
            to={"/deportes"}
            className="nav-link li-navbar-lg"
          >
            Deportes
          </NavLink>
          <NavLink
            exact={true}
            to={"/actualidad"}
            className="nav-link li-navbar-lg"
          >
            Actualidad
          </NavLink>
          <NavLink
            exact={true}
            to={"/sociales"}
            className="nav-link li-navbar-lg"
          >
            Sociales
          </NavLink>
          <NavLink
            exact={true}
            to={"/economia"}
            className="nav-link li-navbar-lg"
          >
            Economia
          </NavLink>
          <NavLink
            exact={true}
            to={"/internacional"}
            className="nav-link li-navbar-lg"
          >
            Internacional
          </NavLink>
          <NavLink
            exact={true}
            to={"/inmuebles"}
            className="nav-link li-navbar-lg"
          >
            Inmuebles
          </NavLink>
          <NavLink
            exact={true}
            to={"/funebres"}
            className="nav-link li-navbar-lg"
          >
            Funebres
          </NavLink>
          <NavLink
            exact={true}
            to={"/clasificados"}
            className="nav-link li-navbar-lg"
          >
            Clasificados
          </NavLink>
          <NavLink
            exact={true}
            to={"/fotografia"}
            className="nav-link li-navbar-lg"
          >
            Fotografia
          </NavLink>
          <NavLink
            exact={true}
            to={"/covid-19"}
            className="nav-link li-navbar-lg"
          >
            Covid-19
          </NavLink>
          <span className='aa'></span>
          <NavLink
            className="li-navbar-responsive nav-link"
            exact={true}
            to="/policiales"
          >
            Policiales
          </NavLink>
          <span className='aa'></span>
          <NavLink
            className="li-navbar-responsive nav-link"
            exact={true}
            to="/politica"
          >
            Politica
          </NavLink>
          <span className='aa'></span>
          <NavLink
            className="li-navbar-responsive nav-link"
            exact={true}
            to="/deportes"
          >
            Deportes
          </NavLink>
          <span className='aa'></span>
          <NavLink
            className="li-navbar-responsive nav-link"
            exact={true}
            to="/actualidad"
          >
            Actualidad
          </NavLink>
          
        </Nav>
        {/* Cliente */}
        {!isAuthenticated() && (
          <MenuCliente/>
        )}
        {/* Admin */}
        {isAuthenticated() && (
          <MenuAdmin setConsultar={props.setConsultar} ls={props.ls} />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
