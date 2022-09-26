import React, { useEffect, useState } from "react";
import { Container, Table, Form, Row, Col, Pagination } from "react-bootstrap";
import ItemBotonera from "./ItemBotonera";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { consultarNoticiasAPI } from "../utils/queryAPI/noticias";

const NoticiasMenu = (props) => {
  const { tok } = props;

  const [consulta, setConsulta] = useState([])
  const [noticiass, setNoticiass] = useState([])
  const [search, setSearch] = useState("");
  const [banderaNoticia, setBanderaNoticia] = useState(true)
  const [page, setPage] = useState(1);

  const items = []
  let active =page

  const handlePagination = (number) => {
    setPage(number)
    setBanderaNoticia(true)
  }
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

  useEffect(() =>{
    if(banderaNoticia) {
      consultarAPI()
    }
  }, [banderaNoticia])
  const consultarAPI = async () => {
    setConsulta(await consultarNoticiasAPI(setBanderaNoticia, page, 10, search))
  }
  useEffect(() => {
    setBanderaNoticia(true);
  }, [search]);

  useEffect(() => {
    setNoticiass(consulta?.noticias);
  }, [consulta]);

  return (
    <Container>
      <Row className="mt-3 mb-4 mx-0">
        <Col
          xs={12}
          className="align-items-center mt-4 ps-0 justify-content-center-md-start p-0"
        >
          <h1 className="my-0">
            <span className="rounded-3">
              <i>
                <big>Menu Noticias</big>
              </i>
            </span>
          </h1>
        </Col>
      </Row>
      <hr />
        <Row className="mt-3 mb-4 mx-0">
          <Col
            xs={6}
            lg={3}
            className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
          >
            <h4 className="my-0">
              <span className="rounded-3">
                <i>
                  <big>Noticias</big>
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
              to={`/menu-noticias/agregar-noticia`}
              className="btn planta text-light border-0"
            >
              <FontAwesomeIcon
                className="me-2"
                size="lg"
                icon={faPlus}
              ></FontAwesomeIcon>
              <i> Nueva Noticia</i>
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
        <Table
          className="border my-3 herencia"
          striped
          hover
          bordered
          responsive
        >
          <thead>
            <tr className="backcolor text-light">
              <th>
                <i>Titulo de Noticia</i>
              </th>
              <th>
                <i>Categoría</i>
              </th>
              <th>
                <i>Funcionalidades</i>
              </th>
            </tr>
          </thead>
          <tbody>
            {noticiass?.map((noticia) => (
              <tr key={noticia._id} className="herencia">
                <td>{noticia.titulo}</td>
                <td>{noticia.categoria?.nombreCategoria}</td>
                <td>
                  <ItemBotonera
                    noticia={noticia}
                    key={noticia._id}
                    tok={tok}
                    setBanderaNoticia={setBanderaNoticia}
                  ></ItemBotonera>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      <Pagination>{items}</Pagination>
    </Container>
  );
};

export default NoticiasMenu;
