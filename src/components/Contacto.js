import React, { useRef, useState } from "react";
import {
  Container,
  Alert,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const Contacto = () => {

  //variables useRef
const nombreRef = useRef("");
const mailRef = useRef("");
const telRef = useRef(0);
const consultaRef = useRef("");

  //States
  // const [nomAp, setNomAp] = useState("");
  // const [mail, setMail] = useState("");
  // const [num, setNum] = useState(0);
  // const [consulta, setConsulta] = useState("");
  const [error, setError] = useState(false);

  const validarMail = (email) => {
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    if (email.trim() !== "" && expresion.test(email)) {
      return false;
    } else {
      return true;
    }
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    //validaciones de campo
    if (nombreRef.current.value.trim() === "" || validarMail(mailRef.current.value) || consultaRef.current.value.trim() === "") {
      setError(true)

    } else {
      setError(false);

      const  mensajeEJS ={
        nombre: nombreRef.current.value,
        to_name: "Administrador",
        mail: `Email: ${mailRef.current.value}`,
        tel: `Telefono: ${telRef.current.value}`,
        consulta: consultaRef.current.value
      }

      console.log(mensajeEJS)
      
      emailjs.send("service_8p1isqq","template_olx58xg",mensajeEJS,"user_rQqHrh4fAD3sMZEdvbGTI")
       .then((result)=>{
      if(result.status===200){
        Swal.fire(
          'Consulta enviada',
          'Su consulta fue enviada con exito, responderemos a la brevedad',
          'success'
        )
      }
      console.log(result)
      e.target.reset();
     }, (error)=>{console.log(error.text);
     });
    };
  };

  return (
    <Container>
      <h1 className="text-center mt-3">Formulario de Contacto</h1>
      <Form className="my-3 border" onSubmit={handleSubmit}>
        <div className="mx-3 mt-3">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
            ref={nombreRef}
              placeholder="Alberto Perez"
              type="text"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
            ref={mailRef}
              placeholder="Matias@gmail.com"
              type="mail"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faPhoneAlt}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
            ref={telRef}
              placeholder="3816506555"
              type="number"
            />
          </InputGroup>
          <div className="mb-3">
            <Form.Group>
              <InputGroup.Text>
                <Form.Label>
                  *<b>Comentanos tu motivo de Contacto</b>
                </Form.Label>
              </InputGroup.Text>
              <Form.Control 
              ref={consultaRef}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Button className="btn w-75" type="submit"  variant="primary">
              Enviar
            </Button>
          </div>
          {error ? (
            <Alert variant="danger">Todos los campos son obligatorios</Alert>
          ) : null}
        </div>
      </Form>
    </Container>
  );
};
export default Contacto;
