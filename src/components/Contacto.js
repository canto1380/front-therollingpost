import React, { useState } from "react";
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

const Contacto = () => {
  //States
  const [nomAp, setNomAp] = useState("");
  const [mail, setMail] = useState("");
  const [num, setNum] = useState(0);
  const [consulta, setConsulta] = useState("");
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
    if (nomAp.trim() === "" || validarMail(mail) || consulta.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
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
              placeholder="Alberto Perez"
              type="text"
              onChange={(e) => setNomAp(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Matias@gmail.com"
              type="mail"
              onChange={(e) => setMail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faPhoneAlt}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="3816506555"
              type="number"
              onChange={(e) => setNum(parseInt(e.target.value))}
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
                as="textarea"
                rows={3}
                onChange={(e) => setConsulta(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Button className="btn w-75" type="submit" variant="primary">
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
