import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

import { withRouter } from "react-router-dom";
import MsjError from "./MsjError";

const Registrarse = (props) => {
  const { setConsultarUser, usuarios } = props;
  console.log(usuarios);

  const URL = process.env.REACT_APP_API_URL + "/user/addUser";
  const URL_LOCALIDADES =
    process.env.REACT_APP_API_URL + "/localidad/localidadesNoEliminadas";
  const URL_PROVINCIAS =
    process.env.REACT_APP_API_URL + "/provincia/provinciasNoEliminadas";
  const URL_PAISES = process.env.REACT_APP_API_URL + "/pais/paisesNoEliminados";

  const [localidades, setLocalidades] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [paises, setPaises] = useState([]);

  const [client, setClient] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    telefono: "",
    direccion: "",
    idLocalidad: "",
    idProvincia: "",
    idPais: "",
    codigoPostal: "",
  });
  const [error, setError] = useState(false);
  const [err1, setErr1] = useState(false); //mensaje de error en valicaciones general
  const [err2, setErr2] = useState(false); //mensaje de error para email en uso
  const handleValores = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  /*States para feedback formulario*/
  const [nomValid, setNomValid] = useState("");
  const [nomInvalid, setNomInvalid] = useState("");
  const [apeValid, setApeValid] = useState("");
  const [apeInvalid, setApeInvalid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [emailInvalid, setEmailInvalid] = useState("");
  const [claveValid, setClaveValid] = useState("");
  const [claveInValid, setClaveInvalid] = useState("");
  const [reClave, setReClave] = useState("");
  const [reClaveValid, setReClaveValid] = useState("");
  const [reClaveInValid, setReClaveInvalid] = useState("");
  const [telValid, setTelValid] = useState("");
  const [telInvalid, setTelInvalid] = useState("");
  const [direcValid, setDirecValid] = useState("");
  const [direcInvalid, setDirecInvalid] = useState("");
  const [locValid, setLocValid] = useState("");
  const [locInvalid, setLocInvalid] = useState("");
  const [provValid, setProvValid] = useState("");
  const [provInvalid, setProvInvalid] = useState("");
  const [paisValid, setPaisValid] = useState("");
  const [paisInvalid, setPaisInvalid] = useState("");
  const [cpValid, setCpValid] = useState("");
  const [cpInvalid, setCpInvalid] = useState("");
  const [invalidTerms, setInvalidTerms] = useState("");

  /*Expresiones regulares para validaciones*/
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,60}$/, // Letras y espacios, pueden llevar acentos.
    email:
      /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    cp: /^[0-9]{4,6}$/,
    tel: /^[0-9]{10,12}$/,
    pas: /^[a-z0-9_-]{8,15}$/,
    dir: /^[a-zA-ZÀ-ÿ0-9\s]{4,30}$/,
  };

  /*States para Validaciones*/
  const [vNom, setVNom] = useState(false);
  const [vApe, setVApe] = useState(false);
  const [vEmail, setVEmail] = useState(false);
  const [vPass, setVPass] = useState(false);
  const [vRePass, setVRePass] = useState(false);
  const [vTel, setVTel] = useState(false);
  const [vDir, setVDir] = useState(false);
  const [vLoc, setVLoc] = useState(false);
  const [vProv, setVProv] = useState(false);
  const [vPais, setVPais] = useState(false);
  const [vCP, setVCP] = useState(false);
  const [terms, setTerms] = useState(false);

  const validarApellido = () => {
    setApeValid("");
    setApeInvalid("");
    let ape = expresiones.nombre;
    if (client.apellido.trim() !== "" && ape.test(client.apellido)) {
      setApeValid(true);
      setVApe(true);
    } else {
      setApeInvalid(true);
      setVApe(false);
    }
  };
  const validarNombre = () => {
    setNomValid("");
    setNomInvalid("");
    let nom = expresiones.nombre;
    if (client.nombre.trim() !== "" && nom.test(client.nombre)) {
      setNomValid(true);
      setVNom(true);
    } else {
      setNomInvalid(true);
      setVNom(false);
    }
  };
  const validarEmail = () => {
    setEmailInvalid("");
    setEmailValid("");
    let mail = expresiones.email;
    if (client.email.trim() !== "" && mail.test(client.email)) {
      setEmailValid(true);
      setVEmail(true);
    } else {
      setEmailInvalid(true);
      setVEmail(false);
    }
  };
  const validarPass = () => {
    setClaveValid("");
    setClaveInvalid("");
    validarRePass();
    let pass = expresiones.pas;
    if (client.clave.trim() !== "" && pass.test(client.clave)) {
      setClaveValid(true);
      setVPass(true);
    } else {
      setClaveInvalid(true);
      setVPass(false);
    }
  };
  const validarRePass = () => {
    setReClaveValid("");
    setReClaveInvalid("");
    if (client.clave.trim() === reClave) {
      setReClaveValid(true);
      setVRePass(true);
    } else {
      setReClaveInvalid(true);
      setVRePass(false);
    }
  };
  const validarTel = () => {
    setTelInvalid("");
    setTelValid("");
    let telef = expresiones.tel;
    if (client.telefono.trim() !== "" && telef.test(client.telefono)) {
      setTelValid(true);
      setVTel(true);
    } else {
      setTelInvalid(true);
      setVTel(false);
    }
  };
  const validarDireccion = () => {
    setDirecValid("");
    setDirecInvalid("");
    const direc = expresiones.dir;
    if (client.direccion.trim() !== "" && direc.test(client.direccion)) {
      setDirecValid(true);
      setVDir(true);
    } else {
      setDirecInvalid(true);
      setVDir(false);
    }
  };
  const validarLocalidad = () => {
    setLocInvalid("");
    setLocValid("");
    if (client.idLocalidad.trim() !== "") {
      setLocValid(true);
      setVLoc(true);
    } else {
      setLocInvalid(true);
      setVLoc(false);
    }
  };
  const validarProvincia = () => {
    setProvInvalid("");
    setProvValid("");
    if (client.idProvincia.trim() !== "") {
      setProvValid(true);
      setVProv(true);
    } else {
      setProvInvalid(true);
      setVProv(false);
    }
  };
  const validarPais = () => {
    setPaisInvalid("");
    setPaisValid("");
    if (client.idPais.trim() !== "") {
      setPaisValid(true);
      setVPais(true);
    } else {
      setPaisInvalid(true);
      setVPais(false);
    }
  };
  const validarCP = () => {
    setCpInvalid("");
    setCpValid("");
    let codP = expresiones.cp;
    if (client.codigoPostal.trim() !== "" && codP.test(client.codigoPostal)) {
      setCpValid(true);
      setVCP(true);
    } else {
      setCpInvalid(true);
      setVCP(false);
    }
  };

  const validarTerminos = (e) => {
    setInvalidTerms("");
    if (e.target.checked) {
      setTerms(true);
    } else {
      setTerms(false);
      setInvalidTerms(true);
    }
  };
  const validarExistenciaEmail = () => {
    usuarios.forEach((mailUser) => {
      if (mailUser.email === client.email) {
        setErr2(true);
        setTimeout(() => {
          setErr2(false);
        }, 2000);
      } 
    });
  };

  //Limitar limite maximo de caracteres ingresados en el imput
  const maxNum = (num) => {
    if (num.target.value.length > num.target.maxLength) {
      num.target.value = num.target.value.slice(0, num.target.maxLength);
    }
  };

  /*limpiar states para estilos en formulario*/
  const clearForm = () => {
    setNomValid("");
    setNomInvalid("");
    setApeValid("");
    setApeInvalid("");
    setEmailInvalid("");
    setEmailValid("");
    setClaveValid("");
    setClaveInvalid("");
    setReClaveValid("");
    setReClaveInvalid("");
    setTelInvalid("");
    setTelValid("");
    setDirecValid("");
    setDirecInvalid("");
    setLocInvalid("");
    setLocValid("");
    setCpInvalid("");
    setCpValid("");
    setInvalidTerms("");

    setVNom(false);
    setVApe(false);
    setVEmail(false);
    setVPass(false);
    setReClave(false);
    setVTel(false);
    setVDir(false);
    setVLoc(false);
    setVCP(false);
    setTerms(false);
  };

  const terminos = (e) => {
    setTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validarExistenciaEmail();
    if (
      vNom &&
      vApe &&
      vEmail &&
      vPass &&
      vRePass &&
      vTel &&
      vDir &&
      vLoc &&
      vProv &&
      vPais &&
      vCP &&
      terms
    ) {
      setError(false);

      const usuario = client;
      try {
        const configuracion = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        };

        const respuesta = await fetch(URL, configuracion);

        if (respuesta.status === 200 || respuesta.status === 201) {
          Swal.fire(
            "Registrado correctamnete",
            "Inicie sesion para disfrutar de sus beneficios"
          );

          setConsultarUser(true);
          e.target.reset();
          clearForm();
          props.history.push("/inicio-sesion");
        } else if (respuesta.status === 400) {
          setErr2(true);
          setTimeout(() => {
            setErr2(false);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        Swal.fire(
          "A ocurrido un error",
          "Por favor intentelo de nuevo mas tarde",
          "error"
        );
      }
    } else {
      setError(true);
      console.log(error)
      setErr1(true);
      setTimeout(() => {
        setErr1(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const consultarLocalidades = async () => {
      try {
        const res = await fetch(URL_LOCALIDADES);
        const infoLocalidades = await res.json();
        if (res.status === 200) {
          setLocalidades(infoLocalidades);
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarLocalidades();
  }, [URL_LOCALIDADES]);

  useEffect(() => {
    const consultarProvincias = async () => {
      try {
        const res = await fetch(URL_PROVINCIAS);
        const infoProvincias = await res.json();
        if (res.status === 200) {
          setProvincias(infoProvincias);
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarProvincias();
  }, [URL_PROVINCIAS]);

  useEffect(() => {
    const consultarPaises = async () => {
      try {
        const res = await fetch(URL_PAISES);
        const infoPaises = await res.json();
        if (res.status === 200) {
          setPaises(infoPaises);
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarPaises();
  }, [URL_PAISES]);

  return (
    <Container className="my-4">
      <div className="text-center my-3 ">
        <h1 className="py-1 px-2">
          <i>Registrate y mantente al día con las noticias del mundo</i>
        </h1>
      </div>
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-md-6 col-lg-12  border-secondary rounded herencia">
          <div className="mx-4 my-4">
            <Form onSubmit={handleSubmit}>
              <Row className="mt-3">
                <Col>
                  <Form.Group as={Col} className="border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Apellido</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su apellido"
                      name="apellido"
                      onChange={handleValores}
                      onBlur={validarApellido}
                      maxLength="60"
                      isValid={apeValid}
                      isInvalid={apeInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Datos incorrectos</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Nombre</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre "
                      name="nombre"
                      onChange={handleValores}
                      onBlur={validarNombre}
                      maxLength="60"
                      isValid={nomValid}
                      isInvalid={nomInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Datos incorrectos</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Pais</b>
                      </i>
                    </Form.Label>

                    <Form.Control
                      as="select"
                      name="idPais"
                      onChange={handleValores}
                      onBlur={validarPais}
                      isValid={paisValid}
                      isInvalid={paisInvalid}
                    >
                      <option>Seleccione un Pais</option>
                      {paises.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.pais}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Campo Obligatorio, debe seleccionar un Pais</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Provincia</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="idProvincia"
                      onChange={handleValores}
                      onBlur={validarProvincia}
                      isValid={provValid}
                      isInvalid={provInvalid}
                    >
                      <option>Seleccione una Provincia</option>
                      {provincias.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.provincia}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Campo Obligatorio, debe seleccionar una Provincia</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Localidad</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="idLocalidad"
                      onChange={handleValores}
                      onBlur={validarLocalidad}
                      isValid={locValid}
                      isInvalid={locInvalid}
                    >
                      <option>Seleccione una Localidad</option>
                      {localidades.map((l) => (
                        <option key={l._id} value={l._id}>
                          {l.localidad}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Campo Obligatorio, debe seleccionar una Localidad</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Código Postal</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese su codigo postal"
                      name="codigoPostal"
                      onChange={handleValores}
                      onBlur={validarCP}
                      maxLength="6"
                      onInput={maxNum}
                      isValid={cpValid}
                      isInvalid={cpInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Datos incorrectos</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Dirección</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su dirección"
                      name="direccion"
                      onChange={handleValores}
                      onBlur={validarDireccion}
                      maxLength="30"
                      isValid={direcValid}
                      isInvalid={direcInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Datos incorrectos</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Teléfono</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese su numero de telefono"
                      name="telefono"
                      onChange={handleValores}
                      onBlur={validarTel}
                      maxLength="12"
                      onInput={maxNum}
                      isValid={telValid}
                      isInvalid={telInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Debe contener numero de area y telefono</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Email</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese su email"
                      name="email"
                      autoComplete="username"
                      onChange={handleValores}
                      onBlur={validarEmail}
                      maxLength="40"
                      isValid={emailValid}
                      isInvalid={emailInvalid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>Datos incorrectos</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Contraseña</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      name="clave"
                      autoComplete="current-password"
                      onChange={handleValores}
                      onBlur={validarPass}
                      maxLength="15"
                      isValid={claveValid}
                      isInvalid={claveInValid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>
                          Su contraseña debe contener entre 6 y 12 caracteres,
                          letras o números
                        </b>
                      </big>{" "}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor">
                    <Form.Label className="ps-2 pt-1 text-light rounded-top">
                      <i>
                        <b>Confirme su contraseña</b>
                      </i>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña nuevamente"
                      name="clave"
                      autoComplete="current-password"
                      onChange={(e) => setReClave(e.target.value)}
                      onBlur={validarRePass}
                      maxLength="15"
                      isValid={reClaveValid}
                      isInvalid={reClaveInValid}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger ms-2 mb-1 lead"
                    >
                      <big>
                        <b>La confirmación de contraseña no coincide.</b>
                      </big>
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-4">
                <Form.Check.Input
                  type="checkbox"
                  checked={terms}
                  label="Acepto términos y condiciones"
                  onChange={terminos}
                  onBlur={validarTerminos}
                  isInvalid={invalidTerms}
                />
                <Form.Check.Label className="ms-2">
                  Acepto términos y condiciones
                </Form.Check.Label>
                <Form.Control.Feedback
                  type="invalid"
                  className="text-danger small"
                >
                  Debe aceptar términos y condiciones
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-center my-4">
                <Button
                  className="w-75 rounded mar border-0 text-light"
                  type="submit"
                >
                  <big>
                    <i>
                      <b>Registrarme</b>
                    </i>
                  </big>
                </Button>
              </div>
              {err1 ? (
                <MsjError
                  text1="Datos incorrectos"
                  text2="Todos los campos son obligatorios."
                />
              ) : null}
              {err2 ? (
                <MsjError
                  text1="Su direccion de correo ya se encuentra registrada"
                  text2="Por favor, intente con otra direccion ."
                />
              ) : null}
            </Form>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default withRouter(Registrarse);
