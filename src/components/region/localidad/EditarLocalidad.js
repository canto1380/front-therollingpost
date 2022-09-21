import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { paisExpReg } from "../../../utils/RegularExpressions";
import Swal from "sweetalert2";
import MsjError from "../../MsjError";
import { consultarTodasLasProvinciasAPI } from "../../../utils/queryAPI/provincias";

const EditarLocalidad = (props) => {
  const { tok, setBanderaLocalidad, idLocalidad, setModalShow, ...rest } =
    props;
  const [provincias, setProvincias] = useState([]);
  const [banderaProv, setBanderaProv] = useState(true);
  const [nombreLocalidad, setNombreLocalidad] = useState({
    localidad: "",
    idProvincia: "",
    nombreProvincia: "",
  });
  const [errorServer, setErrorServer] = useState(false);
  const [errorValid, setErrorValid] = useState(false);
  const [errorLocalidadExist, setErrorLocalidadExist] = useState(false);
  const [errorLocalidadExistDescr, setErrorLocalidadExistDesc] = useState("");
  const [validaNombre, setValidaNombre] = useState("");
  const [noValidaNombre, setNoValidaNombre] = useState("");
  const [validaProvincia, setValidaProvincia] = useState("");
  const [noValidaProvincia, setNoValidaProvincia] = useState("");

  const URL_SEARCH_LOCALIDAD =
    process.env.REACT_APP_API_URL + "/localidad/" + idLocalidad;

    const validarNombreLocalidad = () => {
      setValidaNombre('')
      setNoValidaNombre('')
      const nom = paisExpReg
      if(nombreLocalidad.localidad.trim() !== '' && nom.test(nombreLocalidad.localidad)) {
        setValidaNombre(true)
        setNoValidaNombre(false)
        return true
      } else {
        setValidaNombre(false)
        setNoValidaNombre(true)
        return false
      }
    }
    const validarIdProvincia = () => {
      setValidaProvincia('')
      setNoValidaProvincia('')
      if(nombreLocalidad.idProvincia.trim() !== '' & nombreLocalidad.idProvincia.length === 24) {
        setValidaProvincia(true)
        return true
      } else {
        setNoValidaProvincia(true)
        return false
      }
    }

    const handleValues = (e) => {
      setNombreLocalidad({...nombreLocalidad, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
      try {
        e.preventDefault()
        if(validarNombreLocalidad() && validarIdProvincia()) {
          setErrorValid(false)
          const editaLocalidad = {
            localidad: nombreLocalidad.localidad,
            idProvincia: nombreLocalidad.idProvincia
          }
          const config = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: tok.token,
            },
            body: JSON.stringify(editaLocalidad),
          }
          const response = await fetch(URL_SEARCH_LOCALIDAD, config)
          if(response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Localidad actualizada!",
              showConfirmButton: false,
              timer: 1500,
            });
            e.target.reset();
            setBanderaProv(true);
            setModalShow(false);
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
      } catch (error) {
        return error
      }
    }

  useEffect(() =>{
    consultarLocalidad()
  }, [URL_SEARCH_LOCALIDAD])
  const consultarLocalidad = async () => {
    try {
      const response = await fetch(URL_SEARCH_LOCALIDAD)
      if(response.status === 200) {
        const resp = await response.json()
        setNombreLocalidad({...nombreLocalidad, localidad: resp?.localidad, idProvincia: resp?.idProvincia?._id, nombreProvincia: resp?.idProvincia?.provincia})
      }
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (banderaProv) {
      consultarAPI()
    }
  }, [banderaProv])
  const consultarAPI = async () => {
    setProvincias(await consultarTodasLasProvinciasAPI(setBanderaProv))
    console.log(provincias)
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
            <h3>Editar localidad</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-dark">Nombre de la localidad</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={handleValues}
              defaultValue={nombreLocalidad.localidad}
              type="text"
              name='localidad'
              minLength="4"
              maxLength="40"
              placeholder="Alberdi"
              onBlur={validarNombreLocalidad}
              isInvalid={noValidaNombre}
              isValid={validaNombre}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 4 - 40 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="fw-bold text-dark">Seleccione la provincia correspondiente</p>
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
            <option className='text-dark'>Seleccione una Provincia</option>
            
            {provincias?.map((p) => {
              if(p._id === nombreLocalidad.idProvincia) {
                return (
                  <option selected className='text-dark' key={p._id} value={p._id}>{p.provincia}</option>
                )
              } else {
                return (
                  <option className='text-dark' key={p._id} value={p._id}>{p.provincia}</option>
                )
              }
            })

            }
            </Form.Control>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe seleccionar una provincia.
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

export default EditarLocalidad;
