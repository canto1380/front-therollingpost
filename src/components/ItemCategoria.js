import React, {useState, useRef, useEffect} from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import {Link, useParams, withRouter}  from 'react-router-dom';
import Swal from 'sweetalert2';
import EditarCategoria from './EditarCategoria';
import {campoRequerido} from '../helpers/helpers'




const ItemCategoria = (props) => {

    // const { consultarAPICategorias, categorias } = props; 


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
                const url = `${process.env.REACT_APP_API_URL}/categorias/${id}`;
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
                        props.consultarAPICategorias();
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
            <Link className="btn btn-primary mx-3" to={`/menu-categorias/editarCategorias/${props.cat.id}`}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                <Button variant='danger' onClick={()=> eliminarCategoria(props.cat.id)}>
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </Button>
            </div>

            {/* ventana Modal EditarCategorias */}
            {/* <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Body>
            <h3>Editar categoria</h3>
        <Form  className="my-3 p-3 border border-secundary" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre Categoria</Form.Label>
              <Form.Control type="text" placeholder="ej: Politica" />
            </Form.Group>
            <Form.Check className="my-4" aria-label="destacar" name="categoria" inline label="Categoria destacada" value="destacado" ></Form.Check>
            <div className="d-flex justify-content-end">
            <div className="mx-2">
            <Button className="my-3 w-100" variant="primary" type="submit"  onClick={()=>{handleClose()}}>
            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>  Guardar
            </Button>
            </div>
                <div>
                <Button className="my-3 w-100" variant="danger"  onClick={()=>{handleClose()}}>
                <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                </Button>
            </div>
            </div>
          </Form>
        </Modal.Body>
            </Modal> */}
        </ListGroup.Item>
    );
};

export default ItemCategoria;