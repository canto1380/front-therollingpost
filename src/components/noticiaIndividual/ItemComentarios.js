import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import LogoNR from "../../img/The Rolling Post.jpg";

const ItemComentarios = () => {
    return (
        <Container fluid>
             <Row className="d-flex justify-content-between m-0 h-100">
                <Col xs={2} md={2} className="p-0 text-center">
                    <Image src={LogoNR} rounded className=" text-center" width="80px"/>
                </Col>
                <Col xs={10} md={10}  className="">
                    <h6>Nombre de usuario del comentario</h6>
                    <p>Este es un comentario de prueba. Este es un comentario de prueba. Este es un comentario de prueba.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ItemComentarios;