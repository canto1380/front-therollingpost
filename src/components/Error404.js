import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgErr404 from "../img/error-404-pagina-no-encontrada-hombre-barriendo-piso_82574-10307.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";

const Error404 = () => {
  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <Link className="btn btn-primary w-100 " to={"/"}>
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
        </Link>
      </div>
      <div>
        <Image className="w-100" src={ImgErr404} rounded />
      </div>
    </div>
  );
};

export default Error404;
