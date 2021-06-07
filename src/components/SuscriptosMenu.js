import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ItemClientes from './ItemClientes';

const SuscriptosMenu = (props) => {

    return (
        <Container>
<h1 className="text-center my-2">Listado de Suscripciones</h1>
<ListGroup>
{
                props.clientes.map((clientes)=><ItemClientes clientes={clientes} key={clientes._id} consultarClientes={props.consultarClientes} setConsultarClientes={props.setConsultarClientes}></ItemClientes> )  
            }
</ListGroup>

        </Container>
            

           
        
    );
};

export default SuscriptosMenu;