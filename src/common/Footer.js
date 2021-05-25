import React from "react";
import "./Footer.css";
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook , faInstagram, faTwitter, faYoutube, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import '../App.css'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Container fluid className="backcolor py-3 text-light">
      <Row className="align-items-center py-2" xs={1} sm={2}>
        <Col><h1>The Rolling Post</h1></Col>
        <Col className="align-middle">
          <div className="footer-row1 text-end">
          <a href="https://www.instagram.com/?hl=es-la" target="_blank" rel="noreferrer" className="text-light"><FontAwesomeIcon icon={faInstagram} className="me-2 turn insta" size="3x"></FontAwesomeIcon></a>
          <a href="http://www.facebook.com.ar" target="_blank" rel="noreferrer" className="text-light"><FontAwesomeIcon icon={faFacebook} className="me-2 turn face" size="3x"></FontAwesomeIcon></a>
          <a href="https://twitter.com/?lang=es" target="_blank" rel="noreferrer" className="text-light"><FontAwesomeIcon icon={faTwitter} className="me-2 turn twit" size="3x"></FontAwesomeIcon></a>
          <a href="http://www.youtube.com.ar" target="_blank" rel="noreferrer" className="text-light"><FontAwesomeIcon icon={faYoutube} className="me-2 turn u2b" size="3x"></FontAwesomeIcon></a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer" className="text-light"><FontAwesomeIcon icon={faWhatsapp} className="me-2 turn what" size="3x"></FontAwesomeIcon></a>
          </div>
        </Col>
      </Row>
      
      <Dropdown.Divider className="bg-light" />
      <Row className="text-center py-2" xs={3} sm={6} md={6} lg={12}>
        <Link className="text-light text-decoration-none" to={'/policiales'}><Col className="botones-hover" sm>Policiales</Col></Link>
        <Link className="text-light text-decoration-none" to={'/politica'}><Col className="botones-hover" sm>Politica</Col></Link>
        <Link className="text-light text-decoration-none" to={'/deportes'}><Col className="botones-hover" sm>Deportes</Col></Link>
        <Link className="text-light text-decoration-none" to={'/actualidad'}><Col className="botones-hover" sm>Actualidad</Col></Link>
        <Link className="text-light text-decoration-none" to={'/sociales'}><Col className="botones-hover" sm>Sociales</Col></Link>
        <Link className="text-light text-decoration-none" to={'/economia'}><Col className="botones-hover" sm>Economia</Col></Link>
        <Link className="text-light text-decoration-none" to={'/internacional'}><Col className="botones-hover" sm>Internacional</Col></Link>
        <Link className="text-light text-decoration-none" to={'/inmuebles'}><Col className="botones-hover" sm>Inmuebles</Col></Link>
        <Link className="text-light text-decoration-none" to={'/funebres'}><Col className="botones-hover" sm>Funebres</Col></Link>
        <Link className="text-light text-decoration-none" to={'/clasificados'}><Col className="botones-hover" sm>Clasificados</Col></Link>
        <Link className="text-light text-decoration-none" to={'/fotografia'}><Col className="botones-hover" sm>Fotografia</Col></Link>
        <Link className="text-light text-decoration-none" to={'/covid'}><Col className="botones-hover" sm>Covid-19</Col></Link>
      </Row>
      <Dropdown.Divider className="bg-light" />
      <Row className="text-center py-2" xs={3} sm={6}>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Contacto</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Nosotros</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Terminos y condiciones</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Ayuda</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Privacidad</Col></Link>
        <Link className="text-light text-decoration-none p-0" to={'/policiales'}><Col md="auto botones-hover">Suscribirse</Col></Link>
      </Row>
      <Row className="text-center pt-3">
      <Col><p>&copy; Todos lo Derechos Reservados</p></Col>
      </Row>
    </Container>
  );
};

export default Footer;
