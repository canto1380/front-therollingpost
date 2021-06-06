import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import "../../App.css";
import { isAuthenticated } from "../../helpers/helpers";
import MenuAdmin from "./MenuAdmin";
import MenuCliente from "./MenuCliente";

const Navigation = (props) => {
  const { categorias, categoriasDestacadas, categoriasNoDestacadas } = props

  return (
    <Navbar
      className="container-fluid py-3 backcolor"
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/">The Rolling Post</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="align-navbar">
        <Nav className="mr-auto">
          <NavDropdown
            title="Secciones"
            id="collasible-nav-dropdown"
            className="li-navbar-responsive"
          >
          {categoriasNoDestacadas.map((cat)=>(
              <NavDropdown.Item key={cat._id} href={`/${cat.nombreCategoria.toLowerCase()}`}>{cat.nombreCategoria}</NavDropdown.Item>
                ))}
          </NavDropdown> 
            {
              categoriasDestacadas.map((cat) =>(
            <NavLink
            key={cat._id}
            className="li-navbar-responsive nav-link"
            exact={true}
            to={`/${cat.nombreCategoria.toLowerCase()}`}
          >
            {cat.nombreCategoria}
          </NavLink>
              ))
            }
            {
              categorias.map((cat) =>(
                <NavLink
                key={cat._id}  
                exact={true}
                to={`/${cat.nombreCategoria.toLowerCase()}`}
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
          <MenuAdmin setConsultar={props.setConsultar} ls={props.ls} tok={props.tok}/>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
