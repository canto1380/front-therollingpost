import React, { useRef, useState } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
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
          <h4 className="lead">Accedé sin limite a la informacion más confiable</h4>
          </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group >
          <div className="text-center">
          <h2>Acceso Digital individual</h2>
            <h3 className="text-primary">{props.precio}<span>/mes</span></h3>
          </div>
          <div className="d-flex justify-content-center my-3">
          <img src={suscripcion} className="imgSuscripcion" alt="" />
          </div>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  isValid={valid} isInvalid={inValid}   />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Acepto terminos y condiciones" />
        </Form.Group>
        <div className="d-flex justify-content-center my-4">
        <Button className="w-75 rounded-pill" variant="primary" type="submit">
          Suscribirme
        </Button>
        </div>
      </Form>
      </Container>
    );
};

export default Suscripcion;