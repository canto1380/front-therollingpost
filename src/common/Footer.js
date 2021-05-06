import React from "react";
import { Container, Row, Col, Dropdown } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook , faInstagram, faTwitter, faYoutube, faWhatsapp} from '@fortawesome/free-brands-svg-icons'

import '../App.css'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Container fluid className="bg-secondary py-3 text-light">
      <Row className="align-items-center py-2" xs={1} sm={2}>
        <Col className="footer-row1"><h1>The Rolling Post</h1></Col>
        <Col className="align-middle">
          <div className="footer-row1 text-end">
          <a href="http://www.instragram.com.ar" className="text-light"><FontAwesomeIcon icon={faInstagram} className="me-2" size="2x"></FontAwesomeIcon></a>
          <a href="http://www.facebook.com.ar" className="text-light"><FontAwesomeIcon icon={faFacebook} className="me-2" size="2x"></FontAwesomeIcon></a>
          <a href="http://www.twitter.com.ar" className="text-light"><FontAwesomeIcon icon={faTwitter} className="me-2" size="2x"></FontAwesomeIcon></a>
          <a href="http://www.youtube.com.ar" className="text-light"><FontAwesomeIcon icon={faYoutube} className="me-2" size="2x"></FontAwesomeIcon></a>
          <a href="http://www.whatsapp.com.ar" className="text-light"><FontAwesomeIcon icon={faWhatsapp} className="me-2" size="2x"></FontAwesomeIcon></a>
          </div>
        </Col>
      </Row>
      
      <Dropdown.Divider className="bg-light" />
      <Row className="text-center py-2" xs={3} sm={6} md={6} lg={12}>
        <Link className="text-light text-decoration-none" to={'/policiales'}><Col sm>Policiales</Col></Link>
        <Link className="text-light text-decoration-none" to={'/politica'}><Col sm>Politica</Col></Link>
        <Link className="text-light text-decoration-none" to={'/deportes'}><Col sm>Deportes</Col></Link>
        <Link className="text-light text-decoration-none" to={'/actualidad'}><Col sm>Actualidad</Col></Link>
        <Link className="text-light text-decoration-none" to={'/sociales'}><Col sm>Sociales</Col></Link>
        <Link className="text-light text-decoration-none" to={'/economia'}><Col sm>Economia</Col></Link>
        <Link className="text-light text-decoration-none" to={'/internacional'}><Col sm>Internacional</Col></Link>
        <Link className="text-light text-decoration-none" to={'/inmuebles'}><Col sm>Inmuebles</Col></Link>
        <Link className="text-light text-decoration-none" to={'/funebres'}><Col sm>Funebres</Col></Link>
        <Link className="text-light text-decoration-none" to={'/clasificados'}><Col sm>Clasificados</Col></Link>
        <Link className="text-light text-decoration-none" to={'/fotografia'}><Col sm>Fotografia</Col></Link>
        <Link className="text-light text-decoration-none" to={'/covid'}><Col sm>Covid-19</Col></Link>
      </Row>
      <Dropdown.Divider className="bg-light" />
      <Row className="text-center py-2" xs={3} sm={6}>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Contacto</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Nosotros</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Terminos y condiciones</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Ayuda</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Privacidad</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto">Suscribirse</Col></Link>
      </Row>
      <Row className="text-center pt-3">
      <Col><p>&copy; Todos lo Derechos Reservados</p></Col>
      </Row>
    </Container>
  );
};

export default Footer;
