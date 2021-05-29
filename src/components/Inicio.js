import React from "react";
import {Container,} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import Coca from "../img/cokeMusic.gif";
import Corona from "../img/corona.jpg";
import slogan from "../img/sloganCovid.png";

const Inicio = (props) => {
  const {categoriasDestacadas, noticias, ultimasNoticias, ultimaNoticia} = props

  return (
    
    <Container className="my-5">
      <Publicidad publicidad={slogan}></Publicidad>
      <Row className="my-3">
    <Col sm={10}>
    <NoticiasPrincipal noticias={props.noticias} ultimasNoticias={ultimasNoticias} ultimaNoticia={ultimaNoticia}/>
    </Col>
    <Col sm={2}>
    <Publicidad publicidad={Coca}></Publicidad>
    <Publicidad publicidad={Corona}></Publicidad>
    <Publicidad publicidad={Coca}></Publicidad>
    <Publicidad publicidad={Corona}></Publicidad>
    </Col>
  </Row>
      {
        categoriasDestacadas.map((cat) =>(<CategoriaDestacada noticias={noticias} cat={cat} key={cat._id}/>))
      }
    </Container>
  );
};

export default Inicio;
