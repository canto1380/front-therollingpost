import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck'
import CardNoticia from './CardNoticia';

const CategoriaDestacada = (props) => {
    const {noticias} = props

    return (
        <section className="my-5 w-100" >
            <h4>{props.cat.nombreCategoria}</h4>
            <hr />
            <CardDeck className="cardDeck">
                {
                    noticias.map((not)=>{
                        if(not.categoria === props.cat.nombreCategoria){
                            return (<CardNoticia not={not} key={not._id}/>) 
                        }
                    }
                        )
                }
                
            </CardDeck>
        </section>
    );
};

export default CategoriaDestacada;