import React from "react";
import {Container, Card} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import coca from "./img/cokeMusic.gif";
import corona from "./img/corona.jpg";
import covidSlogan from './img/covidSlogan.jpg'
import covidCuidado from './img/covidCuidado.jpg'


const Inicio = () => {
  
  return (
    
    <Container>
      <Publicidad publicidad={covidSlogan}></Publicidad>
      <Row>
    <Col sm={8} className="h-100" >
    <NoticiasPrincipal></NoticiasPrincipal>
    </Col>
    <Col sm={4}>
    <Publicidad publicidad={coca}></Publicidad>
    <Publicidad publicidad={corona}></Publicidad>
    </Col>
  </Row>
        <CategoriaDestacada></CategoriaDestacada>
        <CategoriaDestacada></CategoriaDestacada>
        <Publicidad publicidad={covidCuidado}></Publicidad>
        <CategoriaDestacada></CategoriaDestacada>
    </Container>
  );
};

export default Inicio;
