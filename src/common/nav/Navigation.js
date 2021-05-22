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
  const {categorias, categoriasDestacadas, categoriasNoDestacadas } = props

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
          {categoriasNoDestacadas.map((cat)=>(
              <NavDropdown.Item key={cat._id} href={"/sociales"}>{cat.nombreCategoria}</NavDropdown.Item>
                ))}
          </NavDropdown> 
            {
              categoriasDestacadas.map((cat) =>(
            <NavLink
            key={cat._id}
            className="li-navbar-responsive nav-link"
            exact={true}
            to="/deportes"
          >
            {cat.nombreCategoria}
          </NavLink>
          // <span className='aa'></span>
              ))
            }
            {
              categorias.map((cat) =>(
                <NavLink
                key={cat._id}
                exact={true}
                to={"/policiales"}
                className="nav-link li-navbar-lg"
              >
                {cat.nombreCategoria}
              </NavLink>
              ))
            } 
        </Nav>
        {/* Cliente */}
        {!isAuthenticated() && (
          <MenuCliente />
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
