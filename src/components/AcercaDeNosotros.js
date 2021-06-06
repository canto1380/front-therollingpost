import React from "react";
import { Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImgPortada from "../img/Inicio-registro.jpg";

const AcercaDeNosotros = () => {
  return (
    <Fragment>
      <section className="py-5 bg-secondary">
        <h1 className="text-center text-light">Acerca de Nosotros</h1>
      </section>
      <Container className="my-4">
        <Row>
          <Col className="mb-3" xs={12} md={6}>
            <Card>
              <Card.Img variant="top" src={ImgPortada} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AcercaDeNosotros;
