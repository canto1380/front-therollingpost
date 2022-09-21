import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import AgregarPais from "./AgregarPais";

import { consultarPaisesAPI } from "../../../utils/queryAPI/paises";
import ItemPaises from "./ItemPaises";

const PaisesMenu = (props) => {
  const [consulta, setConsulta] = useState([]);
  const [paises, setPaises] = useState([]);
  const [banderaPais, setBanderaPais] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const items = [];

  let active = page;

  const handlePagination = (number) => {
    setPage(number)
    setBanderaPais(true)
  };

  for (let number = 1; number <= consulta.totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={(() => handlePagination(number))}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }


  useEffect(() => {
    if (banderaPais) {
      consultarAPI();
    }
  }, [banderaPais]);

  useEffect(() => {
    setBanderaPais(true);
}, [search]);

  const consultarAPI = async () => {
    setConsulta(await consultarPaisesAPI(setBanderaPais, page, 10, search));
    // setPaises(consulta?.paises);
  };

  useEffect(() => {
    setPaises(consulta.paises);
  }, [consulta]);
  return (
    <Container>
      <Row className="mt-3 mb-4 mx-0">
        <Col
          xs={6}
          lg={3}
          className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
        >
          <h4 className="my-0">
            <span className="rounded-3">
              <i>
                <big>Paises</big>
              </i>
            </span>
          </h4>
        </Col>
        <Col
          xs={6}
          lg={3}
          className="align-items-center mt-4 ps-0 text-end align-self-center p-0"
        >
          <Button
            className="btn planta text-light border-0"
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon
              className="me-2"
              size="lg"
              icon={faPlusSquare}
            ></FontAwesomeIcon>
            <i> Nuevo Pais</i>
          </Button>

          <AgregarPais
            show={modalShow}
            onHide={() => setModalShow(false)}
            tok={props.tok}
            setBanderaPais={setBanderaPais}
            setModalShow={setModalShow}
          />
        </Col>
        <Col
          xs={12}
          lg={6}
          className="align-items-center align-self-center mt-4 pe-0"
        >
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className=""
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <ListGroup className="my-4">
        {paises?.map((p) => (
          <ItemPaises
            key={p._id}
            p={p}
            tok={props.tok}
            setBanderaPais={setBanderaPais}
          />
        ))}
      </ListGroup>
        
      <Pagination>{items}</Pagination>
    </Container>
  );
};

export default PaisesMenu;
