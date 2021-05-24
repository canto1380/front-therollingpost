import React, { useRef, useState } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import suscripcion from '../img/suscripcion.png'


const Suscripcion = (props) => {

    
    const [valid, setValid] = useState("")
    const [inValid, setInValid] = useState("")
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        
        setValid(false)
        setInValid(true)
    }


    return (
        <Container className="my-4">
          <div className="text-center my-3">
          <h1 className="text-primary ">Informate de verdad</h1>
          <h4 className="lead">Accedé sin límite a la informacion más confiable</h4>
          </div>
          <div className="row">
        <Card className="col-sm-12 col-md-6 col-lg-4">
        <div className="text-center my-3 mx-4">
          <h2>Acceso Digital individual</h2>
            <h3 className="text-primary">{props.precio}<span>/mes</span></h3>
          <img src={suscripcion} className="w-100" alt="" />
          </div>
        </Card>
        <Card className="col-sm-12 col-md-6 col-lg-8">  
            <div className="mx-4 my-4">   
        <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  isValid={valid} isInvalid={inValid}   />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  isValid={valid} isInvalid={inValid}   />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox" className="my-4">
          <Form.Check type="checkbox" label="Acepto terminos y condiciones" />
        </Form.Group>
        <div className="d-flex justify-content-center my-4">
        <Button className="w-75 rounded-pill" variant="primary" type="submit">
          Suscribirme
        </Button>
          </div>
      </Form>
            </div>
            </Card>
        </div> 
      </Container>
    );
  };
  
export default Suscripcion;