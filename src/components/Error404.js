import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container>
      <h1 className="text-center">Error 404 en proceso</h1>
      <p className="text-center">Imagen a Montar</p>
      <div className="d-flex justify-content-evenly">
        <Link className="btn btn-primary " to={"/"}>
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
        </Link>
      </div>
    </Container>
  );
};

export default Error404;
