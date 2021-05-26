import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter } from "react-router-dom";
import "./span.css";

const EditarNoticia = (props) => {
  const { id } = useParams();
  //Variables useRef
  const tituloNoticiaRef = useRef("");
  const subtituloNoticiaRef = useRef("");
  const resumenNoticiaRef = useRef("");
  const autorRef = useRef("");
  const imagenRef = useRef("");
  // creo los state
  const [noticia, setNoticia] = useState({});
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
      const respuesta = await fetch(url+ "/noticias/noticia/" + id);
      //console.log(respuesta);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setNoticia(resp);
        console.log(resp)
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
    let categoriaModificada = categoria === "" ? noticia.categoria : categoria;
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
          tituloNoticia: tituloNoticiaRef.current.value,
          subtituloNoticiaRef: subtituloNoticiaRef.current.value,
          resumenNoticiaRef: resumenNoticiaRef.current.value,
          autorRef: autorRef.current.value,
          imagenRef: imagenRef.current.value,
          categoria: categoriaModificada,
        };
        const respuesta = await fetch(url + "/noticias/updateNoticias/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaModificada),
        });
        if (respuesta.status === 200) {
          console.log(url)
          Swal.fire(
            "Noticia Editada!",
            "El archivo fue modificado correctamente",
            "success"
          );
          //
          props.setConsultarNoticias(!props.consultarNoticias);
          //redireccionar a la pagina de productos
          props.history.push("/menu-noticias");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
    //si falla la validacion que de un error
  };

  return (
    <Container>
      <Form
        className="mt-4 m-3 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <section className="mb-3 m-0 p-0 py-2 bg-secondary text-white">
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
              defaultValue={noticia.titulo}
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
              defaultValue={noticia.descripcion}
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
              defaultValue={noticia.autor}
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
              defaultValue={noticia.descripNoticia}
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
              defaultValue={noticia.categoria}
              onChange={cambioCategoria}
            >
              <option>Seleccione una Categoria...</option>
              {categorias.map((cat) => (
                <option
                  key={cat.id}
                  label={cat.nombreCategoria}
                  value={categorias.nombreCategoria}
                  onChange={cambioCategoria}
                  defaultChecked={
                    noticia.categoria && noticia.categoria === { categorias }
                  }
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
              defaultValue={noticia.imagen}
            ></Form.File>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="w-100 mb-0 text-light"
            variant="warning"
            type="submit"
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
