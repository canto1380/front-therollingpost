import React from 'react';
import { Container, Button, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../../App.css"

const CardUltimasNoticias = (props) => {
    const {ultimas3noticias} = props
    ultimas3noticias.sort(((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha)));
    ultimas3noticias.sort(((a, b) => parseInt(a.hora) - parseInt(b.hora)));

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
    scrollToTop()
    return (
        <Container fluid className="p-0 component-mas-leidas">
            <div className="d-flex justify-content-between align-items-end">
            <p className="m-0 fw-bolder">Últimas noticias</p>
                <Button size="sm" className="btn backbutton border-0" as={Link} to={'/*'}>
                    <span className="lead"><i><b>Ver más</b></i> </span>
                </Button>
            </div>
            <hr className="mt-0"/>
            <ListGroup className="my-3">
                 {/* Map donde recorre las primeras 5 noticias   */}
                {
                    ultimas3noticias.map((mas) => (
                        <Link className="herencia text-decoration-none" key={mas._id} to={`/noti/${mas.categoria?.nombreCategoria}/${mas._id}`}>
                            <Row className="d-flex-justify-content-between card-masLeidas">
                                <Col xs={2} sm={3} className="p-0 d-flex align-items-center">
                                    <Image src={mas.foto} rounded className="img-items-noticias" />
                                </Col>
                                <Col xs={10} sm={9} className="p-1">
                                    <div>
                                        <h3 className="mb-0 aas">{mas.titulo}</h3>
                                        <p className="lead hidden-md">{mas.descripcion}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-end mb-0 qww">{mas.hora}</p>
                                    </div>
                                </Col>
                            </Row>
                            <hr className="my-1"/>
                        </Link>
                    ))
                }
                
            </ListGroup>
        </Container>
    );
};

export default CardUltimasNoticias;