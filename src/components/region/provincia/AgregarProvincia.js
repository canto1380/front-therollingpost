import React, {useEffect, useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import MsjError from "../../MsjError";
import { paisExpReg } from "../../../utils/RegularExpressions";
import { consultarTodosLosPaisesAPI } from "../../../utils/queryAPI/paises";

const AgregarProvincia = (props) => {
  const {tok, setBanderaProv, setModalShow, ...rest} = props

  const [nuevaProvincia, setNuevaProvincia] = useState({
    provincia: '',
    idPais: ''
  })
  const [paises, setPaises] = useState([])
  const [banderaPais, setBanderaPais] = useState(true);
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false);
  const [errorProvExist, setErrorProvExist] = useState(false);
  const [errorProvExistDescr, setErrorProvExistDesc] = useState('')

  const [validaNombre, setValidaNombre] = useState("");
  const [noValidaNombre, setNoValidaNombre] = useState('')
  const [validaPais, setValidaPais] = useState("");
  const [noValidaPais, setNoValidaPais] = useState('')

  const URL_ADD_PROVINCE = process.env.REACT_APP_API_URL + "/provincia/addProvincia";


  const validarNombreProvincia = () => {
    setValidaNombre("");
    setNoValidaNombre('')
    const nom = paisExpReg;
    if (nuevaProvincia.provincia.trim() !== "" && nom.test(nuevaProvincia.provincia)) {
      setValidaNombre(true);
      return true;
    } else {
      setValidaNombre(false);
      setNoValidaNombre(true)
      return false;
    }
  };
  const validarIdPais = () => {
    setValidaPais('')
    setNoValidaPais('')
    if(nuevaProvincia.idPais.trim() !== '' && nuevaProvincia.idPais.length === 24) {
      setValidaPais(true)
      return true
    } else {
      setNoValidaPais(true)
      return false
    }
  }

  const handleValues = (e) => {
    setNuevaProvincia({...nuevaProvincia, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      if(validarNombreProvincia() && validarIdPais()) {
        setErrorValid(false)
        const config = {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'authorization':tok.token
          },
          body: JSON.stringify(nuevaProvincia)
        }
        const response = await fetch(URL_ADD_PROVINCE, config)
        if(response.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Provincia agregada!',
            showConfirmButton: false,
            timer: 1500
          })
          e.target.reset()
          setBanderaProv(true)
          setModalShow(false)
        }else if (response.status === 400) {
          const resp = await response.json()
          setErrorProvExistDesc(resp?.mensaje)
          setErrorProvExist(true)
          setTimeout(() => {
            setErrorProvExist(false)
            setErrorProvExistDesc('')
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
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (banderaPais) {
      consultarAPI();
    }
  }, [banderaPais]);
  const consultarAPI = async () => {
    setPaises(await consultarTodosLosPaisesAPI(setBanderaPais));
  };

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
            <h3>Agregar provincia</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-dark">Ingrese nombre de la provincia</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={handleValues}
              type="text"
              name='provincia'
              minLength="4"
              maxLength="40"
              placeholder="Tucuman"
              onBlur={validarNombreProvincia}
              isInvalid={noValidaNombre}
              isValid={validaNombre}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 4 - 40 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="fw-bold text-dark">Ingrese pais correspondiente</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              as='select'
              onChange={handleValues}
              type="text"
              name='idPais'
              placeholder="Tucuman"
              onBlur={validarIdPais}
              isInvalid={noValidaPais}
              isValid={validaPais}
            >
            <option className='text-dark'>Seleccione un Pais</option>
            {paises?.map((p) => (
              <option className='text-dark' key={p._id} value={p._id}>{p.pais}</option>
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
        {errorProvExist ? <MsjError text2={errorProvExistDescr} /> : null}
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

export default AgregarProvincia;
