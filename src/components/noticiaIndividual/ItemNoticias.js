import React from 'react';
import { ListGroup,Image, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import LogoNR from "../../img/Logo-NR.png";
import "../../App.css"

const ItemNoticias = () => {
    return (
        <ListGroup.Item className="py-0">
            <Link className="text-dark text-decoration-none" to={'/'}>
            <Row className="d-flex-justify-content-between card-masLeidas">
                <Col xs={2} sm={3} md={2} className="p-0">
                <Image src={LogoNR} rounded className="img-items-noticias" />
                </Col>
                <Col xs={10} sm={9} md={10} className="p-1">
                    <h5 className="">Titulo de la noticia</h5>
                    <p className="m-0">Pequena descripcion de la ntoicia</p>
                    <div className="d-flex align-items-end">
                    <p className="w-100 text-success text-end m-0">17/05/2021</p>
                    </div>
                </Col>
            </Row>
            </Link>
            <hr/><Link className="text-dark text-decoration-none" to={'/'}>
            <Row className="d-flex-justify-content-between card-masLeidas">
                <Col xs={2} sm={3} md={2} className="p-0">
                <Image src={LogoNR} rounded className="img-items-noticias" />
                </Col>
                <Col xs={10} sm={9} md={10} className="p-1">
                    <h5 className="">Titulo de la noticia</h5>
                    <p className="m-0">Pequena descripcion de la ntoicia</p>
                    <div className="d-flex align-items-end">
                    <p className="w-100 text-success text-end m-0">17/05/2021</p>
                    </div>
                </Col>
            </Row>
            </Link>
            <hr/><Link className="text-dark text-decoration-none" to={'/'}>
            <Row className="d-flex-justify-content-between card-masLeidas">
                <Col xs={2} sm={3} md={2} className="p-0">
                <Image src={LogoNR} rounded className="img-items-noticias" />
                </Col>
                <Col xs={10} sm={9} md={10} className="p-1">
                    <h5 className="">Titulo de la noticia</h5>
                    <p className="m-0">Pequena descripcion de la ntoicia</p>
                    <div className="d-flex align-items-end">
                    <p className="w-100 text-success text-end m-0">17/05/2021</p>
                    </div>
                </Col>
            </Row>
            </Link>
                        
        </ListGroup.Item>
    );
};

export default ItemNoticias;