import React, { useState } from "react";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import MsjError from "./MsjError";
import { withRouter } from "react-router";

const AgregarCategoria = (props) => {
  const { consultarCat, setConsultarCat, categorias, tok } = props;

  const url = process.env.REACT_APP_API_URL + "/categorias/addCategoria";

  /* State */
  const [nombreCategoria, setNombreCat] = useState("");
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);  //valicaciones de feed
  const [catValid, setCatValid] = useState("");
  const [catInvalid, setCatInvalid] = useState("");
  /* Variables */
  let mensaje;

  const valCate = () => {
    setCatValid("");
    setCatInvalid("");
    let newCat = /^[a-zA-ZÀ-ÿ\s]{6,}$/;
    if (nombreCategoria.trim() !== "" && newCat.test(nombreCategoria)) {
      setCatValid(true);
      return false;
    } else {
      setCatInvalid(true);
      return true;
    }
  };

  /*limpiar states para estilos en formulario*/
  const clearForm = ()=>{
    setCatValid("");
    setCatInvalid("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valCate(nombreCategoria)) {
      setErr1(true);
      setTimeout(() => {
        setErr1(false);
      }, 2000);
    } else {
      setErr1(false);
      const nuevaCategoria = {
        nombreCategoria,
      };
      try {
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaCategoria),
        };
        const res = await fetch(url, config);
        if (res.status === 200) {
          Swal.fire("Categoria agregada!", "SI", "success");
          setConsultarCat(!consultarCat);
          e.target.reset();
          clearForm();
        }else{
          setErr2(true);
      setTimeout(() => {
        setErr2(false);
      }, 2000);

        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col sm={12} lg={6}>
          <h1 className="mt-4">
            <i className="backcolor badge text-color"> Agregar categoría</i>
          </h1>
          <Form
            onSubmit={handleSubmit}
            className="my-3 p-3 border border-secondary rounded"
          >
            <Form.Group>
              <Form.Label>
                <i>Nombre de categoría</i>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre categoria"
                maxLength="15"
                onChange={(e) => setNombreCat(e.target.value)}
                onBlur={valCate}
                isValid={catValid}
                isInvalid={catInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                className="text-danger small"
              >
                Campo Obligatorio, al menos debe contener entre 6 - 15
                caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button className="my-3 mx-2" variant="success" type="submit">
                Agregar
              </Button>
              <Link
                className="my-3 btn btn-primary"
                variant="primary"
                to={`/menu-categorias/${tok}`}
              >
                Volver
              </Link>
            </Form.Group>
            {
          (err1) ? (<MsjError text1="Datos incorrectos" text2="Todos los campos son obligatorios." />) : (null)
          }
          {
            (err2) ? (<MsjError text1="Ya existe una categoria con ese nombre" text2="Por favor, intente con otro." />) : (null)
          }
          </Form>
        </Col>
        <Col sm={12} lg={6}>
          <h1 className="mt-4">
            <i className="backcolor badge text-color">Categorías existentes</i>{" "}
          </h1>
          <ListGroup className="my-3 ">
            {categorias.map((cat) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center border border-secondary rounded"
                cat={cat}
                key={cat._id}
                setConsultarCat={props.setConsultarCat}
              >
                <h5 className="text-dark">
                  <i>{cat.nombreCategoria}</i>
                </h5>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(AgregarCategoria);
