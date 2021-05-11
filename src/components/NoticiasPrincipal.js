import React from 'react';
import {Container, Card} from "react-bootstrap";
import LogoNR from "../img/Logo-NR.png";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'
import CategoriaDestacada from "./CategoriaDestacada";
import { Fragment } from 'react';
import CardNoticia from './CardNoticia';


const NoticiasPrincipal = () => {
    return (
        <section className="my-3">
        <h4>Destacados</h4>
        <hr />
        <Row>
    <Col sm={7}  >
      <CardNoticia></CardNoticia>
    </Col>
    <Col sm={5}>
        <CardNoticia></CardNoticia>
        <CardNoticia></CardNoticia>
    </Col>
  </Row>
  </section>
    );
};

export default NoticiasPrincipal;