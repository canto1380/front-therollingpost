import React from 'react';
import {withRouter} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";

import LogoNR from "../../img/Logo-NR.png";
import "../../App.css"

const CardNoticiaIndividual = () => {
    return (
        <section>
            <div>
                <h1>Titulo de la noticia</h1>
                <p className="lead">Descripcion breve de la noticia</p>
            </div>
            <div className="">
            <div className="ms-2 text-secondary">
                <span>17/05/2021</span>
                <span className="mx-3">18:05</span>
                <span><FontAwesomeIcon icon={faComment} className="me-1" size="1x"></FontAwesomeIcon>6</span>
            </div>
            <Image src={LogoNR} className="d-block w-100 image-height"/>
            <div>
                <p className="text-secondary">Pie de pagina de la foto de la noticia</p>
            </div>
            <hr/>
            </div>
            <div className="border border-danger">
                <p className="text-font">Tucumán: los alumnos de las 15 localidades "aisladas" se quedan sin clases presenciales - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894082/actualidad/tucuman-alumnos-15-localidades-aisladas-se-quedan-sin-clases-presenciales.html.

                Tucumán: los alumnos de las 15 localidades "aisladas" se quedan sin clases presenciales - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894082/actualidad/tucuman-alumnos-15-localidades-aisladas-se-quedan-sin-clases-presenciales.htmlTucumán: los alumnos de las 15 localidades "aisladas" se quedan sin clases presenciales - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894082/actualidad/tucuman-alumnos-15-localidades-aisladas-se-quedan-sin-clases-presenciales.html.

                Tucumán: los alumnos de las 15 localidades "aisladas" se quedan sin clases presenciales - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894082/actualidad/tucuman-alumnos-15-localidades-aisladas-se-quedan-sin-clases-presenciales.html

                Tucumán: los alumnos de las 15 localidades "aisladas" se quedan sin clases presenciales - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894082/actualidad/tucuman-alumnos-15-localidades-aisladas-se-quedan-sin-clases-presenciales.html.

                Empresarios piden una suba del boleto en Tucumán: ¿cuánto dicen que debería costar el pasaje? - Nota de la LA GACETA https://www.lagaceta.com.ar/nota/894078/actualidad/empresarios-piden-suba-boleto-tucuman-cuanto-dicen-deberia-costar-pasaje.html
                </p>
            </div>
            <hr/>
        </section>
    );
};

export default withRouter(CardNoticiaIndividual);