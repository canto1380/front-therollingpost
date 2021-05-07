import React from "react";
import {Container, Card} from "react-bootstrap";
import CategoriaDestacada from "./CategoriaDestacada";
import NoticiasPrincipal from "./NoticiasPrincipal";


const Inicio = () => {
  return (
    
    <Container>
        <NoticiasPrincipal></NoticiasPrincipal>
        <CategoriaDestacada></CategoriaDestacada>
        <CategoriaDestacada></CategoriaDestacada>
        <CategoriaDestacada></CategoriaDestacada>
    </Container>
  );
};

export default Inicio;
