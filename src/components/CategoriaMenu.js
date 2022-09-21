import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ItemCategoria from "./ItemCategoria";

const CategoriaMenu = (props) => {
  const { categorias, cantDestacadas } = props;
  console.log(props.aa);
  return (
    <section className="d-flex justify-content-center">
      <Container className="row ">
        <div className="d-flex justify-content-center justify-content-md-start align-items-center mt-4 ps-0 col-12 col-md-6">
          <h1 className="my-0">
            <span className=" px-3 pt-1 pb-2 rounded-3">
              <i>
                <big>Menu de Categorías</big>
              </i>
            </span>
          </h1>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end align-items-center  mt-4 col-12 col-md-6">
          <Link
            className="btn planta text-light"
            to={`/menu-categorias/addCategoria`}
          >
            <FontAwesomeIcon
              className="me-2"
              size="lg"
              icon={faPlusSquare}
            ></FontAwesomeIcon>
            <i> Nueva Categoría</i>
          </Link>
        </div>
        <ListGroup className="my-4">
          <span className="text-muted">
            * Se puede destacar un máximo de 4 categorías
          </span>
          {categorias.map((cat) => (
            <ItemCategoria
              cat={cat}
              key={cat._id}
              tok={props.tok}
              noticias={props.noticias}
              consultarCat={props.consultarCat}
              setConsultarCat={props.setConsultarCat}
              cantDestacadas={cantDestacadas}
              consultarNoticias={props.consultarNoticias}
              setConsultarNoticias={props.setConsultarNoticias}
            />
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};

export default CategoriaMenu;
