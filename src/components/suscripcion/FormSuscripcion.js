import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import fotoSuscripcion from "../../img/suscripcion.png";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { withRouter, useParams } from "react-router-dom";
import MsjError from "../MsjError";
import { consultarAPIUser } from "../../utils/queryAPI/user";
import {
  titularTarjetaER,
  nroDocumentoER,
  nroTarjetaER,
  cvvER,
} from "../../utils/RegularExpressions";

import "./formSuscripcion.css";
import { consultarSuscripcionPorIDAPI } from "../../utils/queryAPI/suscripciones";

const Suscripcion = (props) => {
  const { idUsuario, tok } = props;
  const { id } = useParams()
  console.log(id)
  const [registredUser, setRegistredUser] = useState([]);

  const URL_ADD_CREDIT_CARD =
    process.env.REACT_APP_API_URL + "/tarjeta-pago/addTarjeta";
  const URL_ADD_SUSCRIPTION =
    process.env.REACT_APP_API_URL +
    "/suscripciones-contratadas/nuevaSuscripcion";
  const URL_SEARCH_USER =
    process.env.REACT_APP_API_URL + `/user/user/${idUsuario}`;

  const [datosTarjeta, setDatosTarjeta] = useState({
    titularTarjeta: "",
    tipoDocumento: "",
    nroDocumento: "",
    tipoTarjeta: "",
    nroTarjeta: "",
    mes: "",
    anio: "",
    cvv: "",
    emailRegistro: "",
  });
  const [banderaUser, setBanderaUser] = useState(true);
  // const [error, setError] = useState(false); // Error servidor
  const [err1, setErr1] = useState(false); //Error validaciones
  const [err2, setErr2] = useState(false); //Error tarjeta existente
  const [err2Descr, setErr2Descr] = useState(""); //Error tarjeta existente
  const [idUser, setIdUser] = useState("");
  const [suscripcion, setSuscripcion] = useState('')
  const [idSuscripcion, setIdSuscripcion] = useState('');

  /*States para feedback formulario*/
  const [titularValida, setTitularValida] = useState("");
  const [titularNoValida, setTitularNoValida] = useState("");
  const [tipoDocValida, setTipoDocValida] = useState("");
  const [tipoDocNoValida, setTipoDocNoValida] = useState("");
  const [nroDocValida, setNroDocValida] = useState("");
  const [nroDocNoValida, setNroDocNoValida] = useState("");
  const [tipoTarjetaValida, setTipoTarjetaValida] = useState("");
  const [tipoTarjetaNoValida, setTipoTarjetaNoValida] = useState("");
  const [nroTarjetaValida, setNroTarjetaValida] = useState("");
  const [nroTarjetaNoValida, setNroTarjetaNoValida] = useState("");
  const [mesValida, setMesValida] = useState("");
  const [mesNoValida, setMesNoValida] = useState("");
  const [anioValida, setAnioValida] = useState("");
  const [anioNoValida, setAnioNoValida] = useState("");
  const [cvvValida, setCvvValida] = useState("");
  const [cvvNoValida, setCvvNoValida] = useState("");

  const validarTitular = () => {
    setTitularValida("");
    setTitularNoValida("");
    let nom = titularTarjetaER;
    if (
      datosTarjeta.titularTarjeta.trim() !== "" &&
      nom.test(datosTarjeta.titularTarjeta)
    ) {
      setTitularValida(true);
      return true;
    } else {
      setTitularNoValida(true);
      return false;
    }
  };
  const validarTipoDocumento = () => {
    setTipoDocValida("");
    setTipoDocNoValida("");

    if (datosTarjeta.tipoDocumento.trim() !== "") {
      setTipoDocValida(true);
      return true;
    } else {
      setTipoDocNoValida(true);
      return false;
    }
  };
  const validarNroDocumento = () => {
    setNroDocNoValida("");
    setNroDocValida("");
    let local = nroDocumentoER;
    if (
      datosTarjeta.nroDocumento.trim() !== "" &&
      local.test(datosTarjeta.nroDocumento)
    ) {
      setNroDocValida(true);
      return true;
    } else {
      setNroDocNoValida(true);
      return false;
    }
  };
  const validarTipoTarjeta = () => {
    setTipoTarjetaNoValida("");
    setTipoTarjetaValida("");
    if (datosTarjeta.tipoTarjeta.trim() !== "") {
      setTipoTarjetaValida(true);
      return true;
    } else {
      setTipoTarjetaNoValida(true);
      return false;
    }
  };
  const validarNroTarjeta = () => {
    setNroTarjetaNoValida("");
    setNroTarjetaValida("");
    let telef = nroTarjetaER;
    if (
      datosTarjeta.nroTarjeta.trim() !== "" &&
      telef.test(datosTarjeta.nroTarjeta)
    ) {
      setNroTarjetaValida(true);
      return true;
    } else {
      setNroTarjetaNoValida(true);
      return false;
    }
  };
  const validarMes = () => {
    setMesNoValida("");
    setMesValida("");
    if (datosTarjeta.mes.trim() !== "") {
      setMesValida(true);
      return true;
    } else {
      setMesNoValida(true);
      return false;
    }
  };
  const validarAnio = () => {
    setAnioValida("");
    setAnioNoValida("");
    if (datosTarjeta.anio.trim() !== "") {
      setAnioValida(true);
      return true;
    } else {
      setAnioNoValida(true);
      return false;
    }
  };
  const validarCvv = () => {
    setCvvValida("");
    setCvvNoValida("");
    let clave = cvvER;
    if (datosTarjeta.cvv.trim() !== "" && clave.test(datosTarjeta.cvv)) {
      setCvvValida(true);
      return true;
    } else {
      setCvvNoValida(true);
      return false;
    }
  };

  const handleValuesTarjeta = (e) => {
    setDatosTarjeta({ ...datosTarjeta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        validarTitular() &&
        validarTipoTarjeta() &&
        validarNroTarjeta() &&
        validarTipoDocumento() &&
        validarNroDocumento() &&
        validarMes() &&
        validarAnio() &&
        validarCvv()
      ) {
        setErr1(false);

        const configuracion = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tok.token,
          },
          body: JSON.stringify(datosTarjeta),
        };
        const respuesta = await fetch(URL_ADD_CREDIT_CARD, configuracion);
        const resp = await respuesta.json();
        if (respuesta.status === 201) {
          const datosNuevaSuscrip = {
            idUsuario: idUser,
            idSuscripcion: idSuscripcion,
            metodoPago: resp._id,
          };
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: tok.token,
            },
            body: JSON.stringify(datosNuevaSuscrip),
          };
          const respuesta1 = await fetch(URL_ADD_SUSCRIPTION, config);
          // const resp1 = await respuesta1.json();
          if (respuesta1.status === 201) {
            let timerInterval;
            Swal.fire({
              title: "Verificando datos de la tarjeta",
              html: "Tiempo aproximado<b></b>.",
              timer: 3000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft();
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Suscripcion registrada!',
                  text: "Verifique su correo electronico",
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {
                  props.history.push("/suscripcion");
                  e.target.reset();
                }, 1500);
              }
            });
            
            
          }
        } else if (respuesta.status === 400) {
          setErr2Descr(resp?.mensaje);
          setErr2(true);
          setTimeout(() => {
            setErr2(false);
          }, 2000);
        }
      } else {
        setErr1(true);
        setTimeout(() => {
          setErr1(false);
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
  };

  useEffect(() => {
    if (banderaUser) {
      consultarAPI();
    }
  }, [URL_SEARCH_USER]);

  const consultarAPI = async () => {
    const usuario = await consultarAPIUser(idUsuario, setBanderaUser);
    setRegistredUser(usuario);
    setDatosTarjeta({ ...datosTarjeta, emailRegistro: usuario?.email });
    setIdUser(usuario?._id);
  };
  useEffect(() => {
    consultarSuscripcionElegida()
  }, [banderaUser])
  
  const consultarSuscripcionElegida = async() => {
    const suscripElegida = await consultarSuscripcionPorIDAPI(id, tok)
    setSuscripcion(suscripElegida)
    setIdSuscripcion(suscripElegida?._id)
    setBanderaUser(false)
  }

  // const consultarAPI = async () => {
  //   try {
  //     console.log("aaa");
  //     const response = await fetch(URL_SEARCH_USER);
  //     if (response.status === 200) {
  //       const resp = await response.json();
  //       setRegistredUser(resp);
  //       setBanderaUser(false);
  //     }
  //   } catch (error) {}
  // };

  return (
    <Container className="">
      <Row className="mt-3 mb-0 mx-0 text-center">
        <Col
          xs={12}
          className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
        >
          <h1 className="py-1 px-2">
            <i>Mantente al día con las noticias del mundo</i>
          </h1>
        </Col>
      </Row>
      <Row className="mt-0 mb-4 mx-0 text-center">
        <Col
          xs={12}
          className="align-items-center mt-4 ps-0 justify-content-md-start p-0"
        >
          <h5>
            <i>Accedé sin límite a información de la mejor calidad</i>
          </h5>
        </Col>
      </Row>

      <Row className="my-5">
        <Col xs={12} lg={8} className="px-0 ">
          <div className="mx-4 my-4">
            <Form onSubmit={handleSubmit}>
              <div className="text-start">
                <h5>Datos del suscriptor</h5>
              </div>
              <Row className="">
                <Col>
                  <Form.Group className="border rounded-3 backcolor text-form">
                    <Form.Control
                      defaultValue={registredUser?.nombre}
                      size="sm"
                      type="text"
                      name="nomAp"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="border rounded-3 backcolor text-form">
                    <Form.Control
                      defaultValue={registredUser?.apellido}
                      size="sm"
                      type="text"
                      name="telefono"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor text-form">
                    <Form.Control
                      size="sm"
                      // onChange={handleValuesTarjeta}
                      type="email"
                      name="email"
                      disabled
                      defaultValue={registredUser?.email}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2 border rounded-3 backcolor text-form">
                    <Form.Control
                      size="sm"
                      type="text"
                      disabled
                      name="direccion"
                      defaultValue={registredUser?.direccion}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-start mt-5">
                <h5>Datos de la tarjeta</h5>
              </div>
              <Row className="mt-4">
                <Col>
                  <Form.Group className="backcolor text-form">
                    <Form.Control
                      size="sm"
                      type="text"
                      onChange={handleValuesTarjeta}
                      name="titularTarjeta"
                      placeholder="Titular Tarjeta"
                      minLength="10"
                      maxLength="70"
                      onBlur={validarTitular}
                      isInvalid={titularNoValida}
                      isValid={titularValida}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe contener entre 10 y 70 caracteres.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      as="select"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="tipoDocumento"
                      size="sm"
                      onBlur={validarTipoDocumento}
                      isInvalid={tipoDocNoValida}
                      isValid={tipoDocValida}
                    >
                      <option className="text-dark">Tipo Documento</option>
                      <option className="text-dark">
                        Documento Nacional de Identidad
                      </option>
                      <option className="text-dark">Libreta Civica</option>
                      <option className="text-dark">CUIT</option>
                      <option className="text-dark">CUIL</option>
                      <option className="text-dark">Pasaporte</option>
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe seleccionar un tipo de documento.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="backcolor text-form">
                    <Form.Control
                      size="sm"
                      onChange={handleValuesTarjeta}
                      minLength="7"
                      maxLength="11"
                      type="number"
                      name="nroDocumento"
                      placeholder="Nro Documento"
                      onBlur={validarNroDocumento}
                      isInvalid={nroDocNoValida}
                      isValid={nroDocValida}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe contener entre 6 y 11 numeros.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      as="select"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="tipoTarjeta"
                      size="sm"
                      onBlur={validarTipoTarjeta}
                      isInvalid={tipoTarjetaNoValida}
                      isValid={tipoTarjetaValida}
                    >
                      <option className="text-dark">Tipo Tarjeta</option>
                      <option className="text-dark">Mercado Pago</option>
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe seleccionar una tarjeta.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="border rounded-3 backcolor text-form">
                    <Form.Control
                      size="sm"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="nroTarjeta"
                      placeholder="Nro Tarjeta"
                      minLength="16"
                      maxLength="16"
                      onBlur={validarNroTarjeta}
                      isInvalid={nroTarjetaNoValida}
                      isValid={nroTarjetaValida}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe tener 16 caracteres
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      as="select"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="mes"
                      size="sm"
                      onBlur={validarMes}
                      isInvalid={mesNoValida}
                      isValid={mesValida}
                    >
                      <option className="text-dark">Mes</option>
                      <option className="text-dark" value="01">
                        01 - Enero
                      </option>
                      <option className="text-dark" value="02">
                        02 - Febrero
                      </option>
                      <option className="text-dark" value="03">
                        03 - Marzo
                      </option>
                      <option className="text-dark" value="04">
                        04 - Abril
                      </option>
                      <option className="text-dark" value="05">
                        05 - Mayo
                      </option>
                      <option className="text-dark" value="06">
                        06 - Junio
                      </option>
                      <option className="text-dark" value="07">
                        07 - Julio
                      </option>
                      <option className="text-dark" value="08">
                        08 - Agosto
                      </option>
                      <option className="text-dark" value="09">
                        09 - Septiembre
                      </option>
                      <option className="text-dark" value="10">
                        10 - Octubre
                      </option>
                      <option className="text-dark" value="11">
                        11 - Noviembre
                      </option>
                      <option className="text-dark" value="12">
                        12 - Diciembre
                      </option>
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe seleccionar un mes.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      as="select"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="anio"
                      size="sm"
                      onBlur={validarAnio}
                      isInvalid={anioNoValida}
                      isValid={anioValida}
                    >
                      <option className="text-dark">Año</option>
                      <option className="text-dark">2023</option>
                      <option className="text-dark">2024</option>
                      <option className="text-dark">2025</option>
                      <option className="text-dark">2026</option>
                      <option className="text-dark">2027</option>
                      <option className="text-dark">2028</option>
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe seleccionar un año.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="border rounded-3 backcolor text-form">
                    <Form.Control
                      size="sm"
                      onChange={handleValuesTarjeta}
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      minLength="3"
                      maxLength="3"
                      onBlur={validarCvv}
                      isInvalid={cvvNoValida}
                      isValid={cvvValida}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger small"
                    >
                      Campo Obligatorio, debe contener 3 caracteres.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center my-4">
                <Button
                  className="w-75 rounded mar border-0 text-light"
                  type="submit"
                >
                  <big>
                    <i>
                      <b>Suscribirme</b>
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
              {err2 ? <MsjError text2={err2Descr} /> : null}
            </Form>
          </div>
        </Col>
        <Col xs={12} lg={4} className='px-0 border border-secondary rounded'>
                  <div
                    key={suscripcion?._id}
                    className=" herencia"
                  >
                    <div className="text-center my-3 mx-1">
                      <div className="my-3">
                        <h2>{suscripcion?.nombre}</h2>
                      </div>
                      <div className="my-3">
                        <h5>{suscripcion?.descripcion}</h5>
                      </div>
                      <div className="my-5 cont-img-susc">
                        <img
                          src={fotoSuscripcion}
                          className="w-100 img-susc"
                          alt=""
                        />
                      </div>
                      <div className="my-4 cont-btn-susc">
                        <div className="row m-0 my-2">
                          <div className="col-2 px-0 text-center">
                            <FontAwesomeIcon
                              className="fa-1x"
                              icon={faCheck}
                            ></FontAwesomeIcon>
                          </div>
                          <div className="col-10 px-0  text-start">
                            <span className="text-check-susc">
                              Acceso ilimitado al contenido online de Rolling
                              Post
                            </span>
                          </div>
                        </div>
                        <div className="row m-0 my-2">
                          <div className="col-2 px-0 text-center">
                            <FontAwesomeIcon
                              className="fa-1x"
                              icon={faCheck}
                            ></FontAwesomeIcon>
                          </div>
                          <div className="col-10 px-0  text-start">
                            <span className="text-check-susc">
                              Promociones y actividades para suscriptores
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h3 className="text-primary text-price">
                          <span>$</span>
                          {suscripcion?.precio}
                          <span>/mes</span>
                        </h3>
                      </div>
                      <hr className="w-75 wa" />
                      <div className="my-2">
                        <p>Podés cancelar tu suscripción cuando quieras.</p>
                      </div>
                    </div>
                  </div>

          </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Suscripcion);
