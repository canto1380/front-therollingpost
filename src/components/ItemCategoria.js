import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom'

const ItemCategoria = (props) => {
    const eliminarCategoria =(id) =>{
        console.log('btn eliminando')
    }
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h5 className="text-dark">{props.cat.nombreCategoria}</h5>
            <div>
                <Link to={`/productos/editar/${props.cat.id}`} className=" btn btn-warning me-2 text-light">
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                <Button variant='danger' onClick={()=> eliminarCategoria(props.cat.id)}>
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default ItemCategoria;