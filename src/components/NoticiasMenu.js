import React from "react";
import { Container, Table, Form } from "react-bootstrap";
import ItemBotonera from "./ItemBotonera";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const NoticiasMenu = (props) => {
  return (
    <Container>
      <h1 className="text-center mt-3">Menu de Administracion de Noticias</h1>
      <hr />
      <Form>
        <section className="row my-3">
          <div className="col-sm-12 col-md-10 ">
            <h4>Agregar Noticia</h4>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="d-flex justify-content-end">
              <Link
                className="btn btn-success text-light botones"
                to={"/agregar-noticia"}
              >
                <FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon>
              </Link>
            </div>
          </div>
        </section>
        <hr />
        <h2 className="text-center my-3">Listado de Noticias</h2>
        <Table className="border my-3" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Titulo de Noticia</th>
              <th>Categoria</th>
              <th>Funcionalidades</th>
            </tr>
          </thead>
          <tbody>
            {props.noticias.map((noticia) => (
              <tr noticia={noticia} key={noticia._id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.categoria}</td>
                <td>
                  <ItemBotonera
                    noticia={noticia}
                    key={noticia._id}
                    consultarNoticias={props.consultarNoticias}
                    setConsultarNoticias={props.setConsultarNoticias}
                  ></ItemBotonera>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </Container>
  );
};

export default NoticiasMenu;
