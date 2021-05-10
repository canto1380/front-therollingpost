import React from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgPortada from "../img/incio-registro.jpg";
const Login = () => {
  return (
    <Container>
      <div>
        <h1 className="display-1 mt-4 mb-3">Bienvenido!</h1>
      </div>
      <Row className="mt-3 d-flex justify-content-around">
        <Col sm={6} md={8}>
          <div className="">
            {/* <h1 className="text-center display-1 mb-3">Bienvenido!</h1> */}
            <Image className="w-100" src={ImgPortada} rounded />
          </div>
        </Col>
        <Col sm={6} md={4}>
          <div className="">
            
              <h1 className="text-center">Ingrese a su cuenta</h1>
              <div>
                <Form className="my-4">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="nombre@gmail.com" />
                  </Form.Group>

                  <Form.Group className="my-4" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password"/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" defaultChecked/>
                  </Form.Group>
                  <Button variant="primary" className="my-2 w-100" type="submit">
                    Ingresar
                  </Button>
                  <div className="text-center">
                    <Link to={'/'}>¿Olvidó su clave?</Link>
                  </div>
                </Form>
                <hr/>
                <div className="text-center">
                  <p>¿No tienes cuenta? <Link to={'/'}>Registrate!</Link></p>
                </div>
              </div>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
