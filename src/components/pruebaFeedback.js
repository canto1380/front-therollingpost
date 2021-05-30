import React, { useState } from "react";
import { Form, Container, InputGroup, Button, Alert } from "react-bootstrap";
const FormFeedback = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setAp] = useState("");
  const [error, setError] = useState(false);

  /*state para controlar valid e invalid en cada campo */
  const [nomValid, setNomValid] = useState("");
  const [nomInvalid, setNomInvalid] = useState("");
  const [apValid, setApValid] = useState("");
  const [apInvalid, setApInvalid] = useState("");

  const clearState = () => {
    setNombre("");
    setAp("");
    setError(false);
    setNomValid("");
    setNomInvalid("");
    setApValid("");
    setApInvalid("");
  };

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,}$/, // Letras y espacios, pueden llevar acentos.
  };
  const validarDatos = () => {
    setNomValid("");
    setNomInvalid("");
    let nom = expresiones.nombre;
    if (nombre !== "" && nom.test(nombre)) {
      setNomValid(true);
      console.log("nombre correcto");
      return false;
    } else {
      console.log("error en validacion");
      setNomInvalid(true);
      return true;
    }
  };
  const validarApe = () => {
    setApValid("");
    setApInvalid("");
    let nom = expresiones.nombre;
    if (apellido !== "" && nom.test(apellido)) {
      setApValid(true);
      console.log("apellido correcto");
      return false;
    } else {
      console.log("error en validacion");
      setApInvalid(true);
      return true;
    }
  };
  //Limitar limite maximo de caracteres ingresados en el imput
  const maxNum = (num) => {
    if (num.target.value.length > num.target.maxLength) {
      num.target.value = num.target.value.slice(0, num.target.maxLength);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarDatos(nombre) || validarApe(apellido)) {
      setError(true);
      console.log("error");
    } else {
      setError(false);

      clearState();
      e.target.reset();

      console.log("exito");
    }
  };
  return (
    <Container>
      <Form className="my-4" onSubmit={handleSubmit} id="formPrueba">
        <Form.Group className="mb-3">
          <InputGroup.Text>
            <Form.Label>
              *<b>Nombre:</b>
            </Form.Label>
          </InputGroup.Text>
          <Form.Control
            maxLength="25"
            onInput={maxNum}
            type="text"
            placeholder="Pedro"
            onChange={(e) => setNombre(e.target.value)}
            onBlur={validarDatos}
            isValid={nomValid}
            isInvalid={nomInvalid}
          />
          <Form.Control.Feedback type="invalid" className="text-danger small">
            Datos incorrectos
          </Form.Control.Feedback>
          {/* {error ? (
            <Form.Label className="text-danger">
              Campo obligatorio, El apellido debe contener entre 4 - 25
              caracteres
            </Form.Label>
          ) : null} */}
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup.Text>
            <Form.Label>
              *<b>Apellido:</b>
            </Form.Label>
          </InputGroup.Text>
          <Form.Control
            maxLength="25"
            onInput={maxNum}
            type="text"
            placeholder="Alvarez"
            onChange={(e) => setAp(e.target.value)}
            onBlur={validarApe}
            isValid={apValid}
            isInvalid={apInvalid}
          />
          <Form.Control.Feedback type="invalid" className="text-danger small">
            Datos incorrectos
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" varaiant="primary">
          Cargar
        </Button>
        {error ? <Alert variant="danger">Datos incorrectos</Alert> : null}
      </Form>
    </Container>
  );
};
export default FormFeedback;
