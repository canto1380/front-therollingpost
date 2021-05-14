import React from 'react';
import { Nav, Button} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

const MenuCliente = () => {
    return (
        <Nav>
            <Button variant="outline-light botones-navbar" className="p-0 me-2">
              <NavLink
                className="btn text-light text-hover"
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
            <Button variant="outline-light botones-navbar" className="p-0">
              <NavLink
                className="btn text-light text-hover"
                exact={true}
                to={"/inicio-sesion"}
              >
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className="me-2"
                ></FontAwesomeIcon>
                Ingresar
              </NavLink>
            </Button>
          </Nav>
    );
};

export default MenuCliente;