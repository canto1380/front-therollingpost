import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
// import {Link} from 'react-router-dom'
import ItemMasLeidas from './ItemNoticias';

const CardMasLeidas = () => {
    return (
        <Container fluid className="p-0 component-mas-leidas">
            <div className="d-flex justify-content-between align-items-end my-1">
                <p className="m-0 fw-bolder">Mas leidas de ..objeto</p>
                <Button size="sm" className="btn btn-primary" to={'/'}>Ver mas</Button>
            </div>
            <hr className="mt-0"/>
            <ListGroup className="my-3">
                {/* Map donde recorre las primeras 5 noticias  */}
                <ItemMasLeidas/>
            </ListGroup>
        </Container>
    );
};

export default CardMasLeidas;