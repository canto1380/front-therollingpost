import React from "react";
import { Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ImgAvPA from "../img/AvPA.png";
import ImgAvNG from "../img/AvNG.jpg";
import ImgAvAP from "../img/AvAP.png";
import ImgAvAle from "../img/AvAle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope} from "@fortawesome/free-regular-svg-icons";
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
              <Card.Title className="text-center text-dark">
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
                <Card.Text className="text-dark">
                    Edad: 27 años. Hola soy Alejandro Peñalba y soy Estudiante de
                    Ingeniería en Sistemas, próximamente programador Full Stack.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center text-dark">
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
                <Card.Text className="text-dark">
                    Edad: 31 años. Hola soy Alejandro Poviña, soy Ingeniero
                    Industrial próximamente programador Full Stack.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center text-dark">
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
                <Card.Text className="text-dark">
                    Edad: 27 años. Hola soy Nicolas Guardo, soy Técnico Superior
                    en Programación, próximamente programador Full Stack.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={12} md={6}>
            <Card className="border border-dark">
              <Card.Title className="text-center text-dark">
                <h2>
                  <i>Pablo Alonso</i>
                </h2>
              </Card.Title>
              <Card.Img variant="top" src={ImgAvPA} alt="Pablo Alonso Avatar" />
              <Card.Body>
                <Card.Text className="text-dark">
                    Edad: 28 años. Hola soy Pablo Julian Alonso Olivera, soy ayudante de
                    laboratorio y programador Full Stack.
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
            Somos el grupo 1 de la comisión 7A del curso de FullStack de RollingCode School, y este es nuestro
            proyecto final : "The Rolling Post". Somos un grupo de estudiantes
            apasionados por el desarrollo web, aspirantes a ser programadores de
            Full Stack.
          </p>
        </section>
        <section className="py-2 bg-primary mb-3 rounded-1">
          <h3 className="text-center text-light">
            <i>¿Que es Rolling-Post?</i>
          </h3>
          <hr className="mx-1 text-light" />
          <p className="mx-4 text-light">
            The Rolling Post es una plataforma de noticias, orientada a un
            mercado mas joven y moderno. Es un diario digital, donde encontraras
            las mejores noticias en los diversos ámbitos, sea nacional o
            internacional. Nuestro enfoque es traerte las ultimas noticias e
            información actualizada, al instante. No te pierdas la oportunidad
            de estar al dia con los últimos eventos del dia a dia. Esperamos que
            disfruten de esta nueva experiencia.
          </p>
        </section>
        <section className="py-2 bg-info mb-3 rounded-1 ">
          <h3 className="text-center text-light">
            <i>¿Como contactarnos?</i>
          </h3>
          <hr className="mx-1 text-light" />
          <div className="row">
            <div className="col-12 col-md-6">
            <ul className="list-group-flush">
              <li className="list-group-item bg-info text-light">
               <i><b>Alejandro Peñalba:</b></i> 
                <ul className="list-group bg-info mt-2">
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-2x me-3"></FontAwesomeIcon>
                    atapenalba16@gmail.com
                  </li>
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faGithub} className="fa-2x me-3"></FontAwesomeIcon>
                   <a href="https://github.com/canto1380" className="text-light" target="_blank"  rel="noreferrer">
                    https://github.com/canto1380
                   </a>
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-info text-light ">
               <i><b>Nicolas Guardo:</b></i>
                <ul className="list-group bg-info mt-2">
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-2x me-3"></FontAwesomeIcon>
                  nguardorui@gmail.com  
                  </li>
                  <li className="list-group-item bg-info text-light ">
                  <FontAwesomeIcon icon={faGithub} className="fa-2x me-3"></FontAwesomeIcon>
                  <a href="https://github.com/NicoG72/" className="text-light" target="_blank"  rel="noreferrer">
                  https://github.com/NicoG72/
                  </a>
                  </li>
                </ul>
              </li>
              </ul>
              </div>
            <div className="col-12 col-md-6">
            <ul className="list-group-flush">
              <li className="list-group-item bg-info text-light">
               <i><b>Pablo Julian Alonso Olivera:</b></i> 
                <ul className="list-group bg-info mt-2">
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-2x me-3"></FontAwesomeIcon>
                   pepoalonso1@gmail.com
                  </li>
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faGithub} className="fa-2x me-3"></FontAwesomeIcon>
                  <a href="https://github.com/PaulJaver" className="text-light" target="_blank"  rel="noreferrer">
                     https://github.com/PaulJaver
                    </a>
                  </li>
                </ul>
              </li>
              <li className="list-group-item bg-info text-light">
               <i><b>Alejandro Poviña:</b></i> 
                <ul className="list-group bg-info mt-2">
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-2x me-3"></FontAwesomeIcon>
                   alejandro.povina@gmail.com
                  </li>
                  <li className="list-group-item bg-info text-light">
                  <FontAwesomeIcon icon={faGithub} className="fa-2x me-3"></FontAwesomeIcon>
                   <a href="https://github.com/alejandro-povina" className="text-light" target="_blank"  rel="noreferrer">
                     https://github.com/alejandro-povina
                     </a> 
                  </li>
                </ul>
              </li>
              </ul>
            </div>
            </div>
        </section>
        <div className="d-flex justify-content-center mb-4">
          <Link className="btn mar w-50  text-light" to={"/"}>
            <FontAwesomeIcon icon={faHome} className="fa-2x "></FontAwesomeIcon>
          </Link>
        </div>
      </Container>
    </Fragment>
  );
};

export default AcercaDeNosotros;
