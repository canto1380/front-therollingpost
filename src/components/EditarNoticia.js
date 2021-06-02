import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter } from "react-router-dom";
import "./span.css";

//import moment from "moment";

const EditarNoticia = (props) => {
  const { id } = useParams();
  //Variables useRef
  const tituloNoticiaRef = useRef("");
  const subtituloNoticiaRef = useRef("");
  const resumenNoticiaRef = useRef("");
  const autorRef = useRef("");
  const imagenRef = useRef("");
  const piedefotoRef = useRef("");
  // creo los state
  const [noticias, setNoticia] = useState({});
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  const url = process.env.REACT_APP_API_URL;
  const { categorias, setConsultarCat } = props;

  const campoRequerido = (valor) => {
    if (valor.trim() === "") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    consultarNoticia();
  }, []);

  const consultarNoticia = async () => {
    try {
      const respuesta = await fetch(url + "/noticias/noticia/" + id);
      //console.log(respuesta);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setNoticia(resp);
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
      //Cartel de error que aguarde unos instantes
    }
  };
  const cambioCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let categoriaModificada = categoria === "" ? noticias.categoria : categoria;

    //validar los datos
    if (
      campoRequerido(tituloNoticiaRef.current.value) &&
      campoRequerido(subtituloNoticiaRef.current.value) &&
      campoRequerido(resumenNoticiaRef.current.value) &&
      campoRequerido(autorRef.current.value) &&
      campoRequerido(imagenRef.current.value) &&
      campoRequerido(categoriaModificada)
    ) {
      setError(false);
      try {
        const noticiaModificada = {
          titulo: tituloNoticiaRef.current.value,
          descripcion: subtituloNoticiaRef.current.value,
          descripNoticia: resumenNoticiaRef.current.value,
          autor: autorRef.current.value,
          foto: imagenRef.current.value,
          categoria: categoriaModificada,
          pieDeFoto: piedefotoRef.current.value,
     //     hora: moment().format("HH:mm"),
    //      fecha: moment().format("DD MMMM, YYYY"),
        };
        const respuesta = await fetch(url + "/noticias/updateNoticias/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaModificada),
        });
        if (respuesta.status === 200) {
          console.log(url);
          Swal.fire(
            "Noticia Editada!",
            "El archivo fue modificado correctamente",
            "success"
          );
          //
          props.setConsultarNoticias(!props.consultarNoticias);
          //redireccionar a la pagina de productos
          props.history.push("/menu-noticias");
          e.target.reset();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
    //si falla la validacion que de un error
  };
  console.log(noticias.categoria);
  return (
    <Container>
      <Form
        className="mt-4 m-3 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <section className="mb-3 m-0 p-0 py-2 backcolor text-white">
          <div className="m-0 p-0">
            <h1 className="text-center">Editar Noticia: </h1>
          </div>
        </section>
        <div className="m-2">
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Titulo de la Noticia:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Balacera en la Costanera"
              ref={tituloNoticiaRef}
              defaultValue={noticias.titulo}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Subtitulo:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enfrentamiento policial"
              ref={subtituloNoticiaRef}
              defaultValue={noticias.descripcion}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Autor:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Alejandro Poviña"
              ref={autorRef}
              defaultValue={noticias.autor}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Resumen</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={5}
              ref={resumenNoticiaRef}
              defaultValue={noticias.descripNoticia}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Categoria</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              as="select"
              selected
              value={noticias.categoria}
              onChange={cambioCategoria}
            >
              <option>Seleccione..</option>
              {categorias.map((cat) => (
                <option
                  key={cat._id}
                  label={cat.nombreCategoria}
                  value={cat.nombreCategoria}
                >
                  {cat.nombreCategoria}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text className="span">
              <Form.Label>
                *<b>Imagen:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.File
              ref={imagenRef}
              defaultValue={noticias.imagen}
            ></Form.File>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Pie de Imagen:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="25"
              type="text"
              placeholder="Choque en la Ruta Nacional"
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="w-100 mb-0 text-light"
            variant="warning"
            type="submit"
            ref={piedefotoRef}
            defaultValue={noticias.pieDeImagen}
          >
            Editar
          </Button>
        </div>
        {error ? (
          <Alert variant="danger" className=" mt-3 mb-0">
            Todos los campos deben ser validados!
          </Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default withRouter(EditarNoticia);
