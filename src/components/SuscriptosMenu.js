import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ItemClientes from './ItemClientes';

const SuscriptosMenu = (props) => {



    return (
        <Container>
<h1 className="text-center my-4">Listado de Suscripciones</h1>
<ListGroup>
{
                props.clientes.map((clientes)=><ItemClientes clientes={clientes} key={clientes._id} consultarClientes={props.consultarClientes}></ItemClientes> )  
            }
</ListGroup>
{/* <table className="w-100 mx-4">
    <thead>
        <tr>
            <th>Cliente</th>
            <th>Plan</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    {
                props.clientes.map((clientes)=><ItemClientes clientes={clientes} key={clientes._id} consultarClientes={props.consultarClientes}></ItemClientes> )  
            }
    </tbody>
</table> */}
        </Container>
            

           
        
    );
};

export default SuscriptosMenu;