import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import ItemNavBarCategoria from './ItemNavBarCategoria';
import Publicidad from "../Publicidad";
import NoticiasPrincipal from "../NoticiasPrincipal";
import slogan from "../../img/sloganCovid.png";
import vacunas from "../../img/vacunasCovid.png";
import ItemNoticiasxCat from './ItemNoticiasxCat';
import { useScrollToTop } from '../../helpers/hooks';

const CardCategorias = (props) => {
    const {cat, noticias, categorias, comentario} = props
    let noticiasXCat = noticias.filter(not => not.categoria.nombreCategoria === cat.nombreCategoria)
    let ultimaNoticia = noticiasXCat.slice(0, 1)
    let ultimasNoticias = noticiasXCat.slice(1, 3)
    let resto = noticiasXCat.slice(3,noticiasXCat.length)

    useScrollToTop();

    return (
        <Container className="my-3 px-4">
            <h1 className="mt-2"><i>{props.cat.nombreCategoria}</i></h1>
            <ListGroup className="border-0">
                <hr className="my-1"/>
                <ItemNavBarCategoria categorias={categorias} />
                <hr className="my-1"/>
            </ListGroup>
            <Publicidad publicidad={slogan}></Publicidad>
            <Row>
                <Col xs={12}>
                    <NoticiasPrincipal
                        ultimasNoticias={ultimasNoticias}
                        ultimaNoticia={ultimaNoticia}
                        comentario={comentario}
                    />
                </Col>
            </Row>
            <Row className="my-5">
            <Publicidad publicidad={vacunas}></Publicidad>
            </Row>
            <ItemNoticiasxCat
                    cat={cat}
                    noticiasXCat={resto}
                    comentario={comentario}
            />
        </Container>
    );
};

export default CardCategorias;