import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Pagination, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { consultarProvinciasAPI } from "../../../utils/queryAPI/provincias";
import AgregarProvincia from "./AgregarProvincia";
import ItemProvincias from "./ItemProvincias";

const ProvinciaMenu = (props) => {
  const { tok } = props;
  const [modalShow, setModalShow] = useState(false);
  const [consulta, setConsulta] = useState([])
  const [provincias, setProvincias] = useState([]);
  const [banderaProv, setBanderaProv] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const items =[]
  let active = page

  const handlePagination = (number) => {
    setPage(number)
    setBanderaProv(true)
  }

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
    if (banderaProv) {
      consultarAPI();
    }
  }, [banderaProv]);
  const consultarAPI = async () => {
    setConsulta(await consultarProvinciasAPI(setBanderaProv, page, 10, search));
    // setProvincias(consulta?.provincias)
  };

  useEffect(() => {
      setBanderaProv(true);
  }, [search]);


  useEffect(() => {
    setProvincias(consulta?.provincias)
  }, [consulta])

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
                <big>Provincias</big>
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
            <i> Nueva Provincia</i>
          </Button>

          <AgregarProvincia
            show={modalShow}
            onHide={() => setModalShow(false)}
            tok={props.tok}
            setBanderaProv={setBanderaProv}
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
        {provincias?.map((p) => (
          <ItemProvincias
            key={p._id}
            p={p}
            tok={tok}
            setBanderaProv={setBanderaProv}
          />
        ))}
      </ListGroup>
      <Pagination>{items}</Pagination>
    </Container>
  );
};

export default ProvinciaMenu;
