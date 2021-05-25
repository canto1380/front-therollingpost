import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ItemNavBarCategoria from './ItemNavBarCategoria';
import Publicidad from "../Publicidad";
import NoticiasPrincipal from "../NoticiasPrincipal";

import slogan from "../../img/sloganCovid.png";
import CategoriaDestacada from '../CategoriaDestacada';

const CardCategorias = (props) => {
    const {cat} = props
    return (
        <Container>
            <Publicidad publicidad={slogan}></Publicidad>
            <h1 className="mt-5">{cat.nombreCategoria}</h1>
            <ListGroup className=" border-0">
                {/* map que lea */}
                <hr className="my-1"/>
                <ItemNavBarCategoria/>
                <hr className="my-1"/>
            </ListGroup>
            <Row>
                <Col xs={12} className="border border-danger">
                    <NoticiasPrincipal></NoticiasPrincipal>
                </Col>
            </Row>
            <Row>
                <CategoriaDestacada
                    titulo={cat.nombreCategoria}
                />
            </Row>

        </Container>
    );
};

export default CardCategorias;