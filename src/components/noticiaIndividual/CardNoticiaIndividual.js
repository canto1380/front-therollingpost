import React from 'react';
import {withRouter} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'

import LogoNR from "../../img/Logo-NR.png";
import "../../App.css"

const CardNoticiaIndividual = (props) => {
    const {not} = props
    return (
        <section>
            <div>
                <h1>{not.titulo}</h1>
                <p className="lead">{not.descripcion}</p>
            </div>
            <div className="">
            <div className="ms-2 text-secondary">
                <span>{not.fecha}</span>
                <span className="mx-3"> {not.hora}</span>
                <span><FontAwesomeIcon icon={faComment} className="me-1" size="1x"></FontAwesomeIcon>6</span>
            </div>
            <Image src={LogoNR} className="d-block w-100 image-height"/>
            <div>
                <p className="text-secondary">{not.pieDeFoto}</p>
            </div>
            <hr/>
            </div>
            <div className="border border-danger">
                <p className="text-font m-2">{not.descripNoticia}</p>
            </div>
            <hr/>
        </section>
    );
};

export default withRouter(CardNoticiaIndividual);