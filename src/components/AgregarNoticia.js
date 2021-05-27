import React, { useState } from "react";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import "./span.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

const AgregarNoticia = (props) => {
  const url = process.env.REACT_APP_API_URL;
  const [tituloNoticia, setTituloNoticia] = useState("");
  const [subtituloNoticia, setSubtituloNoticia] = useState("");
  const [autor, setAutor] = useState("");
  const [resumenNoticia, setResumenNoticia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState(false);

  const { categorias, setConsultarCat } = props;

  const cambioCategoria = (e) => {
    setCategoria(e.target.value);
  };

  //  const scrollToTop = () => {
  //    window.scrollTo({
  //      top: 0,
  //      behavior: "smooth",
  //    });
  //  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validacion
    if (
      tituloNoticia.trim() === "" ||
      subtituloNoticia.trim() === "" ||
      resumenNoticia.trim() === "" ||
      autor.trim() === "" ||
      imagen === "" ||
      categoria === ""
    ) {
      setError(true);
    } else {
      setError(false);

      const noticia = {
        titulo: tituloNoticia,
        descripcion: subtituloNoticia,
        descripNoticia: resumenNoticia,
        autor,
        categoria,
        foto: imagen,
        pieDeFoto: "'dsfsfjkhdskjfhsdjk"
      };
      console.log(noticia);

      try {
        //codigo normal
        const configuracion = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticia),
        };

        const respuesta = await fetch(url+"/noticias/addNoticia", configuracion);
        if (respuesta.status === 201) {
          //mostar cartel de se agrego noticia
          Swal.fire(
            "La noticia fue creada!",
            "Ya puedes revisar la noticia antes de publicarla",
            "success"
          );
          props.setConsultarNoticias(!props.consultarNoticias);
        }
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <Container>
      <Form
        className=" mt-4 m-3 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <section className="row mb-3 m-0 p-0 py-2 bg-secondary text-white">
          <div className="col-sm-12 col-md-10 m-0 p-0">
            <h1 className="mx-1">Formulario de Noticia: </h1>
          </div>
          <div className="col-sm-12 col-md-2 m-0 p-0">
            <div className="d-flex justify-content-end pt-1 mx-1">
              <Link
                className="btn btn-primary text-light mx-1"
                to={"/menu-noticias"}
              >
                <FontAwesomeIcon
                  className="fa-2x"
                  icon={faNewspaper}
                ></FontAwesomeIcon>
              </Link>
            </div>
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
              onChange={(e) => setTituloNoticia(e.target.value)}
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
              onChange={(e) => setSubtituloNoticia(e.target.value)}
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
              onChange={(e) => setAutor(e.target.value)}
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
              onChange={(e) => setResumenNoticia(e.target.value)}
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
              defaultValue="Seleccionar una Categoria......"
              onChange={cambioCategoria}
            >
              <option>Seleccione una Categoria...</option>
              {categorias.map((cat) => (
                <option
                  key={cat.id}
                  label={cat.nombreCategoria}
                  value={categorias.nombreCategoria}
                  onChange={cambioCategoria}
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
            <Form.File onChange={(e) => setImagen(e.target.value)}></Form.File>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button className="w-100 mb-0" variant="success" type="submit">
            Guardar
          </Button>
        </div>
        {error ? (
          <Alert variant="danger" className=" mt-3 mb-0">
            Todos los campos son obligatorios
          </Alert>
        ) : null}
      </Form>
    </Container>
  );
};
export default AgregarNoticia;
