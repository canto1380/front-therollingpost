import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { consultarLocalidadesAPI } from "../../../utils/queryAPI/localidades";
import AgregarLocalidad from "./AgregarLocalidad";
import ItemLocalidades from "./ItemLocalidades";

const LocalidadMenu = (props) => {
  const { tok } = props;
  const [modalShow, setModalShow] = useState(false);
  const [consulta, setConsulta] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [banderaLocalidad, setBanderalocalidad] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const items = [];
  let active = page;

  const handlePagination = (number) => {
    setPage(number);
    setBanderalocalidad(true);
  };
  for (let number = 1; number <= consulta.totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handlePagination(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    if (banderaLocalidad) {
      consultarAPI();
    }
  }, [banderaLocalidad]);
  const consultarAPI = async () => {
    setConsulta(
      await consultarLocalidadesAPI(setBanderalocalidad, page, 10, search)
    );
  };

  useEffect(() => {
    setBanderalocalidad(true);
  }, [search]);

  useEffect(() => {
    setLocalidades(consulta?.localidades);
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
                <big>Localidades</big>
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
            <i> Nueva Localidad</i>
          </Button>

          <AgregarLocalidad
            show={modalShow}
            onHide={() => setModalShow(false)}
            tok={props.tok}
            setBanderaLocalidad={setBanderalocalidad}
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
        {localidades?.map((p) => (
          <ItemLocalidades
            key={p._id}
            p={p}
            tok={tok}
            setBanderaLocalidad={setBanderalocalidad}
          />
        ))}
      </ListGroup>
      <Pagination>{items}</Pagination>
    </Container>
  );
};

export default LocalidadMenu;
