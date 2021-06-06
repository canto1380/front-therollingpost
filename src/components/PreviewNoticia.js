import React, { useEffect, useState} from "react";
import { Container, Card, Figure, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PreviewNoticia = (props) => {
  const { id } = useParams();
  const {tok} = props

  // states
  const [noticia, setNoticia] = useState({});

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
          <p className="display-6">
            {noticia.categoria}
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h1>
              {noticia.titulo}
            </h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h3>
              {noticia.descripcion}
            </h3>
          </Card.Subtitle>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <p>
                {noticia.descripNoticia}
              </p>
            </div>
            <div className="col-sm-12 col-md-4">
            <div className="row">
              <div className="col-12 mb-2">
                <Figure>
                  <Image
                    className="img-fluid "
                    src={noticia.foto}
                  />
                </Figure>
              </div>
              <div className="col-12 border mb-2">
                <h5>
                  {noticia.pieDeImagen}
                </h5>
              </div>
            </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <h5>{noticia.autor}</h5>
        </Card.Footer>
      </Card>
      <div className="d-flex justify-content-center mb-5">
        <Link className="btn btn-info text-light w-75" to={`/menu-noticias/${tok}`}>
          Volver a Noticias
        </Link>
      </div>
    </Container>
  );
};

export default PreviewNoticia;
