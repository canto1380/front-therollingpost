import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {Link}  from 'react-router-dom';
import Swal from 'sweetalert2';

const ItemCategoria = (props) => {

const eliminarCategoria =(id) =>{
        Swal.fire({
            title: '¿Esta seguro de eliminar la categoria?',
            text: "No podras recuperarla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            CancelButtonText: 'Cancelar'
          })
          .then(async(result)=>{
            if(result.isConfirmed){
                const url = `${process.env.REACT_APP_API_URL}/categorias/deleteCategoria/${id}`;
                try {
                    const config ={
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }
                    const res = await fetch(url, config)
                    console.log(res)
                    if(res.status === 200){
                        
                        Swal.fire(
                            'Categoria eliminada',
                            'La categoria seleccionada fue borrada correctamente',
                            'success'
                          )
                        // actualizar los datos de la lista de productos
                        props.setConsultarCat(true);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
          })
    }
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h5 className="text-dark">{props.cat.nombreCategoria}</h5>
            <div>
            <Link className="btn btn-primary mx-3" to={`/menu-categorias/editarCategorias/${props.cat._id}`}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                <Button variant='danger' onClick={()=> eliminarCategoria(props.cat._id)}>
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default ItemCategoria;