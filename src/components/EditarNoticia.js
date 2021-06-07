import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert, InputGroup, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter } from "react-router-dom";

import moment from "moment";

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
  //Feed
  const [titValid, setTitValid] = useState("");
  const [titInvalid, setTitInvalid] = useState("");
  const [subTValid, setSubTValid] = useState("");
  const [subTInvalid, setSubTInvalid] = useState("");
  const [autorValid, setAutorValid] = useState("");
  const [autorInvalid, setAutorInvalid] = useState("");
  const [resValid, setResValid] = useState("");
  const [resInvalid, setResInvalid] = useState("");
  const [catValid, setCatValid] = useState("");
  const [catInvalid, setCatInvalid] = useState("");
  const [imgValid, setImgValid] = useState("");
  const [imgInvalid, setImgInvalid] = useState("");
  const [pieImgValid, setPieImgValid] = useState("");
  const [pieImgInvalid, setPieImgInvalid] = useState("");

  const expresiones = {
    texto: /^[a-zA-Z0-9-ZÀ-ÿ\s]{12,}$/, // Letras, numeros
    autor: /^[a-zA-Z0-9-ZÀ-ÿ\s]{12,}$/, // Letras y espacios, pueden llevar acentos.
    resumen: /^[a-zA-Z0-9-ZÀ-ÿ\s]{2000,}$/,
  };

  //Validaciones
  const valTit = () => {
    setTitValid("");
    setTitInvalid("");
    let titulo = expresiones.texto;
    if (tituloNoticiaRef.trim() !== "" && titulo.test(tituloNoticiaRef)) {
      setTitValid(true);
      return false;
    } else {
      setTitInvalid(true);
      return true;
    }
  };
  const valSubT = () => {
    setSubTValid("");
    setSubTInvalid("");
    let texto = expresiones.texto;
    if (subtituloNoticiaRef.trim() !== "" && texto.test(subtituloNoticiaRef)) {
      setSubTValid(true);
      return false;
    } else {
      setSubTInvalid(true);
      return true;
    }
  };

  const valAutor = () => {
    setAutorValid("");
    setAutorInvalid("");
    let nombre = expresiones.autor;
    if (autorRef.trim() !== "" && nombre.test(autorRef)) {
      setAutorValid(true);
      return false;
    } else {
      setAutorInvalid(true);
      return true;
    }
  };

  const valResumen = () => {
    setResValid("");
    setResInvalid("");
    let res = expresiones.resumen;
    if (resumenNoticiaRef.trim() !== "" && res.test(resumenNoticiaRef)) {
      setResValid(true);
      return false;
    } else {
      setResInvalid(true);
      return true;
    }
  };

  const valCat = () => {
    setCatValid("");
    setCatInvalid("");
    if (categoria === "") {
      setCatValid(true);
      return false;
    } else {
      setCatInvalid(true);
      return true;
    }
  };
  const valImg = () => {
    setImgValid("");
    setImgInvalid("");
    if (imagenRef === "") {
      setImgValid(true);
      return false;
    } else {
      setImgInvalid(true);
      return true;
    }
  };

  const valPieImg = () => {
    setPieImgValid("");
    setPieImgInvalid("");
    let texto = expresiones.texto;
    if (piedefotoRef !== "" && texto.test(piedefotoRef)) {
      setPieImgValid(true);
      return false;
    } else {
      setPieImgInvalid(true);
      return true;
    }
  };

  useEffect(() => {
    consultarNoticia();
  }, []);

  const consultarNoticia = async () => {
    try {
      const respuesta = await fetch(url + "/noticias/" + id);
      //console.log(respuesta);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setNoticia(resp);
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
      valTit(tituloNoticiaRef.current.value) &&
      valSubT(subtituloNoticiaRef.current.value) &&
      valResumen(resumenNoticiaRef.current.value) &&
      valAutor(autorRef.current.value) &&
      valImg(imagenRef.current.value) &&
      valCat(categoriaModificada) &&
      valPieImg(piedefotoRef)
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
          hora: moment().format("HH:mm"),
          fecha: moment().format("DD MMMM, YYYY"),
        };
        const respuesta = await fetch(url + "/noticias/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaModificada),
        });
        if (respuesta.status === 200) {
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
              maxLength="40"
              type="text"
              placeholder="Balacera en la Costanera"
              ref={tituloNoticiaRef}
              defaultValue={noticias.titulo}
              onBlur={valTit}
              isValid={titValid}
              isInvalid={titInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12 - 40
              caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Subtitulo:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="50"
              type="text"
              placeholder="Enfrentamiento policial"
              ref={subtituloNoticiaRef}
              defaultValue={noticias.descripcion}
              onBlur={valSubT}
              isValid={subTValid}
              isInvalid={subTInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12 - 50
              caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Autor:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="40"
              type="text"
              placeholder="Alejandro Poviña"
              ref={autorRef}
              defaultValue={noticias.autor}
              onBlur={valAutor}
              isValid={autorValid}
              isInvalid={autorInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 12-40 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Resumen</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="6500"
              as="textarea"
              rows={5}
              ref={resumenNoticiaRef}
              defaultValue={noticias.descripNoticia}
              onBlur={valResumen}
              isValid={resValid}
              isInvalid={resInvalid}
            />
            <Form.Label>
              <p>{resumenNoticiaRef.length}/6500</p>
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 2000-5000
              caracteres.
            </Form.Control.Feedback>
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
              onBlur={valCat}
              isValid={catValid}
              isInvalid={catInvalid}
            >
              <option>Seleccione..</option>
              {categorias.map((cat) => (
                <option
                  key={cat._id}
                  label={cat.nombreCategoria}
                  value={cat._id}
                >
                  {cat.nombreCategoria}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
                *<b>Imagen:</b>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              ref={imagenRef}
              defaultValue={noticias.foto}
            ></Form.Control>
            <Image width="100" src={noticias.foto} />
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
              ref={piedefotoRef}
              defaultValue={noticias.pieDeFoto}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, Debe escribir de 12-25 caracteres.
            </Form.Control.Feedback>
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
            Todos los campos deben ser completados!
          </Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default withRouter(EditarNoticia);
