import React from 'react';
import {withRouter} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";

import "../../App.css"

const CardNoticiaIndividual = (props) => {
    const {not, comentLength} = props
    return (
        <section>
            <div>
                <h1>{not.titulo}</h1>
                <p className="lead">{not.descripcion}</p>
            </div>
            <div className="">
            <div className="ms-2 text-secondary">
                <span>{not.hora} hs |</span>
                <span className="me-3"> {not.fecha}</span>
                <span><FontAwesomeIcon icon={faComment} className="me-1" size="1x"></FontAwesomeIcon>{comentLength}</span>
            </div>
            <Image src={not.foto} className="d-block w-100 image-height"/>
            <div>
                <p className="text-secondary">{not.pieDeFoto}</p>
            </div>
            <hr/>
            </div>
            <div>
                <p className="text-font m-2">{not.descripNoticia}</p>
            </div>
            <hr/>
        </section>
    );
};

export default withRouter(CardNoticiaIndividual);