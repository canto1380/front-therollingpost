import React from "react";
import {Container,} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import Coca from "../img/cokeMusic.gif";
import Corona from "../img/corona.jpg";
import MP from "../img/Mercado Pago.jpg";
import PedidosYa from "../img/Pedidos Ya.png";
import RollingLogo from "../img/RollingCode.jpg";
import BnB from "../img/bon-o-bon.jpg";
import vacunas from "../img/vacunasCovid.png";
import slogan from "../img/sloganCovid.png";

const Inicio = () => {
  
  return (
    
    <Container className="my-5">
      <Publicidad publicidad={slogan}></Publicidad>
      <Row className="my-3">
    <Col sm={10}>
    <NoticiasPrincipal></NoticiasPrincipal>
    </Col>
    <Col className=" d-none d-md-block " md={2} >
    <Publicidad publicidad={Coca} href="https://www.cocacoladeargentina.com.ar/"></Publicidad>
    <Publicidad publicidad={Corona} href="https://cervezacorona.es/"></Publicidad>
    <Publicidad publicidad={MP} href="https://www.mercadopago.com.ar/"></Publicidad>
    <Publicidad publicidad={PedidosYa} href="https://www.pedidosya.com.ar/"></Publicidad>
    <Publicidad publicidad={RollingLogo} href="https://rollingcodeschool.com/"></Publicidad>
    <Publicidad publicidad={BnB} href="https://www.arcor.com/ar/marca/bon-o-bon"></Publicidad>
    </Col>
  </Row>
        <CategoriaDestacada></CategoriaDestacada>
        <Publicidad publicidad={vacunas}></Publicidad>
        <CategoriaDestacada></CategoriaDestacada>
        <CategoriaDestacada></CategoriaDestacada>
    </Container>
  );
};

export default Inicio;
