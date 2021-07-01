import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import MsjError from "./MsjError";

const EditarCategoria = (props) => {
  const { id, tok } = useParams();

  /* State */
  const [nombreCategoria, setNombreCat] = useState({});
  const [err, setErr] = useState(false);

  //valicaciones de feed
  const [catValid, setCatValid] = useState("");
  const [catInvalid, setCatInvalid] = useState("");

  //variables useRef para precio y nombre producto
  const nombreCategoriaRef = useRef("");
  const URL = process.env.REACT_APP_API_URL;

  const valCate = () => {
    setCatValid("");
    setCatInvalid("");
    let newCat = /^[a-zA-ZÀ-ÿ\s]{6,}$/;
    if (nombreCategoriaRef.current.value.trim() !== ""
    && newCat.test(nombreCategoriaRef.current.value)
    ){
      setCatValid(true);
      return false;
    } else {
      setCatInvalid(true);
      return true;
    }
  }

  useEffect(() => {
    const consultarCategorias = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_URL + "/secure/categorias/updateCategoria/" + id
        );
        if (res.status === 200) {
          const resp = await res.json();
          setNombreCat(resp);
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarCategorias();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!valCate(nombreCategoriaRef.current.value)) {
      setErr(false);
      try {
        const categoriaModificada = {
          nombreCategoria: nombreCategoriaRef.current.value,
        };

        const respuesta = await fetch(
          URL + "/categorias/updateCategoria/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "authorization": tok
            },
            body: JSON.stringify(categoriaModificada),
          }
        );

        if (respuesta.status === 200) {
          Swal.fire(
            "Categoria modificada",
            "La categoria fue modificada correctamente",
            "success"
          );
          props.setConsultarCat(true);
          props.history.push(`/menu-categorias`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  }
    return (
        <Container>
            <Row className="d-flex justify-content-between">
                <Col sm={12} lg={6}>
                    <h1 className="mt-4"><i>Editar Categoria</i></h1>
                    <Form onSubmit={handleSubmit} className="my-3 p-3 border border-secondary rounded">
                        <Form.Group>
                            <Form.Label><i>Nombre Categoria</i></Form.Label>
                        </Form.Group>
                        <Form.Control 
                        type="text" 
                        ref={nombreCategoriaRef} 
                        maxLength="15"
                        defaultValue={nombreCategoria.nombreCategoria}
                        onBlur={valCate}
                        isValid={catValid}
                        isInvalid={catInvalid}
                        />
                       <Form.Control.Feedback
                        type="invalid"
                        className="text-danger small"
                       >Campo obligatorio, al menos debe contener entre 6 - 15
                       caracteres.
                       </Form.Control.Feedback>
                        <Form.Group className="d-flex justify-content-end">
                            <Button className="my-3 mx-2 text-dark limon border-0"  type="submit">
                                Editar
                        </Button>
                            <Link className="my-3 btn mar text-light border-0" to={`/menu-categorias`}>
                                Volver
                            </Link>
                        </Form.Group>
                        {(err) ?
                             (<MsjError text1="Datos incorrectos" 
                             text2="Intentelo nuevamente." />) : (null)}
                    </Form>
                </Col>
                <Col sm={12} lg={6}>
                    <h1 className="mt-4"><i>Categorías existentes</i></h1>
                    <ListGroup className="my-3">
                        {props.categorias.map((cat) => <ListGroup.Item
                             className="d-flex justify-content-between align-items-center border border-secondary herencia"
                            cat={cat} key={cat._id} setConsultarCat={props.setConsultarCat}>
                            <h5><i>{cat.nombreCategoria}</i></h5>
                            </ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
  );
};
export default withRouter(EditarCategoria);