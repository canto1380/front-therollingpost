import React from "react";
import { Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSignInAlt, faNewspaper, faListAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../../App.css";
import { deleteToken } from "../../helpers/helpers";

const MenuCliente = (props) => {
  const { setTok } = props
  const cerrarSesion = (e) => {
    /*Swal */
      let timerInterval;
      Swal.fire({
        title: "Cerrando sesion",
        html: "",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                b.textContent = Swal.getTimerLeft();
              }
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          setTok([])
          deleteToken()
          props.history.push("/");
        }
      });
    };
  return (
    <Nav>
      <Button variant="botones-navbar" className="p-0 me-2">
        <NavLink
          className="btn btn-outline-light"
          exact={true}
          to={"/suscripcion"}
        >
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="me-2"
          ></FontAwesomeIcon>
          Suscribirse
        </NavLink>
      </Button>
      <DropdownButton
              className="me-2"
              menuAlign="right"
              title='Perfil'
              id="dropdown-menu-align-right"
              variant="outline-light"
            >
              <Dropdown.Item as={Link} to={`/menu-noticias`} className="limpio" eventKey="1">
                <FontAwesomeIcon icon={faNewspaper} className="me-2 back-text" size="2x"></FontAwesomeIcon>Usuario
                 </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/menu-categorias`} className="limpio" eventKey="2">
                <FontAwesomeIcon icon={faListAlt} className="me-2 back-text" size="2x"></FontAwesomeIcon>Estadisticas
                </Dropdown.Item>
              
            </DropdownButton>
      <Button
        variant="botones-navbar"
        onClick={cerrarSesion}
        className="btn btn-outline-light"
      >
        <FontAwesomeIcon icon={faSignInAlt} className="me-2"></FontAwesomeIcon>
        Salir
      </Button>
    </Nav>
  );
};

export default withRouter (MenuCliente);
