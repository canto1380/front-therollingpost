import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import "../../App.css";
import { isAuthenticated } from "../../helpers/helpers";
import MenuAdmin from "./MenuAdmin";
import MenuCliente from "./MenuCliente";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'

var cambiarModo = () => {
  let modo = JSON.parse(localStorage.getItem("tema"));
  modo = !modo;
  localStorage.setItem("tema", JSON.stringify(modo));
  modoActivo();
};

var modoActivo = ()=>{
  let modo = JSON.parse(localStorage.getItem("tema"));  
  var element = document.body;
  if(modo){ 
    element.classList.remove("dark");
  }else{
    element.classList.add("dark");
  }
}
modoActivo();

const Navigation = (props) => {
  const { categorias, categoriasDestacadas, categoriasNoDestacadas } = props
  
  return (
    <Navbar
      className="container-fluid py-2 backcolor"
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/"><h4><i>The Rolling Post</i></h4></Navbar.Brand>
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
              <button className="boton-tema border-0 py-2 px-3 rounded ms-auto me-2" onClick={cambiarModo}>
              <FontAwesomeIcon icon={faLightbulb} className="fs-4 "></FontAwesomeIcon>
                </button>
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
