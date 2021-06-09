import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { authenticate, signin } from "../helpers/helpers";

import ImgPortada from "../img/Inicio-registro.jpg";
import MsjError from "./MsjError";

const Login = (props) => {
  /* State */
  const [err, setErr] = useState(false); // Bandera
  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  });

  /*variables */
  let mensaje;

  const handleValores = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const valoresUser = {
      email: usuario.email,
      clave: usuario.password
    }
    // try {

      /* OPCION CON SIGNIN EXPORTADA */
    signin(valoresUser)
      .then(data => {
        
        if (data.error) {
          setUsuario({...usuario})
          console.log('error')
          console.log("ERRRORRRR")
           setErr(true);
           setTimeout(() => {
            setErr(false);
            }, 3000);
        } else {
          authenticate(
            data, () => {
              setUsuario({
                ...usuario
              })
            }
          )
          setErr(false);
          /*Swal */
          let timerInterval;
          Swal.fire({
            title: "Iniciando sesion",
            html: "",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                  const b = content.querySelector("b");
                  if (b) {
                    b.textContent = Swal.getTimerLeft();
                  }
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              props.history.push(`/`);
              props.setConsultarToken(!props.consultarToken)
            }
          });
        }
      })
      .catch(err =>{
        setUsuario({...usuario})
          console.log('error')
          console.log("ERRRORRRR")
           setErr(true);
           setTimeout(() => {
            setErr(false);
            }, 3000);
      })
  }

  if (err) {
    mensaje = (
      <MsjError text1="Datos incorrectos" text2="Intentelo nuevamente." />
    );
  }

  return (
    <Container>
      <div>
        <h1 className="display-1 mt-4 mb-3"><i>Bienvenido!</i></h1>
      </div>
      <Row className="mt-3 d-flex justify-content-around">
        <Col sm={6} md={8}>
          <div className="mb-5">
            <Image className="w-100" src={ImgPortada} rounded />
          </div>
        </Col>
        <Col sm={6} md={4}>
          <div className="">
            <h1 className="text-center"><badge className="backcolor text-light px-3 pt-0 pb-2 rounded-3"><i>Ingrese a su cuenta</i></badge></h1>
            <div>
              <Form className="my-4" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="nombre@gmail.com"
                    onChange={handleValores}

                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleValores}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Recordarme"
                    defaultChecked
                  />
                </Form.Group>
                <Button variant="primary" className="my-2 w-100" type="submit">
                  Ingresar
                </Button>
                <div>{mensaje}</div>
                <div className="text-center">
                  <Link to={"/"}>¿Olvidó su clave?</Link>
                </div>
              </Form>
              <hr />
              <div className="text-center">
                <p>
                  ¿No tienes cuenta? <Link to={"/suscripcion"}>Registrate!</Link>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
