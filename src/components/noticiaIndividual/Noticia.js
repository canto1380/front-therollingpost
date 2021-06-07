import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Publicidad from '../Publicidad';
import CardNoticiaIndividual from './CardNoticiaIndividual';
import slogan from "../../img/sloganCovid.png";
import Coca from "../../img/cokeMusic.gif";
import RollingLogo from "../../img/RollingCode.jpg";
import PedidosYa from "../../img/Pedidos Ya.jpg";
import covidCuidados from "../../img/covidCuidados.jpg";
import CardMasLeidas from './CardMasLeidas';
import "../../App.css"
import CardUltimasNoticias from './CardUltimasNoticias';
import CardComentarios from './CardComentarios';

const Noticia = (props) => {
    const {noticias} = props
    const [not, setNot] = useState({});
    const {cat, id} = useParams();
    let hidden = 'pub-hidden-lg'
    let hiddenmd ="pub-hidden-md"
    let hiddensm ="pub-hidden-sm"

    let ultimas3noticias = noticias.slice(0, 3)

    /* Obtener la noticias a mostrar */
    useEffect(() => {
        const consultarCategorias = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_API_URL + "/noticias/" + id)
                if (res.status === 200) {
                    const resp = await res.json();
                    setNot(resp);
                }
            } catch (error) {
                console.log(error)
            }
        }
        consultarCategorias();
    }, [id]);

    return (
        <Container fluid className="p-4">
            <Row >
                <Col sm={12} lg={9} >
            <Publicidad publicidad={slogan} />
                    <CardNoticiaIndividual not={not}/>
                </Col>
                <Col sm={12} md={8} lg={3} className="">
                    <CardMasLeidas  noticias={props.noticias}  categoria={cat}/>
                    <Publicidad classnamehidden={hiddenmd} publicidad={PedidosYa} />
                    <Publicidad classnamehidden={hiddenmd} publicidad={covidCuidados} />
                    <Publicidad classnamehidden={hiddenmd} publicidad={RollingLogo} />
                </Col>
                <Col md={4} lg={4} className="d-flex justify-content-center align-items-center">
                    <Publicidad classnamehidden={hidden} publicidad={covidCuidados} />
                </Col>
                <hr className="my-2"/>
                <Col sm={12} md={9} >
                    {
                    <CardUltimasNoticias ultimas3noticias={ultimas3noticias}/>
                    }
                </Col>
                <Col sm={4} md={3} className="d-flex justify-content-center align-items-center">
                <Publicidad publicidad={Coca} classnamehidden={hiddensm}/>
                </Col>
                <Col sm={12}>
                    <CardComentarios/>
                </Col>
            </Row>
        </Container>
    );
};

export default Noticia;