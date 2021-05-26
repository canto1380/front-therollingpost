import React, {useState,useEffect} from 'react';
import { Row, Col } from "react-bootstrap";
import CardNoticia from './CardNoticia';


const NoticiasPrincipal = (props) => {
  // const {noticias, setConsultarNoticias} = props
  // console.log(noticias)

  return (
    <section className="my-3">
      <h4>Destacados</h4>
      <hr />
      <Row className="border border-success">
        <Col sm={12} md={7}>
          {/* {
            noticias.map((not) => <CardNoticia not={not} key={not._id} setConsultarNoticias={setConsultarNoticias}/>)
          } */}
          <CardNoticia></CardNoticia>
        </Col>
        <Col sm={12} md={5}>
          <CardNoticia></CardNoticia>
          <CardNoticia></CardNoticia>
        </Col>
      </Row>
    </section>
  );
};

export default NoticiasPrincipal;