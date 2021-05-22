import React, {useState} from "react";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import ItemCategoria from "./ItemCategoria";
import { campoRequerido } from "../helpers/helpers";
import MsjError from "./MsjError";
import { withRouter } from "react-router";

const AgregarCategoria = (props) => {
    const { setConsultarCat, categorias } = props; 
    
    const url= process.env.REACT_APP_API_URL+'/categorias/addCategoria';

    /* State */
    const [nombreCategoria, setNombreCat] = useState('')
    const [err,setErr] = useState(false)

    /* Variables */
    let mensaje;

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
                      setConsultarCat(true)
                      e.target.reset()
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
            <Form.Group className="d-flex justify-content-end">
            <Button className="my-3 mx-2" variant="primary" type="submit">
              Agregar
            </Button>
            <Link className="my-3 btn btn-primary" variant="primary" to={'/menu-categorias'}>
              Volver
            </Link>
            </Form.Group>
            <div>{mensaje}</div>
          </Form>
        </Col>
        <Col sm={12} lg={6}>
            <h1 className="mt-5">Categorias existentes</h1>
            <ListGroup className="my-3">
                {
                    categorias.map((cat) =><ItemCategoria cat={cat} key={cat._id} setConsultarCat={props.setConsultarCat}/>)
                }
            </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(AgregarCategoria);
