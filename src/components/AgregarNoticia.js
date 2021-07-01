import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Image, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const AgregarNoticia = (props) => {
  const url = process.env.REACT_APP_API_URL;
  const [tituloNoticia, setTituloNoticia] = useState("");
  const [subtituloNoticia, setSubtituloNoticia] = useState("");
  const [autor, setAutor] = useState("");
  const [resumenNoticia, setResumenNoticia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [pieDeFoto, setPieDeFoto] = useState("");
  const [error, setError] = useState(false);
  //states de validación
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

  const { categorias } = props;

  const cambioCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const expresiones = {
    texto: /^[^\n]{12,}$/, // Letras, numeros
    textoPie: /^[^\n]{7,}$/, // Letras, numeros
    autor: /^[^\n]{12,}$/, // Letras y espacios, pueden llevar acentos.
    resumen: /[\s\S]{500,}$/,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Validaciones
  const valTit = () => {
    setTitValid("");
    setTitInvalid("");
    let texto = expresiones.texto;
    if (tituloNoticia !== "" && texto.test(tituloNoticia)) {
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
    if (subtituloNoticia !== "" && texto.test(subtituloNoticia)) {
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
    if (autor.trim() !== "" && nombre.test(autor)) {
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
    let resumen = expresiones.resumen;
    if (resumenNoticia !== ""  && resumen.test(resumenNoticia)) {
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
    if (categoria !== "") {
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
    if (imagen !== "") {
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
    let texto = expresiones.textoPie;
    if (pieDeFoto !== "" && texto.test(pieDeFoto)) {
      setPieImgValid(true);
      return false;
    } else {
      setPieImgInvalid(true);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validacion
    if (
      valTit(tituloNoticia) ||
      valSubT(subtituloNoticia) ||
      valAutor(autor) ||
      valResumen(resumenNoticia) ||
      valCat(categoria) ||
      valImg(imagen) ||
      valPieImg(pieDeFoto)
    ) {
    } else {
      const noticia = {
        titulo: tituloNoticia,
        descripcion: subtituloNoticia,
        descripNoticia: resumenNoticia,
        autor,
        categoria,
        foto: imagen,
        pieDeFoto: pieDeFoto,
        hora: moment().format("HH:mm"),
        fecha: moment().format("DD MMMM, YYYY"),
      };
    console.log(noticia)
      try {
        //codigo normal
        const configuracion = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": props.tok
          },
          body: JSON.stringify(noticia),
        };

        const respuesta = await fetch(
          url + "/noticias/addNoticia",
          configuracion
        );
        if (respuesta.status === 201) {
          //mostar cartel de se agrego noticia
          Swal.fire(
            "La noticia fue creada!",
            "Ya puedes revisar la noticia antes de publicarla",
            "success"
          );
          props.setConsultarNoticias(!props.consultarNoticias);
          limpiarFormulario();
          e.target.reset();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const limpiarFormulario = () => {
    setTituloNoticia("");
    setSubtituloNoticia("");
    setAutor("");
    setResumenNoticia("");
    setCategoria("");
    setImagen("");
    setPieDeFoto("");
    setError(false);
    setTitValid("");
    setTitInvalid("");
    setSubTValid("");
    setSubTInvalid("");
    setAutorValid("");
    setAutorInvalid("");
    setResValid("");
    setResInvalid("");
    setCatValid("");
    setCatInvalid("");
    setImgValid("");
    setImgInvalid("");
    setPieImgValid("");
    setPieImgInvalid("");
  };

  return (
    <Container>
      <Form
        className=" mt-4 m-3 border rounded bg-light"
        onSubmit={handleSubmit}
      >
        <section className="row mb-3 m-0 py-2 backcolor text-white rounded-top">
          <div className="col-sm-12 col-md-10 m-0 p-0">
            <h1 className="mx-1 ps-2"><i>Formulario de Noticia: </i></h1>
          </div>
          <div className="col-sm-12 col-md-2 m-0 p-0">
            <div className="d-flex justify-content-end pt-1 mx-1">
              <Link
                className="btn mar text-light mx-1"
                to={`/menu-noticias`}
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
               <i><b>Titulo de la Noticia:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="100"
              type="text"
              placeholder="Balacera en la Costanera"
              onChange={(e) => setTituloNoticia(e.target.value)}
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
               <i><b>Subtitulo:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="100"
              type="text"
              placeholder="Enfrentamiento policial"
              onChange={(e) => setSubtituloNoticia(e.target.value)}
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
               <i><b>Autor:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="40"
              type="text"
              placeholder="Alejandro Poviña"
              onChange={(e) => setAutor(e.target.value)}
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
               <i><b>Resumen</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="6500"
              as="textarea"
              rows={5}
              onChange={(e) => setResumenNoticia(e.target.value)}
              onBlur={valResumen}
              isValid={resValid}
              isInvalid={resInvalid}
            />
            <Form.Label>
              <p>{resumenNoticia.length}/6500</p>
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 500-6500
              caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
               <i><b>Categoria</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              as="select"
              defaultValue="Seleccione una Categoria"
              onChange={cambioCategoria}
              onBlur={valCat}
              isValid={catValid}
              isInvalid={catInvalid}
            >
              <option>Seleccione una Categoria</option>
              {categorias.map((cat) => (
                <option
                  key={cat._id}
                   value={cat._id}
                >
                  {cat.nombreCategoria}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, debe seleccionar un Categoria.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
               <i><b>Imagen:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => setImagen(e.target.value)}
              onBlur={valImg}
              isValid={imgValid}
              isInvalid={imgInvalid}
            ></Form.Control>
            {imagen && <Image width="100" src={imagen} />}
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, debe seleccionar una Imagen.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
               <i><b>Pie de Imagen:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="25"
              type="text"
              placeholder="Choque en la Ruta Nacional"
              onChange={(e) => setPieDeFoto(e.target.value)}
              onBlur={valPieImg}
              isValid={pieImgValid}
              isInvalid={pieImgInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, Debe escribir de 7-25 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="w-100 mb-0 planta border-0"
            type="submit"
            onClick={scrollToTop}
          >
         <big><b><i>Agregar</i></b></big>   
          </Button>
        </div>
      </Form>
      {error ? (
        <Alert variant="danger" className=" mt-3 mb-0">
        <h5 className="text-danger text-center">
    <b>Todos los campos deben estar completados correctamente.</b> 
   </h5>
     </Alert>
      ) : null}
    </Container>
  );
};
export default AgregarNoticia;
