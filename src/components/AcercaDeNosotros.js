import React from "react";
import { Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImgAvPA from "../img/AvPA.png";
import ImgAvNG from "../img/AvNG.jpg";
import ImgAvAP from "../img/AvAP.png";
import ImgAvAle from "../img/AvAle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AcercaDeNosotros = () => {
  return (
    <Fragment>
      <section className="py-4 mt-3 backcolor container rounded">
        <h1 className="text-center text-light">
          <i>Acerca de Nosotros</i>
        </h1>
      </section>
      <Container className="my-4">
        <Row>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center">
                <h2>
                  <i>Alejandro Peñalba</i>
                </h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvAP}
                alt="Alejandro Peñalba Avatar"
              />
              <Card.Body>
                <Card.Text>
                  <p>
                    Edad: 27 años, Hola soy Pablo Peñalba y soy Estudiante de
                    Ingenieria en Sistemas, proximamente programador Full Stack.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center">
                <h2>
                  <i>Alejandro Poviña</i>
                </h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvAle}
                alt="Alejandro Poviña Avatar"
              />
              <Card.Body>
                <Card.Text>
                  <p>
                    Edad: 31 años, Hola soy Pablo Poviña, soy Ingreniero
                    Industrial proximamente programador Full Stack.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center">
                <h2>
                  <i>Nicolas Guardo</i>
                </h2>
              </Card.Title>
              <Card.Img
                variant="top"
                src={ImgAvNG}
                alt="Nicolas Guardo Avatar"
              />
              <Card.Body>
                <Card.Text>
                  <p>
                    Edad: 27 años, Hola soy Nicolas Guardo, soy Tecnico Superior
                    en Programacion proximamente programador Full Stack.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center">
                <h2>
                  <i>Pablo Alonso</i>
                </h2>
              </Card.Title>
              <Card.Img variant="top" src={ImgAvPA} alt="Pablo Alonso Avatar" />
              <Card.Body>
                <Card.Text>
                  <p>
                    Edad: 28 años, Hola soy Pablo Alonso, soy ayudante en
                    laboratorio, programador Full Stack.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <section className="py-2 backcolor mb-3 rounded-1">
          <h3 className="text-center text-light">
            <i>¿Quienes somos?</i>
          </h3>
          <hr className="mx-1 text-light" />
          <p className="mx-4 text-light">
            Buenas tardes somos el grupo 1, de la comision 7A, Y este es nuestro
            proyecto final : "The Rolling Post" somos un grupo de estudiantes ,
            apasionados por el desarrollo web, aspirantes a ser programadores
            Full Stack.
          </p>
        </section>
        <section className="py-2 bg-primary mb-3 rounded-1">
          <h3 className="text-center text-light">
            <i>¿Que es Rolling-Post?</i>
          </h3>
          <hr className="mx-1 text-light" />
          <p className="mx-4 text-light">
            The Rolling Post: Es una plataforma de noticias, orientada a un
            mercado mas joven y moderno Es un diario digital, donde encontraras
            las mejores noticias, en los diversos ambitos, sea nacional o
            internacional, nos enfocamos en traerte las ultimas noticias,
            informacion actualizada, al instante No te pierdas las oportunidad
            de estar al dia con los ultimos eventos que ocurren esperamos que
            disfruten de esta nueva expriencia.
          </p>
        </section>
        <section className="py-2 bg-info mb-3 rounded-1">
          <h3 className="text-center text-light">
            <i>¿Como contactarnos?</i>
          </h3>
          <hr className="mx-1 text-light" />
          <p className="mx-4 text-light">
            <ul className="list-group bg-info">
              <li className="list-group-item bg-info">
                Alejandro Poviña:
                <hr />
                <ul className="list-group bg-info">
                  <li className="list-group-item bg-info">
                    alejandro.povina@gmail.com
                  </li>
                  <li className="list-group-item bg-info">
                    https://github.com/alejandro-povina
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-info">
                Alejandro Peñalba:
                <hr />
                <ul className="list-group bg-info">
                  <li className="list-group-item bg-info">
                    atapenalba16@gmail.com
                  </li>
                  <li className="list-group-item bg-info">
                    https://github.com/canto1380
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-info">
                Pablo Julian Alonso Olivera:
                <hr />
                <ul className="list-group bg-info">
                  <li className="list-group-item bg-info">
                    pepoalonso1@gmail.com
                  </li>
                  <li className="list-group-item bg-info">
                    https://github.com/PaulJaver
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-info">
                Nicolas Guardo:
                <hr />
                <ul className="list-group bg-info">
                  <li className="list-group-item bg-info">
                    nguardorui@gmail.com
                  </li>
                  <li className="list-group-item bg-info">
                    https://github.com/NicoG72/
                  </li>
                </ul>
              </li>
            </ul>
          </p>
        </section>
        <div className="d-flex justify-content-center mb-4">
          <Link className="btn btn-primary w-50 border-dark" to={"/"}>
            <FontAwesomeIcon icon={faHome} className="fa-2x "></FontAwesomeIcon>
          </Link>
        </div>
      </Container>
    </Fragment>
  );
};

export default AcercaDeNosotros;
