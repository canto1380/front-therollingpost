import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import CardNoticia from './CardNoticia';

const CategoriaDestacada = () => {
    return (
        
            <section className="my-5 w-100" >
            <h4>Politica</h4>
        <hr />
        <CardDeck className="cardDeck">
  <CardNoticia></CardNoticia>
  <CardNoticia></CardNoticia>
  <CardNoticia></CardNoticia>
        </CardDeck>
</section>
    );
};

export default CategoriaDestacada;