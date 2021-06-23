import React from 'react';
import {withRouter} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

const CardNoticiaIndividual = (props) => {
    const {not, comentLength} = props
    return (
        <section className="container border border-secondary rounded-3 mt-3">
            <div className="mt-1">
                <div>
                    <h1 className="mb-3 mt-3"><span className="fs-1 ">{not.titulo}</span></h1>
                </div>
                <h4><i>{not.descripcion}</i></h4>
            </div>
            <div className="ms-2 text-secondary">
                <span>{not.hora} hs |</span>
                <span className="me-3"> {not.fecha}</span>
                <span>{comentLength}<FontAwesomeIcon icon={faComment} className="me-1" size="1x"></FontAwesomeIcon></span>
            </div>
            <Image src={not.foto} className="d-block w-100 image-height"/>
            <div>
                <p className="text-secondary lead">{not.pieDeFoto}</p>
            </div>
            <hr/>
            <div>
                <p className="text-font m-2">{not.descripNoticia}</p>
            </div>
            <div className="d-flex justify-content-end">
                <p className="text-muted mt-2">Autor: <i>{not.autor}</i> </p>
            </div>
        </section>
    );
};

export default withRouter(CardNoticiaIndividual);