import React, { useState } from 'react';
import {  Button, ListGroupItem, Badge  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons'


const ItemClientes = (props) => {
    const [btnAceptRech, setBtnAceptRech]= useState (false)
    const [btnCancelar, setBtnCancelar]= useState (true)
    
    const aceptarSuscripcion = () =>{
        setBtnAceptRech(true)
        setBtnCancelar(false)
    }

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
                        <Button variant="danger" className="mx-3" hidden={btnAceptRech}><FontAwesomeIcon icon={faUserTimes}></FontAwesomeIcon>Rechazar</Button>
                        <Button variant="danger" className="mx-3" hidden={btnCancelar}><FontAwesomeIcon icon={faUserTimes}></FontAwesomeIcon>Cancelar suscripcion</Button>
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