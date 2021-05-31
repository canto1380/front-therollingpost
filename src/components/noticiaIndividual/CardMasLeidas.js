import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
// import {Link} from 'react-router-dom'
import ItemMasLeidas from './ItemNoticias';

const CardMasLeidas = (props) => {
    const {categoria, noticias} = props
    // console.log(categoria)
    // console.log(noticias)

    let noticiasXCat = noticias.filter(not => not.categoria === categoria)
    // console.log(noticiasXCat)
    let masLeidas = noticiasXCat.slice(1, 4)
    // console.log(masLeidas)
    
    return (
        <Container fluid className="p-0 component-mas-leidas">
            <div className="d-flex justify-content-between align-items-end my-1">
                <p className="m-0 fw-bolder">Mas leidas de {categoria}</p>
                <Button size="sm" className="btn btn-primary" to={'/'}>Ver mas</Button>
            </div>
            <hr className="mt-0"/>
            <ListGroup className="my-3">
                {
                    masLeidas.map((m)=><ItemMasLeidas ml={m} noticias={noticiasXCat} key={m._id}/>)
                }
                {/* Map donde recorre las primeras 5 noticias  */}
                {/* <ItemMasLeidas key={masLeidas._id} masLeidas={masLeidas}/>  */}
            </ListGroup>
        </Container>
    );
};

export default CardMasLeidas;