import React from "react";
import { Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImgAvPA from "../img/AvPA.png";
import ImgAvNG from "../img/AvNG.jpg";
import ImgAvAP from "../img/AvAP.png";
import ImgAvAle from "../img/AvAle.png";

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
              <Card.Title className="text-center">
                <h2>Alejandro Peñalva</h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvAP}
                alt="Alejandro Peñalva Avatar"
              />
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card>
              <Card.Title className="text-center">
                <h2>Alejandro Poviña</h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvAle}
                alt="Alejandro Poviña Avatar"
              />
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card>
              <Card.Title className="text-center">
                <h2>Nicolas Guardo</h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvNG}
                alt="Nicolas Guardo Avatar"
              />
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card>
              <Card.Title className="text-center">
                <h2>Pablo Alonso</h2>
              </Card.Title>
              <Card.Img variant="top" src={ImgAvPA} alt="Pablo Alonso Avatar" />
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <section className="py-5 bg-secondary mb-3">
          <h3 className="text-center text-light">¿Quienes Somos?</h3>
          <hr className="mx-1 text-light" />
          <p className="mx-1 text-light">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, euismod
            fusce suspendisse nostra viverra vestibulum, scelerisque nam gravida
            himenaeos facilisis tempus. Cum enim viverra sodales eu mus
            nascetur, tortor vulputate mauris vestibulum dignissim fermentum,
            penatibus nullam tellus rhoncus suscipit. Curae fringilla
            ullamcorper turpis tristique ornare id ante viverra, nullam quisque
            venenatis commodo netus ridiculus curabitur mus, faucibus dictumst
            mattis vehicula vestibulum lectus parturient. Nec integer dui rutrum
            tortor laoreet ornare cum magnis imperdiet ligula, sed quisque
            porttitor eleifend hac dictumst fames risus commodo, orci sapien
            blandit vitae gravida odio ad parturient conubia.
          </p>
        </section>
        <section className="py-5 bg-primary mb-3">
          <h3 className="text-center text-light">¿Que es Rolling-Post?</h3>
          <hr className="mx-1 text-light" />
          <p className="mx-1 text-light">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, euismod
            fusce suspendisse nostra viverra vestibulum, scelerisque nam gravida
            himenaeos facilisis tempus. Cum enim viverra sodales eu mus
            nascetur, tortor vulputate mauris vestibulum dignissim fermentum,
            penatibus nullam tellus rhoncus suscipit. Curae fringilla
            ullamcorper turpis tristique ornare id ante viverra, nullam quisque
            venenatis commodo netus ridiculus curabitur mus, faucibus dictumst
            mattis vehicula vestibulum lectus parturient. Nec integer dui rutrum
            tortor laoreet ornare cum magnis imperdiet ligula, sed quisque
            porttitor eleifend hac dictumst fames risus commodo, orci sapien
            blandit vitae gravida odio ad parturient conubia.
          </p>
        </section>
        <section className="py-5 bg-info">
          <h3 className="text-center text-light">¿Como Contactarnos?</h3>
          <hr className="mx-1 text-light" />
          <p className="mx-1 text-light">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, euismod
            fusce suspendisse nostra viverra vestibulum, scelerisque nam gravida
            himenaeos facilisis tempus. Cum enim viverra sodales eu mus
            nascetur, tortor vulputate mauris vestibulum dignissim fermentum,
            penatibus nullam tellus rhoncus suscipit. Curae fringilla
            ullamcorper turpis tristique ornare id ante viverra, nullam quisque
            venenatis commodo netus ridiculus curabitur mus, faucibus dictumst
            mattis vehicula vestibulum lectus parturient. Nec integer dui rutrum
            tortor laoreet ornare cum magnis imperdiet ligula, sed quisque
            porttitor eleifend hac dictumst fames risus commodo, orci sapien
            blandit vitae gravida odio ad parturient conubia.
          </p>
        </section>
      </Container>
    </Fragment>
  );
};

export default AcercaDeNosotros;
