import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import LogoNR from "../../img/The Rolling Post.jpg";

const ItemComentarios = (props) => {
    const {com} = props

    return (
        <Container fluid>
             <Row className="d-flex justify-content-between m-0 h-100">
                <Col xs={2} md={2} className="p-0 text-center">
                    <Image src={LogoNR} rounded className="image-comentario text-center"/>
                </Col>
                <Col xs={10} md={10} >
                    <h6>Nombre de usuario</h6>
                    <p>{com.comentario}</p>
                </Col>
            </Row>
            <hr/>
        </Container>
    );
};

export default ItemComentarios;