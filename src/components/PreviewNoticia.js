import React, { useEffect, useState} from "react";
import { Container, Card, Figure, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PreviewNoticia = (props) => {
  const { id } = useParams();
  const {tok,noticias} = props
  

  return (
    <Container>
      <div className="mt-5">
        <h1 className="text-center">Previsualizacion de Noticia</h1>
        <p className="text-muted text-center">
          En esta pagina podras ver como es el maquetado de la noticia antes de
          publicarla.
        </p>
      </div>
          {noticias.map((not)=>{
            if(not._id === id){
              return (
                <Card key={not._id} className="mt-5 mb-3">
                <Card.Header>
                   <p className="display-6">
                     {not.categoria.nombreCategoria}
                    </p>
                </Card.Header>
             <Card.Body>
             <Card.Title>
               <h1>
                 {not.titulo}
               </h1>
             </Card.Title>
             <Card.Subtitle className="mb-2 text-muted">
               <h3>
                 {not.descripcion}
               </h3>
             </Card.Subtitle>
             <div className="row">
               <div className="col-sm-12 col-md-8">
                 <p>
                   {not.descripNoticia}
                 </p>
               </div>
               <div className="col-sm-12 col-md-4">
               <div className="row">
                 <div className="col-12 mb-2">
                   <Figure>
                     <Image
                       className="img-fluid "
                       src={not.foto}
                     />
                   </Figure>
                 </div>
                 <div className="col-12 border mb-2">
                   <h5>
                     {not.pieDeFoto}
                   </h5>
                 </div>
               </div>
               </div>
             </div>
           </Card.Body>
           <Card.Footer className="text-muted">
             <h5>{not.autor}</h5>
           </Card.Footer>
      </Card>
              )
            }
          })}
      <div className="d-flex justify-content-center mb-5">
        <Link className="btn btn-info text-light w-75" to={`/menu-noticias/${tok}`}>
          Volver a Noticias
        </Link>
      </div>
    </Container>
  );
};

export default PreviewNoticia;
