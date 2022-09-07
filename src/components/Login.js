import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
// import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";
import { authenticate, signin } from "../helpers/helpers";
import ImgPortada from "../img/Inicio-registro.jpg";
import MsjError from "./MsjError";

const Login = (props) => {
  const { setTok } = props
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
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 3000);
          } else {
            setTok(data)
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
              }
            });
          }
        })
        .catch((err) => {
          setUsuario({ ...usuario });
          console.log("error");
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
      <div className="d-none d-lg-block">
        <h1 className="display-1 mt-4 mb-3">
          <i>Bienvenido!</i>
        </h1>
      </div>
      <Row className="mt-3 d-flex justify-content-around">
        <Col lg={8}>
          <div className="mb-5 d-none d-lg-block">
            <Image className="w-100" src={ImgPortada} rounded />
          </div>
        </Col>
        <Col sm={12} lg={4}>
          <h1 className="text-center">
            <span className=" pb-3 px-3">
              <big>
                <i>Ingrese a su cuenta</i>
              </big>
            </span>
          </h1>
          <div>
            <Form className="my-4" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  maxLength="40"
                  type="email"
                  name="email"
                  placeholder="nombre@gmail.com"
                  onChange={handleValores}
                  onBlur={logUsuario}
                  isValid={logValid}
                  isInvalid={logInvalid}
                />
                <Form.Control.Feedback type="invalid" className="text-danger ">
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
                <Form.Control.Feedback type="invalid" className="text-danger ">
                  Campo Obligatorio, al menos debe contener entre 8 - 15
                  caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recordarme" defaultChecked />
              </Form.Group>
              <Button className="my-2 w-100 mar" type="submit">
                <b>
                  <i>Ingresar</i>
                </b>
              </Button>
              <div>{mensaje}</div>
              <div className="text-center">
                <Link to={"/"}>¿Olvidó su clave?</Link>
              </div>
            </Form>
            <hr />
            
            <div className="text-center">
              <p>
                ¿No tienes cuenta? <Link to={"/registrarse"}>Registrate!</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
