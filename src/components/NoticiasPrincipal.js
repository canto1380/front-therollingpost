import React from 'react';
import { Row, Col} from "react-bootstrap";
import CardNoticia from './CardNoticia';


const NoticiasPrincipal = () => {
    return (
        <section className="my-3">
        <h4>Destacados</h4>
        <hr />
        <Row>
    <Col sm={7}  >
      <CardNoticia></CardNoticia>
    </Col>
    <Col sm={5}>
        <CardNoticia></CardNoticia>
        <CardNoticia></CardNoticia>
    </Col>
  </Row>
  </section>
    );
};

export default NoticiasPrincipal;