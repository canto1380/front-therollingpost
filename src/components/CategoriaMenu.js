import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ItemCategoria from "./ItemCategoria";
import { consultarCategoriasAPI } from "../utils/queryAPI/categorias";

const CategoriaMenu = (props) => {
  const { cantDestacadas, tok } = props;
  const [consulta, setConsulta] = useState([]);
  const [categorias, setCategorias] = useState([])
  const [banderaCategoria, setBanderaCategoria] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const items =[]
  let active = page

  const handlePagination = (number) => {
    setPage(number);
    setBanderaCategoria(true);
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
    if(banderaCategoria) {
      consultarAPI()
    }
  }, [banderaCategoria])
  const consultarAPI = async () => {
    setConsulta( await consultarCategoriasAPI(setBanderaCategoria, page, 10, search))
  }

  useEffect(() => {
    setBanderaCategoria(true);
  }, [search]);

  useEffect(() => {
    setCategorias(consulta?.categorias);
  }, [consulta]);

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
                <big>Menu Categorias</big>
              </i>
            </span>
          </h1>
        </Col>
      </Row>
      <hr/>
      <Row className='mt-3 mb-4 mx-0'>
      <Col
          xs={6}
          lg={3}
          className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
        >
          <h4 className="my-0">
            <span className="rounded-3">
              <i>
                <big>Categorias</big>
              </i>
            </span>
          </h4>
        </Col>
        <Col
          xs={6}
          lg={3}
          className="align-items-center mt-4 ps-0 text-end align-self-center p-0"
        >
          <Link
            className="btn planta text-light border-0"
            to={`/menu-categorias/addCategoria`}
          >
            <FontAwesomeIcon
              className="me-2"
              size="lg"
              icon={faPlusSquare}
            ></FontAwesomeIcon>
            <i> Nueva Categoria</i>
          </Link>
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
          <span className="text-muted">
            * Se puede destacar un máximo de 4 categorías
          </span>
          {categorias?.map((cat) => (
            <ItemCategoria
              cat={cat}
              key={cat._id}
              tok={tok}
              noticias={props.noticias}
              consultarCat={props.consultarCat}
              setConsultarCat={props.setConsultarCat}
              cantDestacadas={cantDestacadas}
              consultarNoticias={props.consultarNoticias}
              setConsultarNoticias={props.setConsultarNoticias}
              setBanderaCategoria={setBanderaCategoria}
            />
          ))}
        </ListGroup>
      </Container>
  );
};

export default CategoriaMenu;
