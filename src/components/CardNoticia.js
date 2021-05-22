import React from 'react';
// import {Container, Card} from "react-bootstrap";
import LogoNR from "../img/Logo-NR.png";
import { Link } from 'react-router-dom'

const CardNoticia = () => {

  {/* <Card className="tarjetaNoticia">
    <Card.Img variant="top" src={LogoNR} />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
</Card> */}
  return (
    <Link to={'/noticia/idd'} className="text-dark text-decoration-none">
      <div className="card tarjetaNoticia">
        <img className="card-img-top w-100" src={LogoNR} alt="" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </Link>
  );
};

export default CardNoticia;