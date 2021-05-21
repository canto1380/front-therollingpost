import React from "react";
import {Container,} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import Coca from "../img/cokeMusic.gif";
import Corona from "../img/corona.jpg";
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
    <Col sm={2}>
    <Publicidad publicidad={Coca}></Publicidad>
    <Publicidad publicidad={Corona}></Publicidad>
    <Publicidad publicidad={Coca}></Publicidad>
    <Publicidad publicidad={Corona}></Publicidad>
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
