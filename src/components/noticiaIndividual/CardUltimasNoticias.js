import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import ItemMasLeidas from './ItemNoticias';


const CardUltimasNoticias = (props) => {
    const {ultimas3noticias} = props
    console.log(ultimas3noticias)

    return (
        <Container fluid className="p-0 component-mas-leidas">
            <div className="d-flex justify-content-between align-items-end my-1">
            <p className="m-0 fw-bolder">Ultimas noticias</p>
                <Button size="sm" className="btn btn-primary" to={'/'}>Ver mas</Button>
            </div>
            <hr className="mt-0"/>
            <ListGroup className="my-3">
                {/* Map donde recorre las primeras 5 noticias  */}
                {
                    ultimas3noticias.map((ultNoticias)=><ItemMasLeidas key={ultNoticias._id} n={ultNoticias}/>)
                }
                
            </ListGroup>
        </Container>
    );
};

export default CardUltimasNoticias;