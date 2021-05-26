import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ItemNavBarCategoria from './ItemNavBarCategoria';
import Publicidad from "../Publicidad";
import NoticiasPrincipal from "../NoticiasPrincipal";

import slogan from "../../img/sloganCovid.png";
import CategoriaDestacada from '../CategoriaDestacada';
import ItemNoticiasxCat from './ItemNoticiasxCat';

const CardCategorias = (props) => {
    const {cat, noticias} = props
    console.log(noticias)
    console.log(cat.nombreCategoria)
    // let noticiasXCat =  noticias.filter(not => not.categoria === cat.nombreCategoria)
    let noticiasXCat = noticias.filter(not => not.categoria === cat.nombreCategoria)
    console.log(noticias._id +"  "+ cat.nombreCategoria)
    console.log(noticiasXCat)
    
    return (
        <Container fluid className="my-3 px-4">
            <Publicidad publicidad={slogan}></Publicidad>
            <h1 className="mt-5">{props.cat.nombreCategoria}</h1>
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
            {/* <Row> */}
                <ItemNoticiasxCat
                    cat={cat}
                    noticiasXCat={noticiasXCat}
                />
            {/* </Row> */}

        </Container>
    );
};

export default CardCategorias;