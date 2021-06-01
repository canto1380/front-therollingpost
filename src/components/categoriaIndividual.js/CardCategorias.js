import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ItemNavBarCategoria from './ItemNavBarCategoria';
import Publicidad from "../Publicidad";
import NoticiasPrincipal from "../NoticiasPrincipal";

import slogan from "../../img/sloganCovid.png";
import vacunas from "../../img/vacunasCovid.png";
import CategoriaDestacada from '../CategoriaDestacada';
import ItemNoticiasxCat from './ItemNoticiasxCat';

const CardCategorias = (props) => {
    const {cat, noticias} = props
    console.log(noticias)
    console.log(cat.nombreCategoria)
    let noticiasXCat = noticias.filter(not => not.categoria === cat.nombreCategoria)
    let ultimaNoticia = noticiasXCat.slice(noticiasXCat.length-1, noticiasXCat.length)
    let ultimasNoticias = noticiasXCat.slice(noticiasXCat.length-3, noticiasXCat.length-1)
    let resto = noticiasXCat.slice(0,noticiasXCat.length-4)
    
    return (
        <Container fluid className="my-3 px-4">
            <Publicidad publicidad={slogan}></Publicidad>
            <h1 className="mt-5">{props.cat.nombreCategoria}</h1>
            <ListGroup className="border-0">
                {/* map que lea */}
                <hr className="my-1"/>
                <ItemNavBarCategoria/>
                <hr className="my-1"/>
            </ListGroup>
            <Row>
                <Col xs={12} className="">
                    <NoticiasPrincipal
                        ultimasNoticias={ultimasNoticias}
                        ultimaNoticia={ultimaNoticia}
                    />
                </Col>
            </Row>
            <Row className="my-5">
            <Publicidad publicidad={vacunas}></Publicidad>
            </Row>
            <ItemNoticiasxCat
                    cat={cat}
                    noticiasXCat={resto}
            />

        </Container>
    );
};

export default CardCategorias;