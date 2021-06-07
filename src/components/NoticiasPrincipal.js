import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";


const NoticiasPrincipal = (props) => {
  const { ultimasNoticias, ultimaNoticia } = props
  let url = `${process.env.REACT_APP_API_URL}/noticias/foto`
  return (
    <section className="mt-3">
      <h4>Destacados</h4>
      <hr />
      <Row>
          {
            ultimaNoticia.map((not) =>
            <Col className="" xs={12} md={8} key={not._id}>
              <Link to={`/noti/${not.categoria.nombreCategoria}/${not._id}`} className="text-dark text-decoration-none h-100" >
                <div className="card tarjetaNoticia">
                  <img className="card-img-top w-100" src={not.foto} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{not.titulo}</h5>
                    <p className="card-text">{not.descripcion}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3 mx-3">
                    <p className="my-0 text-muted">{not.hora} hs | {not.fecha}</p>
                    <p className="my-0 text-muted">6<FontAwesomeIcon icon={faComment} size="1x" className="ms-1"></FontAwesomeIcon></p>
                  </div>
                </div>
          </Link>
          <hr/>
        </Col>
            )
          }
          <Col xs={12} md={4} className="qww">
        {
          ultimasNoticias.map((not) =>
            <Link to={`/noti/${not.categoria.nombreCategoria}/${not._id}`} className="qww text-dark text-decoration-none" key={not._id}>
              <div className="card tarjetaNoticia ">
                <img className="card-img-top" src={not.foto} alt="" />
                <div className="card-body">
                  <h5 className="card-title">{not.titulo}</h5>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 mx-3">
                    <p className="my-0 text-muted">{not.hora} hs | {not.fecha}</p>
                    <p className="my-0 text-muted">6<FontAwesomeIcon icon={faComment} size="1x" className="ms-1"></FontAwesomeIcon></p>
                  </div>
              </div>
              <hr/>
            </Link>
          )
        }
        </Col>
      </Row>
    </section >
  );
};

export default NoticiasPrincipal;