import React, {useEffect, useState} from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Publicidad from '../Publicidad';
import CardNoticiaIndividual from './CardNoticiaIndividual';

import slogan from "../../img/sloganCovid.png";
import Coca from "../../img/cokeMusic.gif";
import Corona from "../../img/corona.jpg";
import vacunas from "../../img/vacunasCovid.png";
import covidCuidados from "../../img/covidCuidados.jpg";
import CardMasLeidas from './CardMasLeidas';

import "../../App.css"
import CardUltimasNoticias from './CardUltimasNoticias';
import CardComentarios from './CardComentarios';

const Noticia = (props) => {
    const [not, setNot] = useState({});

    const {categoria, id} = useParams();
    console.log(id+"  "+ categoria)

    let hidden = 'pub-hidden-lg'
    let hiddenmd ="pub-hidden-md"

    useEffect(() => {
        const consultarCategorias = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + "/noticias/noticia/" + id)
                console.log(res)
                if (res.status === 200) {
                    const resp = await res.json();
                    setNot(resp);
                    console.log(resp)
                }
            } catch (error) {
                console.log(error)
            }
        }
        consultarCategorias();
    }, []);

    return (
        <Container fluid className="p-4">
            <Publicidad publicidad={slogan} />
            <Row >
                <Col className="my-5 border border-danger" sm={12} lg={8} >
                    <CardNoticiaIndividual />
                </Col>
                <Col sm={8} lg={4} className="component-mas-leidas">
                    <CardMasLeidas />
                    <Publicidad classnamehidden={hiddenmd} publicidad={covidCuidados} />
                    <Publicidad classnamehidden={hiddenmd} publicidad={Corona} />
                </Col>
                <Col sm={4} lg={4}>
                    <Publicidad className="d-flex justify-content-center align-items-center" classnamehidden={hidden} publicidad={covidCuidados} />
                </Col>
                <Col sm={12}>
                    <Publicidad classnamehidden={hiddenmd} publicidad={vacunas}/>
                </Col>
                <hr className="my-2"/>
                <Col sm={8} lg={8} >
                    <CardUltimasNoticias/>
                </Col>
                <Col sm={4} lg={4} className="d-flex justify-content-center align-items-center">
                <Publicidad publicidad={Coca}/>
                </Col>
                <hr className="my2"/>
                <Col sm={12}>
                    <CardComentarios/>
                </Col>
            </Row>
        </Container>
    );
};

export default Noticia;