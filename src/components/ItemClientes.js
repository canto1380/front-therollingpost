import React, { useState } from 'react';
import {  Button, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faUserTimes, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import emailjs from "emailjs-com"


const ItemClientes = (props) => {
    const [btnAceptRech, setBtnAceptRech]= useState (false)
    const [btnCancelar, setBtnCancelar]= useState (true)
    
    const aceptarSuscripcion = () =>{
        setBtnAceptRech(true)
        setBtnCancelar(false)
        
        try{
          const msjAceptar = {
            to_name: props.clientes.nomAp,
            to_email: props.clientes.email
          };

          emailjs
          .send(
            "service_rv2mgme",
            "template_dbxgmzc",
            msjAceptar,
            "user_wpyRroNYiS1PONkZ8OEJe"
          )
          .then(
            (result) => {
              if (result.status === 200) {
                Swal.fire(
                  'Solicitud aceptada',
                  "la solicitud de suscripcion ha sido aceptada",
                  'success'
                );
              }
              setBtnAceptRech(true)
        setBtnCancelar(false)
            },
            async(error) => {
              console.log(error.text);
              Swal.fire(
                'A ocurrido un error',
                'Por favor intentelo de nuevo mas tarde',
                'warning'
              )
      })
        }catch(error){
          console.log(error)
        }
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
                    "Content-Type":"application/json",
                    "authorization": props.tok
                  }
                } ); 
                if(respuesta.status ===200){
                  props.setConsultarClientes(!props.consultarClientes);
                  Swal.fire(
                    'Eliminada',
                    'La suscripcion ha sido cancelada o rechazada',
                    'success'
                  )
                  // setConsultarClientes(!consultarClientes);
                }
              }catch(error){
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
        <ListGroupItem className="herencia border border-secondary">
             <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-4">
                <p>{props.clientes.email} <span className="badge lemon text-dark" hidden={btnAceptRech}>
                  <big><i>Pendiente</i></big></span></p>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                <p><b><i>{props.clientes.plan}</i></b></p>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 d-flex justify-content-end">
                        <Button className="mx-3 planta border-0" hidden={btnAceptRech}
                         onClick={()=>aceptarSuscripcion()} title="Aceptar suscripción">
                            <FontAwesomeIcon icon={faUserCheck} className="fa-lg"></FontAwesomeIcon></Button>
                        <Button className="mx-3 rouge border-0" hidden={btnAceptRech}
                         onClick={()=>rechazarCancelarSuscripcion(props.clientes._id)} title="Rechazar suscripción">
                           <FontAwesomeIcon icon={faUserTimes} className="fa-lg"></FontAwesomeIcon></Button>
                        <Button className="mx-3 rouge border-0" hidden={btnCancelar}
                         onClick={()=>rechazarCancelarSuscripcion(props.clientes._id)} title="Cancelar suscripción">
                           <FontAwesomeIcon icon={faUserMinus} className="fa-lg"></FontAwesomeIcon></Button>
                </div>  
            </div>
              
        </ListGroupItem>
       

            
           
            
        
    );
};

export default ItemClientes;