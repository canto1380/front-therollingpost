import React, {useState, useEffect} from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import CardNoticia from './CardNoticia';

const CategoriaDestacada = (props) => {
    const {noticias, cat} = props


    return (
        <section className="my-5 w-100" >
            <h4>{props.cat.nombreCategoria}</h4>
            <hr />
            <CardDeck className="cardDeck">
                {
                    noticias.map((not)=>{
                        if(not.categoria === props.cat.nombreCategoria){
                            return (<CardNoticia noticias={not} key={not._id}/>) 
                        }
                        return null
                    }
                        )
                }
            </CardDeck>
        </section>
    );
};

export default CategoriaDestacada;