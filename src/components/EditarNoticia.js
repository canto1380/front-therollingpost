import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert, InputGroup, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
const url = process.env.REACT_APP_API_URL;

const EditarNoticia = (props) => {
  const { id } = useParams();
  //Variables useRef
  const tituloNoticiaRef = useRef();
  const subtituloNoticiaRef = useRef();
  const resumenNoticiaRef = useRef();
  const autorRef = useRef();
  const imagenRef = useRef();
  const piedefotoRef = useRef();
  // creo los state
  const [noticias, setNoticia] = useState({});
  const [error, setError] = useState(false);
  const { categorias } = props;
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
    texto: /^[^\n]{12,}$/, // Letras, numeros
    autor: /^[^\n]{12,}$/, // Letras y espacios, pueden llevar acentos.
    textoPie: /^[^\n]{7,}$/, // Letras, numeros
    resumen: /^[\s\S]{500,}$/,
  };

  //Validaciones
  const valTit = () => {
    setTitValid("");
    setTitInvalid("");
    let titulo = expresiones.texto;
    if (tituloNoticiaRef.current.value.trim() !== "" && titulo.test(tituloNoticiaRef.current.value)) {
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
    if (subtituloNoticiaRef.current.value.trim() !== "" && texto.test(subtituloNoticiaRef.current.value)) {
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
    if (autorRef.current.value.trim() !== "" && nombre.test(autorRef.current.value)) {
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
    if (resumenNoticiaRef.current.value.trim() !== "" && res.test(resumenNoticiaRef.current.value)) {
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
    if (noticias.categoria !== "") {
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
    if (imagenRef.current.value.trim() !== "") {
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
    if (piedefotoRef.current.value.trim() !== "" && texto.test(piedefotoRef.current.value)) {
      setPieImgValid(true);
      return false;
    } else {
      setPieImgInvalid(true);
      return true;
    }
  };

  useEffect(() => {
    const consultarNoticia = async () => {
      try {
        const respuesta = await fetch(url + "/noticias/" + id);
        if (respuesta.status === 200) {
          const resp = await respuesta.json();
          setNoticia(resp);
        }
      } catch (error) {
        console.log(error);
        //Cartel de error que aguarde unos instantes
      }
    };
    consultarNoticia();
  }, [id]);
 
  const cambioCategoria = (e) => {
    setNoticia({ ...noticias, categoria: e.target.value });
  };

  const cambioDescripNoticia = (e) => {
    setNoticia({ ...noticias, descripNoticia: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los datos
    if( !(
      valTit(tituloNoticiaRef.current.value) ||
      valSubT(subtituloNoticiaRef.current.value) ||
      valResumen(resumenNoticiaRef.current.value) ||
      valAutor(autorRef.current.value) ||
      valImg(imagenRef.current.value) ||
      valCat(noticias.categoria) ||
      valPieImg(piedefotoRef.current.value)
    ) ){
      setError(false);
      try {
        const noticiaModificada = {
          titulo: tituloNoticiaRef.current.value,
          descripcion: subtituloNoticiaRef.current.value,
          descripNoticia: resumenNoticiaRef.current.value,
          autor: autorRef.current.value,
          foto: imagenRef.current.value,
          categoria: noticias.categoria,
          pieDeFoto: piedefotoRef.current.value,
          hora: noticias.hora,
          fecha: noticias.fecha,
        };
        const respuesta = await fetch(url + "/noticias/" + id, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "authorization": props.tok
          },
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
    <section className="row mb-3 m-0 py-2 backcolor text-white rounded-top">
          <div className="col-sm-12 col-md-10 m-0 p-0">
            <h1 className="mx-1 ps-2"><i>Formulario de  edición de noticia: </i></h1>
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
               <i><b>Subtitulo:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              maxLength="100"
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
               <i><b>Autor:</b></i> 
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
               <i><b>Resumen</b></i>
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
              onChange={cambioDescripNoticia}
            />
            <Form.Label>
              <p>{noticias.descripNoticia?.length}/6500</p>
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 500-6500
              caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup.Text>
              <Form.Label>
               <i><b>Categoría</b></i> 
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              as="select"
              value={noticias.categoria?._id}
              onChange={cambioCategoria}
              onBlur={valCat}
              isValid={catValid}
              isInvalid={catInvalid}
            >
              <option>Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option
                  key={cat._id}
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
               <i><b>Imagen:</b></i>
              </Form.Label>
            </InputGroup.Text>
            <Form.Control
              ref={imagenRef}
              defaultValue={noticias.foto}
              onBlur={valImg}
              isValid={imgValid}
              isInvalid={imgInvalid}
            ></Form.Control>
            <Image width="100" src={noticias.foto} />
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
              onBlur={valPieImg}
              ref={piedefotoRef}
              defaultValue={noticias.pieDeFoto}
              isValid={pieImgValid}
              isInvalid={pieImgInvalid}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, Debe escribir de 12-25 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="w-100 mb-0 limon border-0 "
            type="submit"
          >
        <big><b><i>Editar</i></b></big>    
          </Button>
        </div>
        {error ? (
          <Alert variant="danger" className=" mt-3 mb-0">
             <h5 className="text-danger text-center">
         <b>Todos los campos deben estar completados correctamente.</b> 
        </h5>
          </Alert>
        ) : null}
      </Form>
    </Container>
  );
};

export default withRouter(EditarNoticia);
