import React from 'react';
import { Container, Image, Form, Row, Col, ListGroup, Button } from 'react-bootstrap';
import LogoNR from "../../img/Logo-NR.png";
import ItemComentarios from './ItemComentarios';
import ItemMasLeidas from './ItemNoticias';

const CardComentarios = () => {
    return (
        <Container fluid className="p-0">
            <div className="my-4 text-primary">
                <h4>Comentarios <span className="badge bg-primary">4</span></h4>
            </div>
            <Row className="d-flex justify-content-between m-0 h-100">
                <Col xs={2} md={2} className="p-0 text-center">
                    <Image src={LogoNR} rounded className=" image-comentario text-center"/>
                </Col>
                <Col xs={10} md={10}  className="">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} />
                        <Form.Text className="text-muted">
                            Para poder hacer un comentario, debe iniciar sesion previamente.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <div>
                <Col sm={12} className="my-4 text-end">
                    <Button>Enviar comentario</Button>                    
                </Col>
            </div>
            <hr className="my-2"/>
            <ListGroup className="my-3">
                {/* Map donde recorre las primeras 5 noticias  */}
                <ItemComentarios/>
            </ListGroup>
        </Container>
    );
};

export default CardComentarios;