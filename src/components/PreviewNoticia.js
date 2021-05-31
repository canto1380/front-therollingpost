import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Figure, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PreviewNoticia = (props) => {
  const { id } = useParams();

  //variables de Ref
  const tituloNoticiaRef = useRef("");
  const subtituloNoticiaRef = useRef("");
  const resumenNoticiaRef = useRef("");
  const autorRef = useRef("");
  const imagenRef = useRef("");
  const categoriaRef = useRef("");
  const pieDeFotoRef = useRef("");
  // states
  const [noticia, setNoticia] = useState({});
  //const [categoria, SetCategoria] = useState("");

  useEffect(() => {
    consultarNoticia();
  }, []);

  const consultarNoticia = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/noticias/" + id;
      const respuesta = await fetch(url);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setNoticia(resp);
      }
    } catch (error) {
      console.log(error);
      //cartel de error
    }
  };

  return (
    <Container>
      <div className="mt-5">
        <h1 className="text-center">Previsualizacion de Noticia</h1>
        <p className="text-muted text center">
          En esta pagina podras ver como es el maquetado de la noticia antes de
          publicarla.
        </p>
      </div>
      <Card className="mt-5 mb-3">
        <Card.Header>
          <p
            className="display-6"
            ref={categoriaRef}
            defaultValue={noticia.categoria}
          >
            {noticia.categoria}
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h1 ref={tituloNoticiaRef} defaultValue={noticia.tituloNoticia}>
              {noticia.tituloNoticia}
            </h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h3
              ref={subtituloNoticiaRef}
              defaultValue={noticia.subtituloNoticia}
            >
              {noticia.subtituloNoticia}
            </h3>
          </Card.Subtitle>
          <Card.Text>
            <div className="row">
              <div className="col-sm-12 col-md-8">
                <p
                  ref={resumenNoticiaRef}
                  defaultValue={noticia.resumenNoticia}
                >
                  {noticia.resumenNoticia}
                </p>
              </div>
              <div className="row">
                <div className="col-12 border mb-2">
                  <Figure>
                    <Image
                      src={noticia.imagen}
                      ref={imagenRef}
                      defaultValue={noticia.imagen}
                    />
                  </Figure>
                </div>
                <div className="col-12 border mb-2">
                  <h5 ref={pieDeFotoRef} defaultValue={noticia.pieDeImagen}>
                    {noticia.pieDeImagen}
                  </h5>
                </div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <h5 ref={autorRef} defaultValue={noticia.autor}>
            {noticia.autor}
          </h5>
        </Card.Footer>
      </Card>
      <div className="d-flex justify-content-center mb-5">
        <Link className="btn btn-info text-light w-75" to={"/menu-noticias"}>
          Volver a Noticias
        </Link>
      </div>
    </Container>
  );
};

export default PreviewNoticia;
