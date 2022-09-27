import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { paisExpReg } from "../../../utils/RegularExpressions";
import Swal from "sweetalert2";
import MsjError from "../../MsjError";

const EditarPais = (props) => {
  const { tok, setBanderaPais, setModalShow, idPais, ...rest } = props;
  console.log(idPais);
  const [nombrePais, setNombrePais] = useState("");
  const [errorServer, setErrorServer] = useState(false)
  const [errorValid, setErrorValid] = useState(false);
  const [errorPaisExist, setErrorPaisExist] = useState(false);
  const [errorPaisExistDescr, setErrorPaisExistDesc] = useState('')

  const [validaNombre, setValidaNombre] = useState("");
  const [noValidaNombre, setNoValidaNombre] = useState("");

  const URL_SEARCH_COUNTRY = process.env.REACT_APP_API_URL + "/pais/" + idPais;

  const validarNombrePais = () => {
    setValidaNombre("");
    setNoValidaNombre("");
    const nom = paisExpReg;
    if (nombrePais.trim() !== "" && nom.test(nombrePais)) {
      setValidaNombre(true);
      setNoValidaNombre(false)
      return true;
    } else {
      setValidaNombre(false);
      setNoValidaNombre(true);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validarNombrePais()) {
        setErrorValid(false);
        const editarPais = {
          pais: nombrePais,
        };
        const config = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: tok.token,
          },
          body: JSON.stringify(editarPais),
        };
        const response = await fetch(URL_SEARCH_COUNTRY, config);
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pais actualizado!",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          setBanderaPais(true);
          setModalShow(false);
        } else if(response.status === 400) {
          const resp = await response.json()
          setErrorPaisExistDesc(resp?.mensaje)
          setErrorPaisExist(true)
          setTimeout(() => {
            setErrorPaisExist(false)
            setErrorPaisExistDesc('')
          }, 2000);
        } else {
          setErrorServer(true)
          setTimeout(() => {
            setErrorServer(false)
          }, 2000);
        }
      } else {
        setErrorValid(true);
        setTimeout(() => {
          setErrorValid(false);
        }, 2000);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const consultarPais = async () => {
      try {
        const response = await fetch(URL_SEARCH_COUNTRY);
        if (response.status === 200) {
          const resp = await response.json();
          setNombrePais(resp);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarPais();
  }, [URL_SEARCH_COUNTRY]);

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
            <h3>Editar pais</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold text-dark">Nombre del pais</p>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => setNombrePais(e.target.value)}
              defaultValue={nombrePais.pais}
              minLength='4'
              maxLength='60'
              type="text"
              onBlur={validarNombrePais}
              isInvalid={noValidaNombre}
              isValid={validaNombre}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 4 - 40 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Actualizar
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
        {errorValid ? (
          <MsjError text2="Debe contener entre 4 y 40 caracteres" />
        ) : null}
        {errorPaisExist ? (
        <MsjError text2={errorPaisExistDescr}/>
      ) : (
        null
      )}
      {errorServer ? (
        <MsjError text1='Hubo un problema en el servidor' text2='Intente mas tarde'/>
      ) : (
        null
      )}
      </Form>
    </Modal>
  );
};

export default EditarPais;
