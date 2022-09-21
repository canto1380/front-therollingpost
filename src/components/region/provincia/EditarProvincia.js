import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { paisExpReg } from "../../../utils/RegularExpressions";
import Swal from "sweetalert2";
import MsjError from "../../MsjError";
import { consultarTodosLosPaisesAPI } from "../../../utils/queryAPI/paises";

const EditarProvincia = (props) => {
  const {tok, setBanderaProv, setModalShow, idProv, ...rest} = props
  const [paises, setPaises] = useState([])
  const [banderaPais, setBanderaPais] = useState(true);
  const [nombreProvincia, setNombreProvincia] = useState({
    provincia: '',
    idPais: '',
    nombrePais: ''
  })
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false);
  const [errorProvinciaExist, setErrorProvinciaExist] = useState(false);
  const [errorProvinciaExistDescr, setErrorProvinciaExistDesc] = useState('')
  const [validaNombre, setValidaNombre] = useState("");
  const [noValidaNombre, setNoValidaNombre] = useState("");
  const [validaPais, setValidaPais] = useState("");
  const [noValidaPais, setNoValidaPais] = useState('')

  const URL_SEARCH_PROVINCE = process.env.REACT_APP_API_URL + "/provincia/" + idProv;

  const validarNombreProvincia = () => {
    setValidaNombre('')
    setNoValidaNombre('')
    const nom = paisExpReg
    if(nombreProvincia.provincia.trim() !== '' && nom.test(nombreProvincia.provincia)) {
      setValidaNombre(true)
      setNoValidaNombre(false)
      return true
    } else {
      setValidaNombre(false)
      setNoValidaNombre(true)
      return false
    }
  }
  const validarIdPais = () => {
    setValidaPais('')
    setNoValidaPais('')
    if(nombreProvincia.idPais.trim() !== '' & nombreProvincia.idPais.length === 24) {
      setValidaPais(true)
      return true
    } else {
      setNoValidaPais(true)
      return false
    }
  }

  const handleValues = (e) => {
    setNombreProvincia({...nombreProvincia, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if(validarNombreProvincia() && validarIdPais()) {
        setErrorValid(false)
        const editarProvincia = {
          provincia: nombreProvincia.provincia,
          idPais: nombreProvincia.idPais
        }
        const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: tok.token,
          },
          body: JSON.stringify(editarProvincia),
        }
        
        const response = await fetch(URL_SEARCH_PROVINCE, config);
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Provincia actualizada!",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          setBanderaProv(true);
          setModalShow(false);
        } else if(response.status === 400) {
          const resp = await response.json()
          setErrorProvinciaExistDesc(resp?.mensaje)
          setErrorProvinciaExist(true)
          setTimeout(() => {
            setErrorProvinciaExist(false)
            setErrorProvinciaExistDesc('')
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
    consultarProvincia()
  }, [URL_SEARCH_PROVINCE])
  const consultarProvincia = async () => {
    try {
      const response = await fetch(URL_SEARCH_PROVINCE)
      if( response.status === 200) {
        const resp = await response.json()
        setNombreProvincia({...nombreProvincia, provincia: resp?.provincia, idPais: resp?.idPais?._id, nombrePais: resp?.idPais?.pais})
      }
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (banderaPais) {
      consultarAPI()
    }
  }, [banderaPais])
  const consultarAPI = async () => {
    setPaises( await consultarTodosLosPaisesAPI(setBanderaPais))
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
            <h3>Editar provincia</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-dark">Nombre de la provincia</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={handleValues}
              defaultValue={nombreProvincia.provincia}
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
          <p className="fw-bold text-dark">Seleccione el pais correspondiente</p>
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
            {/* {paises?.map((p) => (
              <option className='text-dark' key={p._id} value={p._id}>{p.pais}</option>
            ))} */}
            {paises?.map((p) => {
              if(p._id === nombreProvincia.idPais) {
                return (
                  <option selected className='text-dark' key={p._id} value={p._id}>{p.pais}</option>
                )
              } else {
                return (
                  <option className='text-dark' key={p._id} value={p._id}>{p.pais}</option>
                )
              }
            })

            }
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
        {errorProvinciaExist ? <MsjError text2={errorProvinciaExistDescr} /> : null}
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

export default EditarProvincia;
