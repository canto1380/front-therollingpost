import React from 'react';
import {withRouter} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";
import "../../App.css"

const CardNoticiaIndividual = (props) => {
    const {not, comentLength} = props
    return (
        <section className="container">
            <div className="mt-3">
                <h1 className="mb-3"><badge className="backcolor text-info px-3 pt-0 pb-1 rounded-3"><big>{not.titulo}</big></badge></h1>
                <h4><i>{not.descripcion}</i></h4>
            </div>
            <div className="ms-2 text-secondary">
                <span>{not.hora} hs |</span>
                <span className="me-3"> {not.fecha}</span>
                <span><FontAwesomeIcon icon={faComment} className="me-1" size="1x"></FontAwesomeIcon>{comentLength}</span>
            </div>
            <Image src={not.foto} className="d-block w-100 image-height"/>
            <div>
                <p className="text-secondary lead">{not.pieDeFoto}</p>
            </div>
            <hr/>
            <div>
                <p className="text-font m-2">{not.descripNoticia}</p>
            </div>
        </section>
    );
};

export default withRouter(CardNoticiaIndividual);