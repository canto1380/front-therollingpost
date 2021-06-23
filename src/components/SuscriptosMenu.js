import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ItemClientes from './ItemClientes';

const SuscriptosMenu = (props) => {

    return (
        <Container>
<h1 className="text-center mt-2 mb-4">
    <i> Listado de Suscripciones</i></h1>
<ListGroup className="mb-3">
            {props.clientes.map((clientes)=>
                <ItemClientes clientes={clientes} key={clientes._id}
                 consultarClientes={props.consultarClientes} setConsultarClientes={props.setConsultarClientes}>          
                 </ItemClientes> )}
</ListGroup>

        </Container>
    );
};

export default SuscriptosMenu;