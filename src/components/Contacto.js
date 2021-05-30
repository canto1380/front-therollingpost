import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const Contacto = () => {
  //variables useRef
  const nombreRef = useRef("");
  const mailRef = useRef("");
  const telRef = useRef(0);
  const consultaRef = useRef("");
  //States
  const [nomAp, setNomAp] = useState("");
  const [mail, setMail] = useState("");
  const [num, setNum] = useState("");
  const [consulta, setConsulta] = useState("");
  const [error, setError] = useState(false);
  //validaciones Feedback
  const [nomApValid, setNomApValid] = useState("");
  const [nomApInvalid, setNomApInvalid] = useState("");
  const [mailValid, setMailValid] = useState("");
  const [mailInvalid, setMailInvalid] = useState("");
  const [telValid, setTelValid] = useState("");
  const [telInvalid, setTellInvalid] = useState("");
  const [consultaValid, setConsultaValid] = useState("");
  const [consultaInvalid, setConsultaInvalid] = useState("");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{12,}$/, // Letras y espacios, pueden llevar acentos.
    consulta: /^[a-zA-Z0-9-ZÀ-ÿ\s]{50,}$/, // Letras y espacios, pueden llevar acentos.
    telefono: /^\d{10,}$/, // 7 a 14 numeros.
    email: /\w+@\w+\.[a-z]{2,}$/,
  };

  const mensajeEJS = {
    nombre: nombreRef.current.value,
    to_name: "Administrador",
    mail: `Email: ${mailRef.current.value}`,
    tel: `Telefono: ${telRef.current.value}`,
    consulta: consultaRef.current.value,
  };

  const valNomAp = () => {
    setNomApValid("");
    setNomApInvalid("");
    const text = expresiones.nombre;
    if (nomAp.trim() !== "" && text.test(nomAp)) {
      setNomApValid(true);
      return false;
    } else {
      setNomApInvalid(true);
      return true;
    }
  };

  const valMail = () => {
    setMailValid("");
    setMailInvalid("");
    const mje = expresiones.email;
    if (mail.trim() !== "" && mje.test(mail)) {
      setMailValid(true);
      return false;
    } else {
      setMailInvalid(true);
      return true;
    }
  };

  const valNum = () => {
    setTelValid("");
    setTellInvalid("");
    const cel = expresiones.telefono;
    if (num.trim() !== "" && cel.test(num)) {
      setTelValid(true);
      return false;
    } else {
      setTellInvalid(true);
      return true;
    }
  };

  const valConsulta = () => {
    setConsultaValid("");
    setConsultaInvalid("");
    const consul = expresiones.consulta;
    if (consulta.trim() !== "" && consul.test(consulta)) {
      setConsultaValid(true);
      return false;
    } else {
      setConsultaInvalid(false);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validaciones de campo
    if (
      valNomAp(nomAp) ||
      valMail(mail) ||
      valNum(num) ||
      valConsulta(consulta)
    ) {
      setError(true);
    } else {
      setError(false);
      enviarConsulta();
      limpiarForm();
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const limpiarForm = (e) => {
    e.target.reset();
    setNomAp("");
    setMail("");
    setNum("");
    setConsulta("");
    setError(false);
    setNomApValid("");
    setNomApInvalid("");
    setMailValid("");
    setMailInvalid("");
    setTelValid("");
    setTellInvalid("");
    setConsultaValid("");
    setConsultaInvalid("");
  };

  const enviarConsulta = (e) => {
    emailjs
      .send(
        "service_8p1isqq",
        "template_olx58xg",
        mensajeEJS,
        "user_rQqHrh4fAD3sMZEdvbGTI"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            Swal.fire(
              "Consulta enviada",
              "Su consulta fue enviada con exito, responderemos a la brevedad",
              "success"
            );
          }
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container>
      <h1 className="text-center mt-3">Formulario de Contacto</h1>
      <Form
        className=" mt-4 m-3 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <section className="row mb-3 m-0 p-0 py-2 bg-secondary text-white">
          <div className="col-sm-12 col-md-10 m-0 p-0">
            <h2 className="mx-1">Ingresa tu motivo de contacto: </h2>
          </div>
          <div className="col-sm-12 col-md-2 m-0 p-0">
            <div className="d-flex justify-content-end pt-1 mx-1">
              <Link className="btn btn-primary w-50 " to={"/"}>
                <FontAwesomeIcon
                  icon={faHome}
                  className="fa-2x"
                ></FontAwesomeIcon>
              </Link>
            </div>
          </div>
        </section>
        <div className="mx-3 mt-3">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              ref={nombreRef}
              maxLength="35"
              placeholder="Alberto Perez"
              type="text"
              onChange={(e) => setNomAp(e.target.value)}
              onBlur={valNomAp}
              isValid={nomApValid}
              isInvalid={nomApInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12 - 40
              caracteres.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              ref={mailRef}
              maxLength="50"
              placeholder="Matias@gmail.com"
              type="mail"
              onChange={(e) => setMail(e.target.value)}
              onBlur={valMail}
              isValid={mailValid}
              isInvalid={mailInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12 - 50
              caracteres.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                *<FontAwesomeIcon icon={faPhoneAlt}></FontAwesomeIcon>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              ref={telRef}
              maxLength="12"
              placeholder="3816506555"
              type="number"
              onChange={(e) => setNum(e.target.value)}
              onBlur={valNum}
              isValid={telValid}
              isInvalid={telInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 10 - 12
              caracteres.
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Comentanos tu motivo de Contacto</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              ref={consultaRef}
              maxLength="300"
              as="textarea"
              rows={3}
              onChange={(e) => setConsulta(e.target.value)}
              onBlur={valConsulta}
              isValid={consultaValid}
              isInvalid={consultaInvalid}
            />
            <Form.Label>
              <p>{consulta.length}/300</p>
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12 - 40
              caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center mb-3">
            <Button className="btn w-75" type="submit" variant="primary">
              Enviar
            </Button>
          </div>
        </div>
      </Form>
      {error ? (
        <p className="text-danger">
          Este campo es obligatorio y debes ingresar como minimo 12 caracteres.
        </p>
      ) : null}
    </Container>
  );
};
export default Contacto;
