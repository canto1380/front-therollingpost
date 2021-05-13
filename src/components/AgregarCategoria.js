import React, {useState} from "react";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import Swal from 'sweetalert2'
import ItemCategoria from "./ItemCategoria";
import { campoRequerido } from "../helpers/helpers";
import MsjError from "./MsjError";

const AgregarCategoria = (props) => {
    const { consultarAPICategorias, categorias } = props; 
    
    const url= process.env.REACT_APP_API_URL+'/categorias';

    /* State */
    const [nombreCategoria, setNombreCat] = useState('')
    const [err,setErr] = useState(false)

    /* Variables */
    let mensaje

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!campoRequerido(nombreCategoria)){
            setErr(true);
            setTimeout(() => {
                setErr(false)
            }, 2000);
        } else {
            setErr(false);
            
            const nuevaCategoria ={
                nombreCategoria
            }

            try {
                const config ={
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(nuevaCategoria)
                }
                const res = await fetch(url, config)
                console.log(res)
                if(res.status === 201){
                    Swal.fire(
                        'Categoria agregada!',
                        'SI',
                        'success'
                      )
                      consultarAPICategorias()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (err) {
        mensaje = (
          <MsjError text1="Datos incorrectos" text2="Intentelo nuevamente." />
        );
      }

  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col sm={12} lg={6}>
          <h1 className="mt-5">Agregar categoria</h1>
          <Form onSubmit={handleSubmit} className="my-3 p-3 border border-secundary">
            <Form.Group>
              <Form.Label>Nombre Categoria</Form.Label>
              <Form.Control type="text" placeholder="Nombre categoria" onChange={(e)=> setNombreCat(e.target.value)} />
            </Form.Group>
            <Button className="my-3 w-100" variant="primary" type="submit">
              Agregar
            </Button>
            <div>{mensaje}</div>
          </Form>
        </Col>
        <Col sm={12} lg={6}>
            <h1 className="mt-5">Categorias existentes</h1>
            <ListGroup className="my-3">
                {
                    categorias.map((cat) =><ItemCategoria cat={cat} key={cat.id} consultarAPICategorias={props.consultarAPICategorias}/>)
                }
            </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AgregarCategoria;
