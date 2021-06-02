import React, { useState } from 'react';
import {  Button, ListGroupItem, Badge  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faUserTimes, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";


const ItemClientes = (props) => {

    const [btnAceptRech, setBtnAceptRech]= useState (false)
    const [btnCancelar, setBtnCancelar]= useState (true)
    
    const aceptarSuscripcion = () =>{
        setBtnAceptRech(true)
        setBtnCancelar(false)
    }

    const rechazarCancelarSuscripcion = (id)=> {
        Swal.fire({
            title: 'Esta seguro que desea cancelar o rechazar la suscripcion?',
            text: "No podrá deshacer la operacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: "Cancelar"
          }).then(async(result) => {
            if (result.isConfirmed) {
              
              const URL = `${process.env.REACT_APP_API_URL}/clientes/${id}`;
              try{
                const respuesta = await fetch(URL, {
                  method : "DELETE",
                  headers: {
                    "Content-Type":"application/json"
                  }
                } ); 
                console.log(respuesta);
                if(respuesta.status ===200){
                  console.log(URL)
                  Swal.fire(
                    'Eliminada',
                    'La suscripcion ha sido cancelada o rechazada',
                    'success'
                  )
                props.setConsultarClientes(true);
                }
              }catch(error){
                  console.log(error)
                  Swal.fire(
                    'Ha ocurrido un error',
                    'Por favor intente nuevamente',
                    'error'
                  )
              }
              
            }
          })
        };  
    

    return (

        <ListGroupItem>
 <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-4">
                <p>{props.clientes.email} <Badge variant="warning">Solicitud Pendiente</Badge></p>
                
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                <p> {props.clientes.plan}</p>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 d-flex justify-content-end">
                        <Button variant="success" className="mx-3" hidden={btnAceptRech} onClick={()=>aceptarSuscripcion()}> <FontAwesomeIcon icon={faUserCheck}></FontAwesomeIcon>Aceptar</Button>
                        <Button variant="danger" className="mx-3" hidden={btnAceptRech} onClick={()=>rechazarCancelarSuscripcion(props.clientes._id)}><FontAwesomeIcon icon={faUserTimes}></FontAwesomeIcon>Rechazar</Button>
                        <Button variant="danger" className="mx-3" hidden={btnCancelar} onClick={()=>rechazarCancelarSuscripcion(props.clientes._id)}><FontAwesomeIcon icon={faUserMinus}></FontAwesomeIcon>Cancelar suscripcion</Button>
                </div>
                
                
            </div>
              {/* <tr>
             <td>{props.clientes.email}</td>
             <td>{props.clientes.plan}</td>
             <td className="d-flex justify-content-end">
              <Button variant="success" className="mx-2">Aceptar</Button>
                 <Button variant="danger" className="mx-2">Rechazar</Button>
             </td>
             </tr> */}
        </ListGroupItem>
       

            
           
            
        
    );
};

export default ItemClientes;