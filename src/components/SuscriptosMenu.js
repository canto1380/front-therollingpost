import React, {useState, useEffect} from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ItemClientes from './ItemClientes';

const SuscriptosMenu = (props) => {

    const [clientes, setClientes] = useState([]);
    const [consultarClientes, setConsultarClientes] = useState(true);
    useEffect(()=>{
        const consultarAPIClientes = async ()=>{
          try{
            const res = await fetch (
              process.env.REACT_APP_API_URL + "/secure/clientes/suscripcion"
            )
            const infoClientes= await res.json();
            if (res.status === 200){
              setClientes(infoClientes);
            }
          }
          catch(error){
            console.log(error)
          }
        };
        consultarAPIClientes();
      },[consultarClientes])

      console.log(clientes)
    return (
        <Container>
<h1 className="text-center mt-2 mb-4">
    <i> Listado de Suscripciones</i></h1>
<ListGroup className="mb-3">
            {clientes.map((clientes)=>
                <ItemClientes clientes={clientes} key={clientes._id} tok={props.tok}
                 consultarClientes={props.consultarClientes} setConsultarClientes={props.setConsultarClientes}>          
                 </ItemClientes> )}
</ListGroup>

        </Container>
    );
};

export default SuscriptosMenu;