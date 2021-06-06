import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faStar} from '@fortawesome/free-solid-svg-icons';
import {withRouter, Link}  from 'react-router-dom';
import Swal from 'sweetalert2';

const ItemCategoria = (props) => {
    const { cantDestacadas} = props
    const eliminarCategoria =(id) =>{
        Swal.fire({
            title: '¿Esta seguro de eliminar la categoria?',
            text: "No podras recuperarla",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
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
                        props.setConsultarCat(!props.consultarCat);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
          })
    }
    const destacarCategoria = async(id, nombre, destacada) =>{
        const url = `${process.env.REACT_APP_API_URL}/categorias/updateCategoria/${id}`
        if(!destacada){
            if(cantDestacadas <4){
                try {
                    const categoriaModificada = {
                        nombreCategoria: nombre,
                        destacada: !destacada
                    }
                    const res = await fetch(url,{
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(categoriaModificada)
                    })
                    if(res.status ===200){
                        props.setConsultarCat(!props.consultarCat);
                        props.history.push("/menu-categorias");
                    }
                } catch (error) {
                    
                }        
            } else {
                let timerInterval
                Swal.fire({
                  title: 'No se puede definir mas categorias como destacadas',
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                      const content = Swal.getHtmlContainer()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = Swal.getTimerLeft()
                        }
                      }
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('No se puede definir mas categorias como destacadas')
                  }
                })
            }
        } else {
            try {
                const categoriaModificada = {
                    nombreCategoria: nombre,
                    destacada: !destacada
                }
                const res = await fetch(url,{
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(categoriaModificada)
                })
                if(res.status ===200){
                    props.setConsultarCat(!props.consultarCat);
                    props.history.push("/menu-categorias");
                }
            } catch (error) {
                
            }
        }
    }
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h5  className="text-dark">{props.cat.nombreCategoria}</h5>
            <div>
                {
                    (!props.cat.destacada) ? (
                        <Button variant='secondary' onClick={()=> destacarCategoria(props.cat._id, props.cat.nombreCategoria, props.cat.destacada)}>
                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        </Button>
                    ) : 
                    (
                        <Button variant='success' onClick={()=> destacarCategoria(props.cat._id, props.cat.nombreCategoria, props.cat.destacada)}>
                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        </Button>
                    )
                }  
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

export default withRouter(ItemCategoria);