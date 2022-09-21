import React, { useEffect, useState } from "react";
import { Container, Card, Figure, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
const PreviewNoticia = (props) => {
  const { id } = useParams();
  // states
  const [noticia, setNoticia] = useState({});
  useEffect(() => {
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
    consultarNoticia();
  }, [id]);
  return (
    <Container>
      <div className="mt-5">
        <h1 className="text-center ">
            <i>Previsualización de Noticia</i>
            </h1>
        <p className=" text-center">
         <big> En esta pagina podrás ver como es el maquetado de la noticia antes de
          publicarla.</big>
        </p>
      </div>
      <Card className="mt-5 mb-3 border-dark herencia">
        <Card.Header>
          <p className="display-6">
           <i>{noticia.categoria?.nombreCategoria}</i> 
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h1>{noticia.titulo}</h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h3>{noticia.descripcion}</h3>
          </Card.Subtitle>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <p>{noticia.descripNoticia}</p>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="row">
                <div className="col-12 ">
                  <Figure>
                    <Image className="img-fluid" src={noticia.foto} />
                  </Figure>
                </div>
                <div className="text-center col-12 mb-2">
                  <h5>{noticia.pieDeFoto}</h5>
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
        <Link className="btn sky nubes text-light w-75" to={`/menu-noticias`}>
          <big><b><i>Volver al menu de Noticias</i></b></big> 
        </Link>
      </div>
    </Container>
  );
};
export default PreviewNoticia;
