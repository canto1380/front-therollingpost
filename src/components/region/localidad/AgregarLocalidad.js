import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import MsjError from "../../MsjError";
import { paisExpReg } from "../../../utils/RegularExpressions";
import { consultarTodasLasProvinciasAPI } from "../../../utils/queryAPI/provincias";

const AgregarLocalidad = (props) => {
  const { tok, setBanderaLocalidad, setModalShow, ...rest } = props;
  const [nuevaLocalidad, setNuevaLocalidad] = useState({
    localidad: "",
    idProvincia: "",
  });
  const [provincia, setProvincia] = useState([]);
  const [banderaProv, setBanderaProv] = useState(true);

  const [errorServer, setErrorServer] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [errorLocalidadExist, setErrorLocalidadExist] = useState(false);
  const [errorLocalidadExistDescr, setErrorLocalidadExistDesc] = useState("");

  const [validaNombre, setValidaNombre] = useState("");
  const [noValidaNombre, setNoValidaNombre] = useState("");
  const [validaProvincia, setValidaProvincia] = useState("");
  const [noValidaProvincia, setNoValidaProvincia] = useState("");

  const URL_ADD_LOCALIDAD =
    process.env.REACT_APP_API_URL + "/localidad/addLocalidad";

  const validarNombreLocalidad = () => {
    setValidaNombre("");
    setNoValidaNombre("");
    const nom = paisExpReg;
    if (
      nuevaLocalidad.localidad.trim() !== "" &&
      nom.test(nuevaLocalidad.localidad)
    ) {
      setValidaNombre(true);
      return true;
    } else {
      setValidaNombre(false);
      setNoValidaNombre(true);
      return false;
    }
  };
  const validarIdProvincia = () => {
    setValidaProvincia("");
    setNoValidaProvincia("");
    if (
      nuevaLocalidad.idProvincia.trim() !== "" &&
      nuevaLocalidad.idProvincia.length === 24
    ) {
      setValidaProvincia(true);
      return true;
    } else {
      setNoValidaProvincia(true);
      return false;
    }
  };

  const handleValues = (e) => {
    setNuevaLocalidad({...nuevaLocalidad, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validarNombreLocalidad() && validarIdProvincia()) {
        setErrorValid(false);
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tok.token,
          },
          body: JSON.stringify(nuevaLocalidad),
        };
        const response = await fetch(URL_ADD_LOCALIDAD, config)
        if(response.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Localidad agregada!',
            showConfirmButton: false,
            timer: 1500
          })
          e.target.reset()
          setBanderaLocalidad(true)
          setModalShow(false)
        } else if(response.status === 400) {
          const resp = await response.json()
          setErrorLocalidadExistDesc(resp?.mensaje)
          setErrorLocalidadExist(true)
          setTimeout(() => {
            setErrorLocalidadExist(false)
            setErrorLocalidadExistDesc('')
          }, 2000);
        } else {
          setErrorServer(true)
          setTimeout(() => {
            setErrorServer(false)
          }, 2000);
        }
      } else {
        setErrorValid(true)
        setTimeout(() => {
          setErrorValid(false)
        }, 2000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if(banderaProv) {
      consultarAPI()
    }
  }, [banderaProv])
  const consultarAPI = async () => {
    setProvincia(await consultarTodasLasProvinciasAPI(setBanderaProv))
  }


  return (
    <Modal
    {...rest}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark" id="contained-modal-title-vcenter">
          <h3>Agregar localidad</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold text-dark">Ingrese nombre de la localidad</p>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleValues}
            type="text"
            name='localidad'
            minLength="4"
            maxLength="40"
            placeholder="Monteros"
            onBlur={validarNombreLocalidad}
            isInvalid={noValidaNombre}
            isValid={validaNombre}
          />
          <Form.Control.Feedback type="invalid" className="text-danger small">
            Campo Obligatorio, al menos debe contener entre 4 - 40 caracteres.
          </Form.Control.Feedback>
        </Form.Group>
        <p className="fw-bold text-dark">Ingrese provincia correspondiente</p>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            as='select'
            onChange={handleValues}
            type="text"
            name='idProvincia'
            placeholder="Tucuman"
            onBlur={validarIdProvincia}
            isInvalid={noValidaProvincia}
            isValid={validaProvincia}
          >
          <option className='text-dark'>Seleccione un Provincia</option>
          {provincia?.map((p) => (
            <option className='text-dark' key={p._id} value={p._id}>{p.provincia}</option>
          ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid" className="text-danger small">
            Campo Obligatorio, al menos debe seleccionar un pais.
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit">
          Agregar
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
      {errorValid ? (
        <MsjError
          text1="Datos incorrectos"
          text2="Todos los campos son obligatorios."
        />
      ) : null}
      {errorLocalidadExist ? <MsjError text2={errorLocalidadExistDescr} /> : null}
      {errorServer ? (
        <MsjError
          text1="Hubo un problema en el servidor"
          text2="Intente mas tarde"
        />
      ) : null}
    </Form>
  </Modal>
  );
};

export default AgregarLocalidad;
