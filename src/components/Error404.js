import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgErr404 from "../img/error-404-pagina-no-encontrada-hombre-barriendo-piso_82574-10307.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";

const Error404 = () => {
  return (
    <div className="mb-1">
      <div>
        <Image className="w-100" src={ImgErr404} rounded />
      </div>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-primary w-50 " to={"/"}>
          <FontAwesomeIcon icon={faHome} className="fa-2x"></FontAwesomeIcon>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
