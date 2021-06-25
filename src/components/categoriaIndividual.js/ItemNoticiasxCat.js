import React from 'react';
import {Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";

const ItemNoticiasxCat = (props) => {
    const {cat, noticiasXCat} = props
    return (
        <Row>
            <h1><i>Más noticias de {cat.nombreCategoria}</i></h1>
            <hr className="mb-0"/>
            {
               noticiasXCat.map((not) =>(
                <Col xs={12} sm={6} lg={4} key={not._id} className="my-2">
                <Link key={not._id} to={`/noti/${not.categoria}/${not._id}`}
                 className="text-dark text-decoration-none">
                  <div className="card tarjetaNoticia cardTall mt-3 border-0">
                    <div className="imgSpace d-flex align-content-start">
                    <img src={not.foto} alt="" />
                    </div>
                    <div className="card-body tarjetaNoticia-body">
                      <h5 className="card-title titleShort">{not.titulo}</h5>
                      <p className="card-text textShort">{not.descripcion}</p>
                    </div>
                      <div className="d-flex justify-content-between align-items-center m-3">
                        <p className="my-0 text-muted">{not.hora} hs | {not.fecha}</p>
                        <p className="my-0 text-muted"><FontAwesomeIcon icon={faComment} size="1x"
                         className="ms-1"></FontAwesomeIcon></p>
                      </div>
                  </div>
                </Link>
                </Col>
               )) 
            }
        </Row>
    );
};

export default ItemNoticiasxCat;