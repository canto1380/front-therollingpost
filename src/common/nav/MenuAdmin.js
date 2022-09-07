import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faNewspaper, faListAlt, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../../App.css"
import { deleteToken } from "../../helpers/helpers";

const MenuAdmin = (props) => {
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
            <DropdownButton
              className="me-2"
              menuAlign="right"
              title='Menu Admin'
              id="dropdown-menu-align-right"
              variant="outline-light"
            >
              <Dropdown.Item as={Link} to={`/menu-noticias`} className="limpio" eventKey="1">
                <FontAwesomeIcon icon={faNewspaper} className="me-2 back-text" size="2x"></FontAwesomeIcon>Noticias
                 </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/menu-categorias`} className="limpio" eventKey="2">
                <FontAwesomeIcon icon={faListAlt} className="me-2 back-text" size="2x"></FontAwesomeIcon>Categorías
                </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/menu-suscriptos`} className="limpio" eventKey="3">
                <FontAwesomeIcon icon={faUserFriends} className="me-2 back-text" size="2x"></FontAwesomeIcon>Clientes
                </Dropdown.Item>
            </DropdownButton>
           <Button variant="botones-navbar" onClick={cerrarSesion} className="btn btn-outline-light" ><FontAwesomeIcon icon={faSignInAlt} className="me-2"></FontAwesomeIcon>Salir</Button>
          </Nav>
    );
};

export default withRouter (MenuAdmin);