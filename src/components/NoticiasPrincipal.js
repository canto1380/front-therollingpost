import React from 'react';
import { Row, Col} from "react-bootstrap";
import CardNoticia from './CardNoticia';


const NoticiasPrincipal = () => {
    return (
        <section className="my-5">
        <h4>Destacados</h4>
        <hr />
        <Row>
    <Col sm={8} className="h-100" >
      <CardNoticia></CardNoticia>
    </Col>
    <Col sm={4}>
        <CardNoticia></CardNoticia>
        <CardNoticia></CardNoticia>
    </Col>
  </Row>
  </section>
    );
};

export default NoticiasPrincipal;