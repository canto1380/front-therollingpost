import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ItemCategoria from './ItemCategoria';

const CategoriaMenu = (props) => {
    const {categorias, cantDestacadas, tok} = props
    console.log(cantDestacadas)
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-5">
            <h1 className="my-0">Menu Categorías</h1>
            <Link className="btn btn-primary" to={`/menu-categorias/addCategoria/${tok}`}><FontAwesomeIcon className="me-2" size="lg" icon={faPlusSquare}></FontAwesomeIcon>Nueva Categoría</Link>
            </div>
            <ListGroup className="my-4">
            <span className="text-muted">* Se puede destacar un máximo de 4 categorías</span>
                {
                    categorias.map((cat) =><ItemCategoria cat={cat} key={cat._id} consultarCat={props.consultarCat} setConsultarCat={props.setConsultarCat} cantDestacadas={cantDestacadas} tok={props.tok}/>)
                    
                }
            </ListGroup>
        </Container>
    );
};

export default CategoriaMenu;