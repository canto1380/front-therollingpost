import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
import LogoNR from "../img/Logo-NR.png";
import CardNoticia from './CardNoticia';


const NoticiasPrincipal = (props) => {
  const {ultimasNoticias, ultimaNoticia} = props
  console.log(ultimasNoticias)

  return (
    <section className="my-3">
      <h4>Destacados</h4>
      <hr />
      <Row className="">
        <Col xs={12} md={8}>
          {
            ultimaNoticia.map((not) =>
            <Link to={`/noti/${not.categoria}/${not._id}`} className="text-dark text-decoration-none" key={not._id}>
            <div className="card tarjetaNoticia">
              <div className="card-body">
                <h5 className="card-title">{not.titulo}</h5>
                <p className="card-text">{not.descripcion}</p>
              </div>
              <img className="card-img-top w-100" src={LogoNR} alt=""/>
            </div>
          </Link>
            )
          }
        </Col>
        <Col xs={12} md={4}>
        {
            ultimasNoticias.map((not) =>
            <Link to={`/noti/${not.categoria}/${not._id}`} className="text-dark text-decoration-none" key={not._id}>
            <div className="card tarjetaNoticia">
              <div className="card-body">
                <h5 className="card-title">{not.titulo}</h5>
              </div>
              <img className="card-img-top" src={LogoNR} alt=""/>
            </div>
            </Link>
            )
          }
        </Col>
      </Row>
    </section>
  );
};

export default NoticiasPrincipal;