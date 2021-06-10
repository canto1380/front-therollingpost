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
    password: "",
  });
  //validaciones de feed
  const [logValid, setLogValid] = useState("");
  const [logInvalid, setLogInvalid] = useState("");
  const [passValid, setPassValid] = useState("");
  const [passInvalid, setPassInvalid] = useState("");

  const expresiones = {
    email: /\w+@\w+\.[a-z]{2,}$/,
    password: /^[a-zA-Z0-9-ZÀ-ÿ\s]{8,}$/,
  };

  const logUsuario = () => {
    setLogValid("");
    setLogInvalid("");
    const mail = expresiones.email;
    if (usuario.email.trim() !== "" && mail.test(usuario.email)) {
      setLogValid(true);
      return false;
    } else {
      setLogInvalid(true);
      return true;
    }
  };

  const logPass = () => {
    setPassValid("");
    setPassInvalid("");
    const pass = expresiones.password;
    if (usuario.password.trim() !== "" && pass.test(usuario.password)) {
      setPassValid(true);
      return false;
    } else {
      setPassInvalid(true);
      return true;
    }
  };

  /*variables */
  let mensaje;

  const handleValores = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valoresUser = {
      email: usuario.email,
      clave: usuario.password,
    };
    if (logUsuario(usuario.email) || logPass(usuario.password)) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    } else {
      signin(valoresUser)
        .then((data) => {
          if (data.error) {
            setUsuario({ ...usuario });
            console.log("error");
            console.log("ERRRORRRR");
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 3000);
          } else {
            authenticate(data, () => {
              setUsuario({
                ...usuario,
              });
            });
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
                props.setConsultarToken(!props.consultarToken);
              }
            });
          }
        })
        .catch((err) => {
          setUsuario({ ...usuario });
          console.log("error");
          console.log("ERRRORRRR");
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 3000);
        });
    }
  };
  if (err) {
    mensaje = (
      <MsjError text1="Datos incorrectos" text2="Intentelo nuevamente." />
    );
  }

  return (
    <Container>
      <div>
        <h1 className="display-1 mt-4 mb-3">
          <i>Bienvenido!</i>
        </h1>
      </div>
      <Row className="mt-3 d-flex justify-content-around">
        <Col sm={6} md={8}>
          <div className="mb-5">
            <Image className="w-100" src={ImgPortada} rounded />
          </div>
        </Col>
        <Col sm={6} md={4}>
          <div className="">
            <h1 className="text-center">
              <badge className="backcolor text-light px-3 pt-0 pb-2 rounded-3">
                <i>Ingrese a su cuenta</i>
              </badge>
            </h1>
            <div>
              <Form className="my-4" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    maxLength="30"
                    type="email"
                    name="email"
                    placeholder="nombre@gmail.com"
                    onChange={handleValores}
                    onBlur={logUsuario}
                    isValid={logValid}
                    isInvalid={logInvalid}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger small"
                  >
                    Campo Obligatorio, al menos debe contener entre 12 - 40
                    caracteres.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    maxLength="15"
                    type="password"
                    name="password"
                    onChange={handleValores}
                    onBlur={logPass}
                    isValid={passValid}
                    isInvalid={passInvalid}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger small"
                  >
                    Campo Obligatorio, al menos debe contener entre 12 - 15
                    caracteres.
                  </Form.Control.Feedback>
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
                  ¿No tienes cuenta?{" "}
                  <Link to={"/suscripcion"}>Registrate!</Link>
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
