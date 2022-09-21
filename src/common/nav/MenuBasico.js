import React from 'react';
import { Nav, Button} from 'react-bootstrap'
import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

const MenuBasico = (props) => {
    
    return (
        <Nav>
            <Button variant="botones-navbar" className="p-0 me-2">
              
            </Button>
            <Button variant="botones-navbar" className="p-0">
              <NavLink
                className="btn btn-outline-light"
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

export default withRouter (MenuBasico);