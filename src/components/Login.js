import React , {useState} from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import { Link, withRouter }   from "react-router-dom";
import Swal from "sweetalert2";

import ImgPortada from "../img/Inicio-registro.jpg";
import MsjError from "./MsjError";

const Login = (props) => {
  const {user} = props
  /* State */
  const [err, setErr] = useState(false); // Bandera
  const [usuario, setUsuario] = useState({
    email:'',
    password:''
  })
  const validacion = {
    id: "",
    token: ""
  };

  /*variables */
  let mensaje

  const handleValores =(e) =>{
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    user.map((u) => {
      if(usuario.email !== u.email){
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      } else{
        if(u.email === usuario.email && u.clave === usuario.password){
            /* Local Storage */
            setErr(false)
            validacion.id = u.id;
            validacion.token ='dsafdgre32rfgdhh5rgvfdg435345'
            localStorage.setItem('jwt',JSON.stringify(validacion))
           
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
              props.history.push("/");
            }
          });
        } else{
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 3000);
        }
      }
    });
  }
  if(err){
    mensaje =(
      <MsjError text1="Datos incorrectos" text2 ="Intentelo nuevamente."/>
    )
  }

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
                <Form className="my-4" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="nombre@gmail.com" onChange={handleValores}/>
                  </Form.Group>

                  <Form.Group className="my-4" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleValores}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" defaultChecked/>
                  </Form.Group>
                  <Button variant="primary" className="my-2 w-100" type="submit">
                    Ingresar
                  </Button>
                  <div>{mensaje}</div>
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

export default withRouter(Login);
