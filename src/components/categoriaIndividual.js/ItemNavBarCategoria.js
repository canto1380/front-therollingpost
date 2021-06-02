import React from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import {Link}  from 'react-router-dom'

const ItemNavBarCategoria = () => {
    return (
        <ListGroup.Item className="d-flex justify-content-between border-0">
            
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                Futbol
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                Tenis
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                Basquet
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                Rugby
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                Futbol Argentino
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
                River
            </Row>
            </Link>
            <Link to={'/'} className="text-decoration-none text-dark fw-bold">
            <Row>
            Boca
            </Row>
            </Link>
        </ListGroup.Item>
        
    );
};

export default ItemNavBarCategoria;