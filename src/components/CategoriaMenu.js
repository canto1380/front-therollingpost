import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ItemCategoria from './ItemCategoria';

const CategoriaMenu = (props) => {
    const {categorias} = props
    console.log(categorias)
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-5">
            <h1 className="my-0">Menu Categorias</h1>
            <Link className="btn btn-primary" to={'/menu-categorias/addCategoria'}><FontAwesomeIcon className="me-2" size="lg" icon={faPlusSquare}></FontAwesomeIcon>Nueva Cateogria</Link>
            </div>
            <ListGroup className="my-4">
                {
                    categorias.map((cat) =><ItemCategoria cat={cat} key={cat.id} setConsultarCat={props.setConsultarCat}/>)
                }
            </ListGroup>
        </Container>
    );
};

export default CategoriaMenu;