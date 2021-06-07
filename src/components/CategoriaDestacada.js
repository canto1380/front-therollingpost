import React from 'react';
import { Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";

const CategoriaDestacada = (props) => {
    const { noticias, cat } = props

    return (
        <section className="my-5 w-100" >
            <div className="d-flex justify-content-between">
            <h4>{props.cat.nombreCategoria}</h4>
            <Button variant="primary" as={Link} to={`/${cat.nombreCategoria.toLowerCase()}`}>Ver más</Button>
            </div>
            <hr />
            <Row>
                {
                    noticias.map((not) => {
                        if (not.categoria === props.cat.nombreCategoria) {
                            
                            return (
                                <Col xs={12} md={6} lg={4} key={not._id} className="">
                                    <Link to={`/noti/${not.categoria}/${not._id}`} className="text-dark text-decoration-none" >
                                        <div className="card tarjetaNoticia cardTall mt-3">
                                            <img className="card-img-top w-100" src={not.foto} alt="" height="65%"/>
                                            <div className="card-body tarjetaNoticia-body">
                                                <h5 className="card-title">{not.titulo}</h5>
                                                <p className="card-text">{not.descripcion}</p>

                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-3 mx-3">
                                                <p className="my-0 text-muted">{not.hora} hs | {not.fecha}</p>
                                                <p className="my-0 text-muted">4<FontAwesomeIcon icon={faComment} size="1x" className="ms-1"></FontAwesomeIcon></p>
                                            </div>
                                        </div>  
                                    </Link>
                                </Col>
                            )
                        }
                        return null
                    }
                    )
                }
            </Row>
        </section>
    );
};

export default CategoriaDestacada;