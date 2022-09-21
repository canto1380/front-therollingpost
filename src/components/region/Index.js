import React from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";

import PaisesMenu from "./pais/PaisesMenu";
import ProvinciaMenu from "./provincia/ProvinciaMenu";
import LocalidadMenu from "./localidad/LocalidadMenu";

const Region = (props) => {
  const { tok } = props 

  return (
    <Container>
      <Row className="mt-3 mb-4 mx-0">
        <Col
          xs={12}
          className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
        >
          <h1 className="my-0">
            <span className="rounded-3">
              <i>
                <big>Menu Regiones</big>
              </i>
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="my-5">
        <Tabs defaultActiveKey="paises">
          <Tab eventKey="paises"  title='Paises'><PaisesMenu tok={tok}/></Tab>
          <Tab eventKey="prov" title='Provincias'><ProvinciaMenu tok={tok}/></Tab>
          <Tab eventKey="local" title='Localidades'><LocalidadMenu tok={tok}/></Tab>
        </Tabs>
      </Row>

    </Container>
  );
};

export default Region;
