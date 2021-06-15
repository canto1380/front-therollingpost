import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgErr404 from "../img/error tecnico.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";

const Error404 = () => {
  return (
    <div className="mb-auto">
      <div className="d-flex justify-content-center ">
        <Image className="w-50" src={ImgErr404} rounded />
      </div>
      <div className="d-flex justify-content-center">
      <h5 className="w-50 text-center">Estamos experimentando problemas técnicos y no logramos encontrar la pagina que buscas, intentalo nuevamente mas tarde.</h5>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <Link className="btn btn-primary w-50 " to={"/"}>
          <FontAwesomeIcon icon={faHome} className="fa-2x"></FontAwesomeIcon>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
