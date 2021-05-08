import React from "react";
import {Container, Card} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import Coca from "../img/CokeMusic.gif";
import Corona from "../img/Corona.jpg";
// import covid from "../img/CovidSlogan.jpg";
// import cuidado from "../img/CovidCuidado.jpg";


const Inicio = () => {
  
  return (
    
    <Container>
      <Publicidad></Publicidad>
      <Row>
    <Col sm={8} className="h-100" >
    <NoticiasPrincipal></NoticiasPrincipal>
    </Col>
    <Col sm={4}>
    <Publicidad publicidad={Coca}></Publicidad>
    <Publicidad publicidad={Corona}></Publicidad>
    </Col>
  </Row>
        <CategoriaDestacada></CategoriaDestacada>
        <CategoriaDestacada></CategoriaDestacada>
        <Publicidad></Publicidad>
        <CategoriaDestacada></CategoriaDestacada>
    </Container>
  );
};

export default Inicio;
