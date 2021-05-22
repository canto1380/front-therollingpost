import React from 'react';

const CardCategorias = (props) => {
    const {cat, id} = props
    console.log(cat)
    return (
        <div key={id}>
            {cat.nombreCategoria}
        </div>
    );
};

export default CardCategorias;