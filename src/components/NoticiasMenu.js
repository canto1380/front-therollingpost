import React from "react";
import { Container, Table, Form } from "react-bootstrap";
import ItemBotonera from "./ItemBotonera";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NoticiasMenu = (props) => {
  const { noticias, consultarNoticias, setConsultarNoticias} = props;
  return (
    <Container className="mb-3">
      
      <h1 className="text-center mt-3"><i>Menu de Administración de Noticias</i></h1>
      <hr />
      <Form>
        <section className="row my-3">
          <div className="col-10 ">
            <h4><i>Agregar noticia</i></h4>
          </div>
          <div className="col-2">
            <div className="d-flex justify-content-end">
              <Link
                className="btn planta text-light"
                to={`/menu-noticias/agregar-noticia`}
                title="Agregar noticia"
              >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </Link>
            </div>
          </div>
        </section>
        <hr />
        <h2 className="text-center my-3"><span className="backcolor badge"><big><i>Listado de Noticias</i></big></span></h2>
        <Table className="border my-3 herencia" striped hover bordered responsive>
          <thead>
            <tr className="backcolor text-light">
              <th><i>Titulo de Noticia</i></th>
              <th><i>Categoría</i></th>
              <th><i>Funcionalidades</i></th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia._id} className="herencia">
                <td>{noticia.titulo}</td>
                <td>{noticia.categoria?.nombreCategoria}</td>
                <td>
                  <ItemBotonera
                    noticia={noticia}
                    key={noticia._id}
                    tok={props.tok}
                    consultarNoticias={consultarNoticias}
                    setConsultarNoticias={setConsultarNoticias}
                    
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
