import React, { useEffect } from "react";
import {Container,} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";
import Publicidad from "./Publicidad";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; 
import Coca from "../img/cokeMusic.gif";
import MP from "../img/Mercado Pago.jpg";
import RollingLogo from "../img/RollingCode.jpg";
import BnB from "../img/bon-o-bon.jpg";
import slogan from "../img/sloganCovid.png";
import { spinner } from "../helpers/sweetAlerts";
import { useScrollToTop } from "../helpers/hooks";

const Inicio = (props) => {
  const {categoriasDestacadas, noticias, ultimasNoticias, ultimaNoticia, comentario} = props

  /* Filtro de comentarios a mostrar */
  // let coment = comentario.filter((c) => c.idNoticia._id === ultimaNoticia._id);
  // let comentLength = coment.length;
  useEffect(() => {
    spinner()
  }, [])

  useScrollToTop();
  
  return (
    
    <Container className="my-2">
      <Publicidad publicidad={slogan}></Publicidad>
      <Row className="my-1">
    <Col sm={10}>
    <NoticiasPrincipal noticias={props.noticias} ultimasNoticias={ultimasNoticias} ultimaNoticia={ultimaNoticia} comentario={comentario}/>
    </Col>
    <Col className=" d-none d-md-block mt-4" md={2} >
    <Publicidad publicidad={Coca} href="https://www.cocacoladeargentina.com.ar/"></Publicidad>
    <Publicidad publicidad={MP} href="https://www.mercadopago.com.ar/"></Publicidad>
    <Publicidad publicidad={RollingLogo} href="https://rollingcodeschool.com/"></Publicidad>
    <Publicidad publicidad={BnB} href="https://www.arcor.com/ar/marca/bon-o-bon"></Publicidad>
    </Col>
  </Row>
      {
        categoriasDestacadas.map((cat) =>(<CategoriaDestacada noticias={noticias} cat={cat} key={cat._id} comentario={comentario}/>))
      }
    </Container>
  );
};

export default Inicio;
