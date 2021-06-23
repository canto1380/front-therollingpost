import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faStar} from '@fortawesome/free-solid-svg-icons';
import {withRouter, Link}  from 'react-router-dom';
import Swal from 'sweetalert2';

const ItemCategoria = (props) => {
    const { cantDestacadas, tok} = props
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
                        props.history.push(`/menu-categorias/${tok}`);
                    }
                } catch (error) {
                    
                }        
            } else {
                let timerInterval
                Swal.fire({
                  title: 'No se puede definir mas categorías como destacadas',
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
                    props.history.push(`/menu-categorias/${tok}`);
                }
            } catch (error) {
                
            }
        }
    }
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center border border-secondary rounded herencia">
            <h5><i>{props.cat.nombreCategoria}</i></h5>
            <div>
                {
                    (!props.cat.destacada) ? (
                        <Button className="sad border-0" onClick={()=> destacarCategoria(props.cat._id, props.cat.nombreCategoria, props.cat.destacada)}>
                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        </Button>
                    ) : 
                    (
                        <Button className="mar border-0" title="Destacar categoria" onClick={()=> destacarCategoria(props.cat._id, props.cat.nombreCategoria, props.cat.destacada)}>
                            <FontAwesomeIcon icon={faStar} className="text-warning"></FontAwesomeIcon>
                        </Button>
                    )
                }  
            <Link className="btn limon mx-3" title="Editar categoria" to={`/menu-categorias/editarCategorias/${tok}/${props.cat._id}`}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                <Button className="rouge text-light border-0" onClick={()=> eliminarCategoria(props.cat._id)} title="Eliminar categoria">
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </Button>

            </div>
        </ListGroup.Item>
    );
};

export default withRouter(ItemCategoria);