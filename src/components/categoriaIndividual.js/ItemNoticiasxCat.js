import React from 'react';
import { Card,Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import LogoNR from "../../img/Logo-NR.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";

const ItemNoticiasxCat = (props) => {
    const {cat, noticiasXCat} = props
    console.log(noticiasXCat)
    
    // let date = new Date('2013-08-03T02:00:00Z');
    // let year = fecha.getFullYear();
    // let month = fecha.getMonth()+1;
    // let dt = fecha.getDate();
    // console.log(dt+"/"+month+"/"+year)

    return (
        <Row>
            <h1>Mas noticias de {cat.nombreCategoria}</h1>
            {
               noticiasXCat.map((not) =>(
                <Col xs={12} sm={6} lg={4} className="d-flex justify-content-center align-items-center h-100 my-4" key={not._id}>
                <Link key={not._id} to={'/noticia/idd'} className="text-dark text-decoration-none">
                  <div className="card tarjetaNoticia">
                    <img className="card-img-top w-100" src={LogoNR} alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{not.titulo}</h5>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <p className="my-0 text-muted">{not.updatedAt}</p>
                        <p className="my-0 text-muted">6<FontAwesomeIcon icon={faComment} size="1x" className="ms-1"></FontAwesomeIcon></p>
                      </div>
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