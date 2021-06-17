import React from "react";
import { Container, Button, ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css"

const CardMasLeidas = (props) => {
    const { categoria, noticias } = props;
    let noticiasXCat = noticias.filter((not) => not.categoria.nombreCategoria === categoria);
    let masLeidas = noticiasXCat.slice(0, 3);
    return (
        <Container fluid className='p-0 margin-md'>
            <div className="d-flex justify-content-between align-items-end mt-0 p-0">
                <p className="m-0 fw-bolder"><i>Más noticias de {categoria}</i></p>
                <Button size="sm" as={Link}  variant="info" className="btn backcolor text-light" to={`/${categoria.toLowerCase()}`}>
                    Ver más
                </Button>
            </div>
            <hr className="mt-0" />
            <ListGroup className="my-3 px-2">
                {masLeidas.map((mas) => (
                    <Link className="text-dark text-decoration-none" key={mas._id} to={`/noti/${mas.categoria.nombreCategoria}/${mas._id}`}>
                        <Row className="d-flex-justify-content-between card-masLeidas">
                            <Col xs={2} sm={3} className="p-0 d-flex align-items-center">
                                <Image src={mas.foto} rounded className="img-items-noticias" />
                            </Col>
                            <Col xs={10} sm={9} className="p-1">
                                <div>
                                    <p className="mb-0 ms-2">{mas.titulo}</p>
                                </div>
                                <div className="">
                                    <p className="text-success text-end mb-0">{mas.hora}</p>
                                </div>
                            </Col>
                        </Row>
                        <hr className="my-1"/>
                    </Link>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CardMasLeidas;
