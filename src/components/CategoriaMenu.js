import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ItemCategoria from './ItemCategoria';

const CategoriaMenu = (props) => {
    const {categorias} = props
    return (
        <Container>
            <div className="d-flex justify-content-between mt-5">
            <h1 className="my-0">Menu Categorias</h1>
            <Button><FontAwesomeIcon className="me-2" size="lg" icon={faPlusSquare}></FontAwesomeIcon>Nueva Cateogria</Button>
            </div>
            <ListGroup className="my-4">
                {
                    categorias.map((cat) =><ItemCategoria cat={cat} key={cat.id} consultarAPICategorias={props.consultarAPICategorias}/>)
                }
            </ListGroup>
        </Container>
    );
};

export default CategoriaMenu;