import React from 'react';
// import {Container, Card} from "react-bootstrap";
import LogoNR from "../img/Logo-NR.png";
import { Link } from 'react-router-dom'

const CardNoticia = (props) => {
  const {not} = props
  // console.log(not)
  return (
    <div>
    <Link to={'/noticia/idd'} className="text-dark text-decoration-none">
      <div className="card tarjetaNoticia">
        <img className="card-img-top w-100" src={LogoNR} alt="" />
        <div className="card-body">
          <h5 className="card-title">not.titulo</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default CardNoticia;